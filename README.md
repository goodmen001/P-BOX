<div align="center">

# 🚀 P-BOX

**一个现代化的跨平台代理管理面板**

支持 Mihomo (Clash.Meta) 核心 | 优雅的 Web UI | 一键部署

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://go.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)

[English](README_EN.md) | 简体中文

<img src="frontend/public/p-box-logo.png" width="120" alt="P-BOX Logo">

</div>

---

## ✨ 特性

- 🎨 **现代化 UI** - 精美的 Apple Glass 风格设计，支持深色/浅色主题
- 🖥️ **跨平台** - 支持 macOS、Windows、Linux
- � **系统代理** - 自动设置系统代理（macOS/Windows），无需手动配置
- 📊 **实时仪表盘** - 流量统计、连接监控、出口 IP 显示
- 📦 **订阅管理** - 多订阅源支持，一键更新
- 🔄 **核心管理** - 自动检测版本更新，一键下载安装
- ⚡ **配置生成** - 可视化规则配置，智能分流
- 🌐 **国际化** - 支持中文/英文切换
- � **安全认证** - 内置登录系统，保护管理面板

## 📸 截图

<details>
<summary>点击展开截图</summary>

| 仪表盘 | 代理组 |
|:---:|:---:|
| 实时流量监控 | 节点选择与测速 |

| 订阅管理 | 核心管理 |
|:---:|:---:|
| 多订阅源管理 | 自动版本检测 |

</details>

## 🚀 快速开始

### 方式一：下载预编译版本

前往 [Releases](../../releases) 页面下载对应平台的预编译版本：

- `p-box-darwin-arm64.tar.gz` - macOS Apple Silicon
- `p-box-darwin-amd64.tar.gz` - macOS Intel
- `p-box-linux-amd64.tar.gz` - Linux x64
- `p-box-windows-amd64.zip` - Windows x64

```bash
# 解压并运行
tar -xzf p-box-*.tar.gz
cd p-box
./p-box
```

访问 http://localhost:8383 即可使用。

### 方式二：从源码构建

```bash
# 克隆仓库
git clone https://github.com/star8618/P-BOX.git
cd p-box

# 一键构建（需要 Go 1.21+ 和 Node.js 18+）
./build.sh darwin-arm64   # macOS Apple Silicon
./build.sh darwin-amd64   # macOS Intel
./build.sh linux-amd64    # Linux x64
./build.sh windows-amd64  # Windows x64

# 输出目录
ls dist/
```

### 方式三：开发模式

```bash
# 后端
cd backend && go mod tidy && go run .

# 前端（新终端）
cd frontend && npm install && npm run dev
```

## 📁 项目结构

```
p-box/
├── backend/                 # Go 后端
│   ├── main.go              # 程序入口
│   ├── server/              # HTTP 服务器
│   ├── modules/             # 功能模块
│   │   ├── proxy/           # 代理服务
│   │   ├── subscription/    # 订阅管理
│   │   ├── node/            # 节点管理
│   │   ├── core/            # 核心管理
│   │   ├── system/          # 系统设置
│   │   └── auth/            # 认证模块
│   └── data/                # 运行时数据
│       ├── configs/         # 配置文件
│       ├── cores/           # 核心文件
│       └── rules/           # 规则文件
│
├── frontend/                # React 前端
│   ├── src/
│   │   ├── pages/           # 页面组件
│   │   ├── components/      # UI 组件
│   │   ├── api/             # API 客户端
│   │   ├── stores/          # 状态管理
│   │   └── i18n/            # 国际化
│   └── public/              # 静态资源
│
├── build.sh                 # 构建脚本
└── start-all.sh             # 开发启动脚本
```

## 🛠️ 技术栈

| 后端 | 前端 |
|:---:|:---:|
| Go 1.21+ | React 18 |
| Gin | Vite 5 |
| WebSocket | TypeScript |
| YAML | Tailwind CSS |
| | Zustand |
| | i18next |

## ⚙️ 配置

首次运行会自动创建配置文件 `data/config.yaml`：

```yaml
# 服务端口
port: 8383

# 代理端口
mixedPort: 7890

# API 密钥（可选）
secret: ""

# 透明代理模式: off, tun, tproxy
transparentMode: "off"
```

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📜 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

- [Mihomo](https://github.com/MetaCubeX/mihomo) - 高性能代理核心
- [Clash](https://github.com/Dreamacro/clash) - 原版 Clash 核心
- [React](https://react.dev) - 前端框架
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

</div>
