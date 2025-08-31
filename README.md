# sub-convert

一个防止节点泄漏的订阅转换小工具 [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jwyGithub/sub-convert)

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/jwyGithub/sub-convert/release.yml" alt='status'>
  <img src="https://img.shields.io/github/issues/jwyGithub/sub-convert" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/sub-convert" alt='license'>
</p>

## ✨ 功能特点

### 📌 在线体验

体验地址：[https://convert.looby.dpdns.org](https://convert.looby.dpdns.org)

### 📌 支持的协议类型

| 协议         | 状态 | url      | base64   | yaml/yml |
| ------------ | ---- | -------- | -------- | -------- |
| VLESS        | ✅   | 完全支持 | 完全支持 | 已测试   |
| VMess        | ✅   | 完全支持 | 完全支持 | 已测试   |
| Trojan       | ✅   | 完全支持 | 完全支持 | 已测试   |
| Shadowsocks  | ✅   | 完全支持 | 完全支持 | 已测试   |
| ShadowsocksR | ✅   | 完全支持 | 完全支持 | 已测试   |
| Hysteria     | ✅   | 完全支持 | 完全支持 | 已测试   |
| Hysteria2    | ✅   | 完全支持 | 完全支持 | 已测试   |
| HY2          | ✅   | 完全支持 | 完全支持 | 已测试   |

### 📦 订阅格式转换支持

- ✅ Base64 编码
- ✅ YAML 配置
- 🚧 JSON 配置

### 🔄 支持转换的客户端

- ✅ Clash
- ✅ sing-box
- ✅ v2ray

## ⚙️ 配置说明

本项目已简化配置，无需复杂的环境变量设置，开箱即用。

### 主要功能

- ✅ **订阅格式转换** - 支持 Clash、sing-box、v2ray 等多种格式
- ✅ **多种编码支持** - Base64、YAML、JSON 等编码格式
- ✅ **协议过滤** - 支持多种代理协议的选择和过滤
- ✅ **高级选项** - emoji、节点重命名等增强功能

## 📝 使用说明

### ☁️ 部署方式

#### 方式一：Cloudflare Worker（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 "Workers & Pages" 部分

2. **创建新的 Worker**
   - 点击 "Create application"
   - 选择 "Create Worker"
   - 给 Worker 起个名字，比如 `sub-convert`

3. **部署代码**
   - 在 Worker 编辑器中，将 `src/index.ts` 的代码复制进去
   - 或者直接上传整个项目文件夹

4. **部署**
   - 点击 "Save and deploy"

#### 方式二：Cloudflare Pages

1. **登录 Cloudflare Dashboard**
   - 进入 "Workers & Pages" → "Pages"

2. **创建 Pages 项目**
   - 点击 "Create application"
   - 选择 "Pages"
   - 选择 "Direct Upload"

3. **构建项目**
   ```bash
   # 安装依赖
   pnpm install
   
   # 构建项目
   pnpm run pages
   ```

4. **上传构建产物**
   - 将 `pages` 文件夹压缩成 zip 文件
   - 上传到 Cloudflare Pages

#### 方式三：通过 Git 仓库部署

1. **Fork 本仓库**
   - 在你的 GitHub 账号下 Fork 这个项目

2. **配置 Cloudflare Pages**
   - 在 Cloudflare Dashboard 中创建 Pages 项目
   - 选择 "Connect to Git"
   - 选择你 Fork 的仓库

3. **设置构建配置**
   - 构建命令：`pnpm run pages`
   - 构建输出目录：`pages`
   - 部署分支：`main`

### 🔗 访问地址

- Worker 部署：`https://your-worker-name.your-subdomain.workers.dev`
- Pages 部署：`https://your-project-name.pages.dev`

#### 💾 配置示例

![配置示例](./src/doc/screen/env.png)

#### 💾 工作原理

<p><img src="./src/doc/screen/flow.svg" width="200px" height="auto" alt="工作原理" /></p>

#### 💾 提示

- `只有使用部署的worker服务，才有混淆的效果，使用其他后端转换服务没有混淆的效果`

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## ⚠️ 免责声明

在使用此项目时均被视为已经仔细阅读并完全同意以下条款：

- 此项目仅供个人学习与交流使用，严禁用于商业以及不良用途。
- 如有发现任何商业行为以及不良用途，此项目作者有权撤销使用权。
- 使用本软件所存在的风险将完全由其本人承担，此项目作者不承担任何责任。
- 此项目注明之服务条款外，其它因不当使用本软件而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，本软件作者概不负责，亦不承担任何法律责任。
- 对于因不可抗力或因黑客攻击、通讯线路中断等不能控制的原因造成的服务中断或其他缺陷，导致用户不能正常使用，此项目作者不承担任何责任，但将尽力减少因此给用户造成的损失或影响。
- 本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。
- 本软件相关声明版权及其修改权、更新权和最终解释权均属此项目作者所有。

## 📄 开源协议

本项目遵循 [LICENSE](./LICENSE) 开源协议。

