#!/usr/bin/env node

import { createHash } from 'node:crypto'
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs'
import { dirname, extname, join, relative, resolve, sep } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const assetsRoot = resolve(scriptDirectory, '..')
const repositoryRoot = resolve(assetsRoot, '..')
const fullVerification = process.argv.includes('--full')
const errors = []

function reportError(message) {
  errors.push(message)
}

function readText(path) {
  return readFileSync(path, 'utf8')
}

function walkFiles(root, { exclude = () => false } = {}) {
  if (!existsSync(root)) return []

  const files = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name)
    if (exclude(path, entry)) continue
    if (entry.isDirectory()) files.push(...walkFiles(path, { exclude }))
    if (entry.isFile()) files.push(path)
  }
  return files
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

function run(command, args, cwd) {
  console.log(`\n> ${[command, ...args].join(' ')}  (${relative(repositoryRoot, cwd) || '.'})`)
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}

function assertPath(assetDirectory, path, label) {
  if (typeof path !== 'string' || !path) {
    reportError(`${relative(repositoryRoot, assetDirectory)}: missing ${label} path in asset.json`)
    return null
  }

  const absolutePath = resolve(assetDirectory, path)
  if (!existsSync(absolutePath)) {
    reportError(`${relative(repositoryRoot, absolutePath)}: ${label} does not exist`)
  }
  return absolutePath
}

function validatePublishedMetadata(asset, manifest, relatedExperienceFiles) {
  const github = manifest.github || {}
  const expectedAssetPath = `experience-assets/${manifest.id}`

  if (!github.latestTemplate?.includes(`/tree/main/${expectedAssetPath}`)) {
    reportError(`${manifest.id}: latestTemplate must point to main/${expectedAssetPath}`)
  }
  if (!github.pinnedTemplate?.includes(`/tree/{full-commit-sha}/${expectedAssetPath}`)) {
    reportError(`${manifest.id}: pinnedTemplate must contain the full-commit-sha placeholder`)
  }

  if (github.published === false) {
    for (const path of relatedExperienceFiles) {
      if (!readText(path).includes('当前未发布')) {
        reportError(`${relative(repositoryRoot, path)}: unpublished asset must be labelled 当前未发布`)
      }
    }
    return
  }

  if (github.published !== true) {
    reportError(`${manifest.id}: github.published must be a boolean`)
    return
  }

  if (!/^[0-9a-f]{40}$/.test(github.commit || '')) {
    reportError(`${manifest.id}: published asset requires a 40-character github.commit`)
  }
  if (github.latest !== github.latestTemplate) {
    reportError(`${manifest.id}: published github.latest must equal latestTemplate`)
  }
  if (!github.pinned?.includes(`/tree/${github.commit}/${expectedAssetPath}`)) {
    reportError(`${manifest.id}: published github.pinned must contain its full commit SHA`)
  }
  for (const path of relatedExperienceFiles) {
    const text = readText(path)
    if (text.includes('当前未发布')) {
      reportError(`${relative(repositoryRoot, path)}: published asset still says 当前未发布`)
    }
    if (!text.includes(github.commit)) {
      reportError(`${relative(repositoryRoot, path)}: published experience must record the pinned commit SHA`)
    }
  }
}

function validateDistIsolation(assetDirectories) {
  const distRoot = join(repositoryRoot, 'aipd-skill', 'dist')
  if (!existsSync(distRoot)) return

  const distFiles = walkFiles(distRoot)
  for (const path of distFiles) {
    if (path.split(sep).includes('experience-assets')) {
      reportError(`${relative(repositoryRoot, path)}: source asset directory leaked into Skill dist`)
    }
    if (['.md', '.toml'].includes(extname(path)) && legacyBrandPattern.test(readText(path))) {
      reportError(`${relative(repositoryRoot, path)}: legacy brand remains in generated Skill dist`)
    }
  }

  const assetSourceHashes = new Map()
  for (const assetDirectory of assetDirectories) {
    const sourceRoot = join(assetDirectory, 'src')
    for (const path of walkFiles(sourceRoot)) {
      assetSourceHashes.set(sha256(path), relative(repositoryRoot, path))
    }
  }

  for (const path of distFiles) {
    const sourcePath = assetSourceHashes.get(sha256(path))
    if (sourcePath) {
      reportError(`${relative(repositoryRoot, path)}: exact source copy from ${sourcePath} leaked into Skill dist`)
    }
  }
}

const assetDirectories = readdirSync(assetsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'scripts' && !entry.name.startsWith('.'))
  .map((entry) => join(assetsRoot, entry.name))

if (assetDirectories.length === 0) {
  reportError('experience-assets: no asset package found')
}

const experienceDirectory = join(repositoryRoot, 'aipd-skill', 'src', 'core', 'experience')
const experienceFiles = walkFiles(experienceDirectory)
  .filter((path) => extname(path) === '.md')

for (const assetDirectory of assetDirectories) {
  const manifestPath = join(assetDirectory, 'asset.json')
  if (!existsSync(manifestPath)) {
    reportError(`${relative(repositoryRoot, assetDirectory)}: asset.json is required`)
    continue
  }

  let manifest
  try {
    manifest = JSON.parse(readText(manifestPath))
  } catch (error) {
    reportError(`${relative(repositoryRoot, manifestPath)}: invalid JSON (${error.message})`)
    continue
  }

  const directoryName = relative(assetsRoot, assetDirectory)
  if (manifest.id !== directoryName) {
    reportError(`${directoryName}: asset.json id must match the directory name`)
  }
  if (!Array.isArray(manifest.canonicalNames) || manifest.canonicalNames.length === 0) {
    reportError(`${directoryName}: canonicalNames must be a non-empty array`)
  }
  if (manifest.packaging?.includedInSkill !== false) {
    reportError(`${directoryName}: packaging.includedInSkill must be false`)
  }
  if (manifest.packaging?.includedInRepository !== true) {
    reportError(`${directoryName}: packaging.includedInRepository must be true`)
  }

  const readmePath = assertPath(assetDirectory, manifest.readme, 'readme')
  assertPath(assetDirectory, manifest.source, 'source')
  assertPath(assetDirectory, manifest.license, 'license')
  assertPath(assetDirectory, manifest.entry, 'entry')
  assertPath(assetDirectory, 'package-lock.json', 'package lock')

  if (readmePath && existsSync(readmePath)) {
    const readme = readText(readmePath)
    for (const canonicalName of manifest.canonicalNames || []) {
      if (!readme.includes(canonicalName)) {
        reportError(`${relative(repositoryRoot, readmePath)}: missing canonical name ${canonicalName}`)
      }
    }
  }

  const assetPrefix = `experience-assets/${manifest.id}`
  const relatedExperienceFiles = experienceFiles.filter((path) => readText(path).includes(assetPrefix))
  if (relatedExperienceFiles.length === 0) {
    reportError(`${manifest.id}: no semantic experience references this source asset`)
  }
  validatePublishedMetadata(assetDirectory, manifest, relatedExperienceFiles)
}

const localAssetReferences = new Set()
for (const path of experienceFiles) {
  const text = readText(path)
  for (const match of text.matchAll(/experience-assets\/[A-Za-z0-9._/-]+/g)) {
    localAssetReferences.add(match[0].replace(/\/+$/, ''))
  }
}
for (const reference of localAssetReferences) {
  const localPath = join(repositoryRoot, reference)
  if (!existsSync(localPath)) {
    reportError(`${reference}: referenced by semantic experience but missing locally`)
  }
}

const formalBrandRoots = [
  join(repositoryRoot, 'README.md'),
  join(repositoryRoot, '_adoc', 'map.md'),
  join(repositoryRoot, '_adoc', 'L5-dev'),
  join(repositoryRoot, 'aipd-skill', 'src'),
  assetsRoot,
]
const brandFiles = formalBrandRoots.flatMap((path) => (
  statSync(path).isDirectory()
    ? walkFiles(path, {
      exclude: (candidate) => candidate.split(sep).includes('node_modules'),
    })
    : [path]
))
const legacyBrandPattern = new RegExp(`\\b(?:${'QL' + 'M'}|${'Ql' + 'm'})`)
for (const path of brandFiles) {
  if (!['.css', '.js', '.json', '.md', '.mjs', '.sh', '.toml', '.vue'].includes(extname(path))) continue
  if (legacyBrandPattern.test(readText(path))) {
    reportError(`${relative(repositoryRoot, path)}: legacy brand remains on a formal surface`)
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`)
  process.exit(1)
}

if (fullVerification) {
  for (const assetDirectory of assetDirectories) {
    run('npm', ['run', 'verify:full'], assetDirectory)
    run('npm', ['audit', '--audit-level=high'], assetDirectory)
  }
  run('bash', ['aipd-skill/scripts/build'], repositoryRoot)
}

validateDistIsolation(assetDirectories)

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`)
  process.exit(1)
}

console.log(`\nVerified ${assetDirectories.length} experience asset package(s).`)
console.log(`Mode: ${fullVerification ? 'full runtime/build verification' : 'metadata and repository-boundary verification'}`)
