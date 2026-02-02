# AIPD - AI-Powered Document-Driven Development

English | **[中文](./README.md)**

> Let AI manage your project documentation, driving the entire process from requirements to delivery.

## Philosophy

In traditional development, documentation is often an afterthought. AIPD flips this: **docs first, code second**.

With a structured documentation system, AI can:
- Understand project direction and boundaries
- Track design intent of feature modules
- Manage iteration plan execution
- Maintain consistency in technical constraints

Just remember one command: `/adoc`. The AI will detect your project status and suggest the next action.

## Workflow

```
1. Init    → Define project direction (intent.md)
2. Design  → Break down feature modules (spec/)
3. Constrain → Set technical guidelines (system/)
4. Plan    → Create iteration tasks (plan/)
5. Execute → Complete tasks one by one
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
