# 第 6 步：迁移 init 扫描逻辑

## 任务

将初始化相关的扫描逻辑迁移到对应 skill。

## 执行步骤

### 6.1 迁移子 Agent 扫描脚本到 aipd-init

```bash
git mv references/init/sub-agent.md src/skills/aipd-init/references/scan-agent.md
```

### 6.2 基于 init/main-agent.md 创建总入口的扫描逻辑

读取 `references/init/main-agent.md`，将其中的扫描调度逻辑（创建子 Agent、等待结果、展示面板）
提取到 `src/skills/aipd/references/scan-agent.md`。

这个文件的内容是：
- 准备临时文件路径
- 创建子 Agent 的 prompt 模板
- 等待结果后展示状态面板的格式

**注意**：`aipd` 总入口和 `aipd-init` 都需要扫描项目状态，但用途不同：
- `aipd`：扫描后展示面板，引导用户选择下一步
- `aipd-init`：扫描后判断缺什么，引导创建

### 6.3 删除原文件

```bash
git rm references/init/main-agent.md
```

（如果 6.2 是新建文件而非 git mv，则 main-agent.md 需要手动删除）

## 验收

- `src/skills/aipd/references/scan-agent.md` 存在，包含扫描调度逻辑
- `src/skills/aipd-init/references/scan-agent.md` 存在，包含子 Agent 扫描脚本
- `references/init/` 目录已清空或删除
