---
title: Rust CLI 发布 NPM 开发记录：主包 + 子包实现多平台兼容 🫕
date: 2025-07-30
---

# Rust CLI 发布 NPM 开发记录：主包 + 子包实现多平台兼容 🫕

## 背景🍸
在这篇[《解压的艺术：用 Rust 处理 .tar.gz 文件🦀》](https://juejin.cn/post/7520964915349258275)的结尾中我提到了，我用 Rust 写了一个小工具： [ogito](https://github.com/Onion-L/ogito)，在完成了部分基础功能后，我认为，是时候发布第一个可使用的包了。当然，作为一个 Rust 学习者，同时又有一些 JS 情节的人来说，我想要同时发布 crates 和 npm，以便 JavaScript 生态用户通过 `npm install -g ogito` 直接使用。
## 一点建议💡
对于本身就有 npm 发布计划的项目来说，`napi-rs`可能是更好的选择，简单方便，且不容易出错。但是对于我这种前期没有做好规划，本身技术能力也不算高的人来说，迁移的成本远大于手搓（因为手搓不用看文档hhh）。或者你也可以看这篇文章：[Publishing a Rust CLI on npm](https://www.lekoarts.de/garden/publishing-a-rust-cli-on-npm/)。
## 我的方案👨‍🍳
接下来是我的方案。项目结构如下：
```
ogito/
├── src/                     # Rust 源码
├── package.json             # 主包描述
├── packages/                # 子包生成目录
│   └── _template.json       # 子包模板
├── script/ 
│   └── script.ts            # 生成脚本
├── npm/               
│	├── install.ts           # postinstall 逻辑
│	└── run.ts               # bin 入口
└── .github/workflows/
    └── npm.yml              # CI/CD

```
### 问题的关键就是关键的问题❓
Rust 的优点在于其能够发布多平台适配的版本，ogito 作为一个代码工具当然是要适配多个平台。然而，将所有所有的可执行文件打包在一起发布显然是不可取的，这回导致用户下载到无用的文件，同时也会出现不兼容的风险。为此，我采用 **主包 + 子包** 的发布策略。
- 主包通过 `optionalDependencies` 声明所有子包。
- NPM 在安装时根据当前 `os` 与 `cpu` 字段自动拉取匹配的子包。
- 主包的 `postinstall` 钩子负责将子包中的二进制解压到 `bin` 指定路径。

| 包类型 | 包名示例                  | 职责        | 内容        |
| --- | --------------------- | --------- | --------- |
| 主包  | `ogito`               | 仅作入口与依赖声明 | 无二进制      |
| 子包  | `@ogito/darwin-arm64` | 提供单一平台二进制 | 压缩后的可执行文件 |
### 手动体验💻
首先，我想要先在本地体验一下打包和发布前的流程。首先，使用`cargo build --release --target=<target>`构建对应平台的二进制文件，文件会出现在`target/<target>/release`文件夹下，此时需要通过`tar`将文件打包，再移动到子包的文件夹中，并且生成对应的`package.json`文件。这就是需要发布的子包的内容。
```json
// package.json
{
  "name": "@ogito/{{os}}-{{arch}}",
  "version": "{{version}}",
  "description": "ogito binary for {{os}}-{{arch}}",
  "os": ["{{os}}"],
  "bin": {
    "ogito": "{{bin}}"
  },
  "cpu": ["{{arch}}"],
  "files": ["ogito-{{os}}-{{arch}}.tar.gz"],
  "license": "MIT"
}
```
### 如何安装🚚
前面介绍到，当用户通过`npm`安装文件时，会执行`postinstall`钩子，这是因为在安装时，会根据不同的系统获取对应的包，而这个子包是一个`tar.gz`文件，需要解压才可以使用，因此，`insall`脚本就是对文件进行解包。

```ts
#!/usr/bin/env node  

// install.ts
import * as tar from 'tar'
import { platform, arch } from 'node:os'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mapping: Record<string, string> = {
  'win32 x64': `@ogito/win32-x64`,
  'linux x64': `@ogito/linux-x64`,
  'linux arm64': `@ogito/linux-arm64`,
  'darwin x64': `@ogito/darwin-x64`,
  'darwin arm64': `@ogito/darwin-arm64`,
  'win32 arm64': `@ogito/win32-arm64`
}

const key = `${platform()} ${arch()}`
const pkg = mapping[key]
if (!pkg) throw new Error(`Unsupported platform ${key}`)

const require = createRequire(import.meta.url)
const archive = require.resolve(`${pkg}/ogito-${key.replace(' ', '-')}.tar.gz`)

await tar.x({ file: archive, cwd: __dirname })
```

最后，当用户执行命令时，会执行`run.ts`这个文件。
```ts
#!/usr/bin/env node

import { platform } from 'node:os'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))
const exe =
  platform() === 'win32' ? join(root, 'ogito.exe') : join(root, 'ogito')
const { status } = spawnSync(exe, process.argv.slice(2), { stdio: 'inherit' })
process.exit(status ?? 0)
```
### 发布📦
如果想要手动发布多个平台的子包，你可以使用 windows、Linux、MacOS 的电脑分别进行发布，当然你也可以选择使用 Github Action。

在 CI 中使用 GitHub Actions 进行并行构建，利用 `actions/upload-artifact@v4` 将每个平台的压缩包暂存，供后续发布统一下载。然后生成好所有的子包文件内容，就可以执行发布了。

```yml
name: NPM Release
on:
  push:
    tags:
      - 'v*'
jobs:
  build:
    strategy:
      matrix:
        include:
          - os: ubuntu-latest
            target: x86_64-unknown-linux-gnu
            npm-name: linux-x64
          # 其他平台
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v3
      - name: Install cross-compilation tools (Linux ARM64)
        if: matrix.target == 'aarch64-unknown-linux-gnu'
        run: |
          sudo apt-get update
          sudo apt-get install -y gcc-aarch64-linux-gnu
          echo "CC_aarch64_unknown_linux_gnu=aarch64-linux-gnu-gcc" >> $GITHUB_ENV
          echo "CXX_aarch64_unknown_linux_gnu=aarch64-linux-gnu-g++" >> $GITHUB_ENV
          echo "AR_aarch64_unknown_linux_gnu=aarch64-linux-gnu-ar" >> $GITHUB_ENV
          echo "CARGO_TARGET_AARCH64_UNKNOWN_LINUX_GNU_LINKER=aarch64-linux-gnu-gcc" >> $GITHUB_ENV
      - name: Install Rust target
        run: rustup target add ${{ matrix.target }}
      - name: Set environment to use vendored OpenSSL
        run: echo "OPENSSL_NO_VENDOR=0" >> $GITHUB_ENV
      - name: Build
        run: cargo build --release --target=${{ matrix.target }}
      - name: Package
        shell: bash
        run: |
          cd target/${{ matrix.target }}/release
          if [[ "${{ matrix.os }}" == "windows-latest" ]]; then
            tar -czf ../../../ogito-${{ matrix.npm-name }}.tar.gz ogito.exe
          else
            tar -czf ../../../ogito-${{ matrix.npm-name }}.tar.gz ogito
          fi
      - name: Upload binary artifact
        uses: actions/upload-artifact@v4
        with:
          name: ogito-binary-${{ matrix.npm-name }}
          path: ogito-${{ matrix.npm-name }}.tar.gz
 # 发布部分
```

## 总结🦀
通过**主包 + 子包**模式，我们把原本臃肿的跨平台 CLI 拆成轻量、按需的分发流程；既减少了用户下载体积，也降低了维护成本。如果你对 Rust 或 CLI 发布有更多兴趣，欢迎体验 [ogito🍸](https://github.com/Onion-L/ogito)——一个代码克隆工具，期待你的反馈与 PR。
