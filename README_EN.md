<div align="center">

# 🚀 P-BOX

**A Modern Cross-Platform Proxy Management Panel**

Powered by Mihomo (Clash.Meta) Core | Elegant Web UI | One-Click Deployment

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://go.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)

English | [简体中文](README.md)

<img src="frontend/public/p-box-logo.png" width="120" alt="P-BOX Logo">

</div>

---

## ✨ Features

- 🎨 **Modern UI** - Beautiful Apple Glass style design with dark/light themes
- 🖥️ **Cross-Platform** - Supports macOS, Windows, Linux
- 🔧 **System Proxy** - Auto-configure system proxy (macOS/Windows), no manual setup needed
- 📊 **Real-time Dashboard** - Traffic stats, connection monitoring, exit IP display
- 📦 **Subscription Management** - Multiple subscription sources with one-click update
- 🔄 **Core Management** - Auto version detection, one-click download and install
- ⚡ **Config Generator** - Visual rule configuration with smart routing
- 🌐 **i18n** - Chinese/English language support
- 🔐 **Authentication** - Built-in login system to protect the panel

## 📸 Screenshots

<details>
<summary>Click to expand screenshots</summary>

| Dashboard | Proxy Groups |
|:---:|:---:|
| Real-time traffic monitoring | Node selection & speed test |

| Subscriptions | Core Management |
|:---:|:---:|
| Multi-source management | Auto version detection |

</details>

## 🚀 Quick Start

### Option 1: Download Pre-built Binaries

Go to [Releases](../../releases) page to download pre-built binaries for your platform:

- `p-box-darwin-arm64.tar.gz` - macOS Apple Silicon
- `p-box-darwin-amd64.tar.gz` - macOS Intel
- `p-box-linux-amd64.tar.gz` - Linux x64
- `p-box-windows-amd64.zip` - Windows x64

```bash
# Extract and run
tar -xzf p-box-*.tar.gz
cd p-box
./p-box
```

Visit http://localhost:8383 to access the panel.

### Option 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/star8618/P-BOX.git
cd p-box

# Build (requires Go 1.21+ and Node.js 18+)
./build.sh darwin-arm64   # macOS Apple Silicon
./build.sh darwin-amd64   # macOS Intel
./build.sh linux-amd64    # Linux x64
./build.sh windows-amd64  # Windows x64

# Output directory
ls dist/
```

### Option 3: Development Mode

```bash
# Backend
cd backend && go mod tidy && go run .

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

## 📁 Project Structure

```
p-box/
├── backend/                 # Go Backend
│   ├── main.go              # Entry point
│   ├── server/              # HTTP server
│   ├── modules/             # Feature modules
│   │   ├── proxy/           # Proxy service
│   │   ├── subscription/    # Subscription management
│   │   ├── node/            # Node management
│   │   ├── core/            # Core management
│   │   ├── system/          # System settings
│   │   └── auth/            # Authentication
│   └── data/                # Runtime data
│       ├── configs/         # Config files
│       ├── cores/           # Core binaries
│       └── rules/           # Rule files
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # UI components
│   │   ├── api/             # API client
│   │   ├── stores/          # State management
│   │   └── i18n/            # Internationalization
│   └── public/              # Static assets
│
├── build.sh                 # Build script
└── start-all.sh             # Dev startup script
```

## 🛠️ Tech Stack

| Backend | Frontend |
|:---:|:---:|
| Go 1.21+ | React 18 |
| Gin | Vite 5 |
| WebSocket | TypeScript |
| YAML | Tailwind CSS |
| | Zustand |
| | i18next |

## ⚙️ Configuration

Config file `data/config.yaml` is auto-generated on first run:

```yaml
# Server port
port: 8383

# Proxy port
mixedPort: 7890

# API secret (optional)
secret: ""

# Transparent proxy mode: off, tun, tproxy
transparentMode: "off"
```

## 🤝 Contributing

Pull Requests and Issues are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Mihomo](https://github.com/MetaCubeX/mihomo) - High-performance proxy core
- [Clash](https://github.com/Dreamacro/clash) - Original Clash core
- [React](https://react.dev) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

---

<div align="center">

**If you find this project helpful, please give it a ⭐️ Star!**

</div>
