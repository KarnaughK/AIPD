# 阶段 0：项目状态扫描 - 主 Agent 指引

## 目标

通过子 Agent 扫描项目状态，保持主 Agent 上下文干净。

## 执行步骤

### 第一步：准备临时文件

创建结果文件路径：
```
/tmp/aipd-scan-{timestamp}.json
```

### 第二步：创建子 Agent

使用 Agent Team 创建子 Agent，prompt 如下：

```
你是 AIPD 项目状态扫描者。

## 你的任务

1. 读取指南：{aipd_root}/references/phase-0-scan/sub-agent.md
2. 按指南扫描项目状态
3. 写入结果到：{result_file}
4. 返回：「项目状态扫描完成」

## 变量

- project_root: {project_root}
- result_file: {result_file}
- aipd_root: {aipd_root}
```

### 第三步：等待结果

- 子 Agent 完成后，读取结果文件
- 解析 JSON 数据
- 展示状态面板

