# AIPD - AI-Powered Document-Driven Development

English | **[中文](./README.md)**

**You just say it, AI gets it done.**

No commands to memorize. No workflows to remember. No execution details to worry about.

You say "add a button", it adds one. You say "change this part", it changes it. It follows the agreed process step by step, finishes one task then moves to the next—no going off track, no chaos.

It's like having a project butler—you just make requests, it handles the work.

---

## What It Changes

**Before**: You execute the workflow. Requirements come in, you remember how to do it, you do it yourself step by step.

**Now**: You assign tasks. Requirements come in, you say the word, AI follows the workflow, you review the results.

This isn't "AI-assisted development"—it's "AI does the development". Your role shifts from executor to decision-maker.

## How It Works

**AI doesn't just dive in—it makes a plan first.**

You say "I want to add a search feature", it lists out what needs to be done and in what order. You take a look, if it's good, it executes step by step.

- **You focus on**: Is the direction right? Is the plan right? Is the result right?
- **AI handles**: Code writing, document management

The plan is written in files. AI reads it before every task. So it won't forget, won't drift, won't go off track.

## Workflow

```
1. Init    → Define project direction (intent.md)
2. Design  → Break down feature modules (spec/)
3. Constrain → Set technical guidelines (system/)
4. Plan    → Create iteration tasks (plan/)
5. Execute → AI completes tasks one by one
6. Archive → Iteration done, start next round
```

## Documentation Structure

```
_adoc/
├── intent.md          # Project direction (single file)
├── spec/              # Feature module specs
│   ├── 01_feature_a.md
│   └── 02_feature_b.md
├── system/            # Technical constraints
│   └── ...
├── plan/              # Iteration plans
│   ├── index.md       # Categorized index (by module)
│   ├── v0.3-xxx.md    # In progress
│   └── archive/       # Completed
│       └── v0.2-xxx.md
└── runbook/           # Operation guides
```

**Plan is the only thing you need to watch**: Want to do three things at once? Create three Plans. Each Plan is an independent task line.

## Directory Overview

```
AIPD/
├── skill.md           # Main skill file (AI instructions)
├── templates/         # Document templates
│   ├── intent.md
│   ├── spec.md
│   ├── plan.md
│   └── system.md
├── examples/          # Sample docs from real projects
│   ├── sample-intent.md
│   ├── sample-spec.md
│   ├── sample-plan.md
│   └── sample-system.md
└── references/        # Writing guides
    ├── intent-guide.md
    ├── spec-guide.md
    └── plan-guide.md
```

## Installation

Place all contents of this project into a folder named `AIPD/` under your skills directory (the folder name must be `AIPD`).

**Common skills paths:**

```bash
# Claude Code global skills
~/.claude/skills/AIPD/

# Project-level Claude skills
your-project/.claude/skills/AIPD/

# Project-level Agent skills (used by some tools)
your-project/.agent/skills/AIPD/
```

**Installation methods:**

```bash
# Option 1: Git Clone (recommended for easy updates)
git clone https://github.com/your-username/AIPD.git ~/.claude/skills/AIPD

# Option 2: Direct download
# Extract to any of the paths above
```

**Usage:** Type `/adoc` in any project. AI will detect project status and guide you through.

## Use Cases

- Starting a new project, need to clarify direction
- Features growing, need structured management
- Team collaboration, need unified doc standards
- Resuming after a break, need quick context recovery

## License

MIT
