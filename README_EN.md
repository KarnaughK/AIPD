# AIPD - AI-Powered Document-Driven Development

English | **[中文](./README.md)**

**You talk, AI codes.**

Discuss requirements and solutions with AI. AI writes everything into docs, then generates code from those docs. Between you and the code sits a layer of documentation—fully managed by AI.

Just remember one command: `/adoc`. The AI detects your project status and suggests the next action.

---

## What Problem Does It Solve

Traditional dev: Requirements → Human writes code → Docs maybe later

AIPD: Requirements → **Docs** → AI writes code

Documentation is no longer an afterthought—it drives everything. You focus on "what to build", AI handles the rest.

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
│   ├── index.md
│   └── ...
├── plan/              # Iteration plans
│   ├── v0.3-xxx.md           # In progress
│   └── archived-v0.2-xxx.md  # Completed
└── runbook/           # Operation guides
```

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

1. Place this directory at `~/.claude/skills/AIPD/`
2. Type `/adoc` in any project
3. AI will detect project status and guide you through

## Use Cases

- Starting a new project, need to clarify direction
- Features growing, need structured management
- Team collaboration, need unified doc standards
- Resuming after a break, need quick context recovery

## License

MIT
