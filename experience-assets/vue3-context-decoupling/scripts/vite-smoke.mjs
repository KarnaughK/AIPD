import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { build } from 'vite'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outDir = await mkdtemp(resolve(tmpdir(), 'aipd-vue3-assets-'))

try {
  await build({
    root,
    plugins: [vue()],
    resolve: {
      alias: {
        '@/shared/aipd': resolve(root, 'src'),
      },
    },
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          source: resolve(root, 'src/index.js'),
          modal: resolve(root, 'examples/ModalEditor.vue'),
          form: resolve(root, 'examples/ComplexFormPage.vue'),
          search: resolve(root, 'examples/ComplexSearchPage.vue'),
        },
        external: ['vue', 'element-plus'],
        preserveEntrySignatures: 'strict',
      },
    },
  })
} finally {
  await rm(outDir, { recursive: true, force: true })
}
