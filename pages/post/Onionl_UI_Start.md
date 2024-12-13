---
title: '从零开始的组件库开发之旅：Onionl-UI 诞生记 🚀'
date: '2024-12-08'
---

# 从零开始的组件库开发之旅：Onionl-UI 诞生记 🚀

## 引言

Hey，大家好！今天想和大家分享一个特别的项目  —— [Onionl-UI](https://github.com/Onion-L/onionl-ui)，这是我最近在开发的一个组件库。为什么叫 Onionl-UI？因为像洋葱一样，要一层层剥开才能看到其中的奥秘（其实是因为我的 Github 网名叫 Onion-L  啦 😆）。

## 为什么要开发这个组件库？

相信很多人看到这篇文章都会向我发出灵魂拷问：“市面上已经有那么多成熟的组件库了，为什么还要重复造轮子？”说得对，但我的目标并不是造轮子，而是通过这个项目来学习开发的流程，深入探索前端工程化的实践。

## 项目现状

目前 Onionl-UI 还处于萌芽阶段。作为前端行业的一名小学生，我深知项目中还存在诸多不完善之处。但我始终认为：”实践是检验真理的唯一标准。“因此我希望通过项目得到成长，并且我也会尽自己的努力让项目不烂尾。

接下来，就让我向大家汇报一下，我是如何开发的。

> 💡 特别提醒：本项目还在十分早期的开发阶段，功能并不完善，如果您发现任何问题或有任何建议，都欢迎在 GitHub 上提出 issue 或 PR。感谢您的每一个建议！

# 技术选型：Vue 3 + Vite 的黄金搭档  🤔

作为一名  Vue 开发者，选择 Vue 3 作为基础框架是一个自然而然的决定。这里也就不过多赘述。在构建工具的选择上，我最终选择了  Vite。说实话，这个决定做出得很快，因为  Vite 实在是太香了！但说到库的打包，很多人可能会想到 Rollup，它确实是一个非常优秀的打包工具。但在项目初期，考虑到开发效率和上手难度，我选择了更加简单直接的 Vite。并且 Vite 底层用的就是  Rollup，这就意味着如果未来需要更细粒度的打包控制，我随时可以平滑迁移到  Rollup。

## UnoCSS：原子化 CSS 的探索

在样式解决方案上，我选择了  UnoCSS 这个新兴的原子化 CSS 引擎。为什么是  UnoCSS  而不是 Tailwind CSS？因为 UnoCSS 更加轻量和灵活，它的按需生成特性让最终的样式文件体积小得惊人。具体可以看看 Anthony Fu 大佬的文章：[重新构想原子化 CSS](https://antfu.me/posts/reimagine-atomic-css-zh)，详细讲解了关于 UnoCSS 的功能，我个人认为是很酷的。

## 目录结构

```
onionl-ui/
├── packages/                # 组件源码目录
│   ├── components/         # 基础组件
│   │   ├── button/
│   │   ├── input/
│   │   └── ...
│   ├── hooks/             # 通用 hooks
│   ├── utils/             # 工具函数
│   └── onionl-ui/         # 组件入口文件夹
├── docs/                  # 文档站点
├── play/                  # 组件测试预览
├── preset/                # UnoCSS预设
└── scripts/              # 构建脚本
```

## 组件库打包

组件库的打包是一个非常关键的环节，它决定了组件如何被其他开发者使用。让我来详细解释一下 Onionl-UI 的打包策略。

### 打包配置的核心思路

打包脚本主要完成三个核心任务：收集源文件、构建不同格式的输出、复制必要的文档文件。来看看具体实现：

```ts
async function buildAll() {
  // 1. 收集所有需要打包的源文件
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgPath,
      absolute: true,
      onlyFiles: true
    })
  )

  // 2. 针对不同的输出格式进行构建
  buildConfig.forEach(async ({ outPath, format, extend }) => {
    await build({
      build: {
        rollupOptions,
        minify: false, // 保持代码可读性，方便调试
        sourcemap: true, // 支持源码映射
        outDir: resolve(rootPath, outPath),
        lib: {
          entry: input,
          formats: [format],
          fileName: () => `[name].${extend}`
        }
      },
      plugins: [
        vue(),
        vueJsx(),
        UnoCSS(),
        dts({
          // 生成类型声明文件
          include: ['packages/**/**/*.{vue,ts,tsx}'],
          exclude: ['packages/**/test/**'],
          outDir: 'dist/es',
          staticImport: true,
          insertTypesEntry: true
        })
      ]
    })
  })

  // 3. 复制必要的文档文件
  await copyFiles()
}
```

接下来关于组件的写法就不过多赘述了，简单讲一下就是组件可以写成我们平时开发时那样的 vue 文件，同样可以使用 `defineComponent`结合 TSX/JSX 语法来实现更加高自由度高性能的复杂组件。

## 组件库单元测试：从 Button 组件说起  🧪

Button 组件是最简单的，同时也是当前组件库第一个实现的组件（虽然目前为止也只写了两个 😅），在众多测试框架中，我选择了 Vitest  作为测试框架。因为它完美集成了 Vite 生态。

安装必要的依赖：

```
pnpm i -D vitest happy-dom @vue/test-utils
```

测试这一方面我之前不太了解，只知道单元测试可以用来测函数的输入与输出，但是组件是跑在浏览器上的，显然 nodejs 环境无法完成，这时就需要 `happy-dom` 在 nodejs 环境来模拟 DOM。而@vue/test-utils  则是 Vue 官方的测试工具集，能更方便地测试 Vue 组件。

配置 Vitest：

```ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    testTimeout: 10000,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['play/**']
    }
  }
})
```

之后就可以编写测试用例了，这里先给出一个最简单的测试，测试了按钮组件的一些默认的内容：

```ts
describe('button Component', () => {
  it('renders default button correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button Text'
      }
    })

    expect(wrapper.classes()).toContain('ol-button')
    expect(wrapper.text()).toBe('Button Text')
    expect(wrapper.classes()).toContain('ol-button__size-sm')
    expect(wrapper.classes()).toContain('ol-button__type-primary')
  })
})
```

## 总结

开发这个组件库的初衷，并不是为了重复造轮子，而是希望通过实践来深入学习前端工程化的流程。作为一名前端新人，我深知项目中还有很多不完善之处，但正是这种不完美才给了我改进的空间和学习的机会。

如果您觉得这个项目有价值，欢迎给我一个 star ⭐️（项目地址：[Onionl-UI](https://github.com/Onion-L/onionl-ui)）。您的每一个建议和反馈，都将帮助这个项目变得更好。让我们一起在实践中成长！

> 道阻且长，行则将至。与诸君共勉。
