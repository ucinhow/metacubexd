# metacubexd

**Mihomo Dashboard, The Official One, XD**

[![pr-closed](https://img.shields.io/github/issues-pr-closed/metacubex/metacubexd?style=for-the-badge)](https://github.com/metacubex/metacubexd/pulls)
[![last-commit](https://img.shields.io/github/last-commit/metacubex/metacubexd?style=for-the-badge)](https://github.com/metacubex/metacubexd/commits)
[![build](https://img.shields.io/github/actions/workflow/status/metacubex/metacubexd/release.yml?style=for-the-badge)](https://github.com/metacubex/metacubexd/actions)
[![downloads](https://img.shields.io/github/downloads/metacubex/metacubexd/total?style=for-the-badge)](https://github.com/metacubex/metacubexd/releases)
[![license](https://img.shields.io/github/license/metacubex/metacubexd?style=for-the-badge)](./LICENSE)

## ✨ Features

- 📊 Real-time traffic monitoring and statistics
- 🔄 Proxy group management with latency testing
- 📡 Connection tracking and management
- 📋 Rule viewer with search functionality
- 📝 Live log streaming
- 🎨 Beautiful UI with light/dark theme support
- 📱 Fully responsive design for mobile devices
- 🌐 Multi-language support (English, 中文, Русский)

## 🖼️ Preview

<details>
<summary><b>Desktop Screenshots</b></summary>

|                           Overview                            |                           Proxies                           |
| :-----------------------------------------------------------: | :---------------------------------------------------------: |
| <img src="docs/pc/overview.png" alt="overview" width="400" /> | <img src="docs/pc/proxies.png" alt="proxies" width="400" /> |

|                             Connections                             |                          Rules                          |
| :-----------------------------------------------------------------: | :-----------------------------------------------------: |
| <img src="docs/pc/connections.png" alt="connections" width="400" /> | <img src="docs/pc/rules.png" alt="rules" width="400" /> |

|                         Logs                          |                          Config                           |
| :---------------------------------------------------: | :-------------------------------------------------------: |
| <img src="docs/pc/logs.png" alt="logs" width="400" /> | <img src="docs/pc/config.png" alt="config" width="400" /> |

</details>

<details>
<summary><b>Mobile Screenshots</b></summary>

|                             Overview                              |                             Proxies                             |                               Connections                               |
| :---------------------------------------------------------------: | :-------------------------------------------------------------: | :---------------------------------------------------------------------: |
| <img src="docs/mobile/overview.png" alt="overview" width="200" /> | <img src="docs/mobile/proxies.png" alt="proxies" width="200" /> | <img src="docs/mobile/connections.png" alt="connections" width="200" /> |

|                            Rules                            |                           Logs                            |                            Config                             |
| :---------------------------------------------------------: | :-------------------------------------------------------: | :-----------------------------------------------------------: |
| <img src="docs/mobile/rules.png" alt="rules" width="200" /> | <img src="docs/mobile/logs.png" alt="logs" width="200" /> | <img src="docs/mobile/config.png" alt="config" width="200" /> |

</details>

## 🔗 Official Links

| Platform         | URL                                    |
| :--------------- | :------------------------------------- |
| GitHub Pages     | https://metacubex.github.io/metacubexd |
| Cloudflare Pages | https://metacubexd.pages.dev           |

## 🚀 Quick Start

### Prerequisites

Enable external-controller in your mihomo config:

```yaml
external-controller: 0.0.0.0:9090
```

### Option 1: Use Pre-built Assets

```shell
# Clone the gh-pages branch
git clone https://github.com/metacubex/metacubexd.git -b gh-pages /etc/mihomo/ui

# Set external-ui in your config
# external-ui: /etc/mihomo/ui

# Update to latest version
git -C /etc/mihomo/ui pull -r
```

### Option 2: Docker

```shell
# Basic usage
docker run -d --restart always -p 80:80 --name metacubexd ghcr.io/ucinhow/metacubexd

# With custom default backend URL
docker run -d --restart always -p 80:80 --name metacubexd \
  -e DEFAULT_BACKEND_URL=http://192.168.1.1:9090 \
  ghcr.io/ucinhow/metacubexd

# With remote config target path
docker run -d --restart always -p 80:80 --name metacubexd \
  -e DEFAULT_BACKEND_URL=http://192.168.1.1:9090 \
  -e CONFIG_FILE_PATH=/root/.config/mihomo/config.yaml \
  ghcr.io/ucinhow/metacubexd

# Update
docker pull ghcr.io/ucinhow/metacubexd && docker restart metacubexd
```

<details>
<summary><b>Docker Compose</b></summary>

```yaml
services:
  metacubexd:
    container_name: metacubexd
    image: ghcr.io/ucinhow/metacubexd
    restart: always
    ports:
      - '80:80'
    # environment:
    #   - DEFAULT_BACKEND_URL=http://192.168.1.1:9090
    #   - CONFIG_FILE_PATH=/root/.config/mihomo/config.yaml

  # Optional: mihomo instance
  mihomo:
    container_name: mihomo
    image: docker.io/metacubex/mihomo:Alpha
    restart: always
    pid: host
    network_mode: host
    cap_add:
      - ALL
    volumes:
      - ./config.yaml:/root/.config/mihomo/config.yaml
      - /dev/net/tun:/dev/net/tun
```

```shell
docker compose up -d

# Update
docker compose pull && docker compose up -d
```

`CONFIG_FILE_PATH` is optional. When set, remote config downloads are fetched by
the MetaCubeXD server and saved to that full server-side file path. Leave it
unset to disable server-side remote config saving.

</details>

### Option 3: Build from Source

```shell
# Install dependencies
pnpm install

# Build for static hosting (gh-pages, etc.)
pnpm generate

# Preview
pnpm preview
```

## 🛠️ Development

```shell
# Start dev server
pnpm dev

# Start dev server with mock data
pnpm dev:mock

# Lint & Format
pnpm lint
pnpm format
```

## 📄 License

[MIT](./LICENSE)

## 🙏 Credits

- [Nuxt](https://github.com/nuxt/nuxt) - The Intuitive Vue Framework
- [Vue.js](https://github.com/vuejs/core) - The Progressive JavaScript Framework
- [daisyUI](https://github.com/saadeghi/daisyui) - Tailwind CSS components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
