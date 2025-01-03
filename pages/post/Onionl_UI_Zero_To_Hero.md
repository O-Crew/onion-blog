---
title: Onionl-UI 组件库开发汇报：从 0 到 1，量变也是变 🌱
date: 2025-01-03
---

## 引言

嗨 👋 好久不见！距离上次分享 Onionl-UI 组件库的开发已经过去一个月了。一个月前，我写了关于如何起步组件库以及一些我个人看法的文章：[从零开始的组件库开发之旅：Onionl-UI 的诞生 🚀](https://juejin.cn/post/7445528830108663842)，收到了大家很多的关注，如果还没有看过可以看一下（不看也行 🫰）。这一个月里，项目有了不少进展，今天想和大家分享一下这段时间的一些心得体会。

## 组件库的成长 📈

起初，Onionl-UI 只有两个组件，在这样的情况下得到了许多人的关注，我感觉十分的激动，但同时又有些慌张，怕项目烂尾，被人笑话。好在，在顺利完成实习工作之后，我有了大量空闲时间可以来打磨我的组件库。

目前，项目的组件数达到了 16 个，在此期间我曾试图列一个 todolist，写下我计划开发的组件，但在开发到第四的 list 之外的组件的时候，我就知道，计划赶不上变化。于是我删掉了文件的内容，由此，Onionl-UI 也就进入了野蛮生长的进程。

在这段时间里，我每天做的就是打开电脑搜寻能激发灵感的东西，然后花一整天时间来实现。也因此实现了几个我认为的没用但是好玩的怪东西：

### 像素图片

这个组件说来也奇怪，起初我是想起之前在 Nuxt 官网上看到的粒子效果的 logo 样式，想着自己实现一遍。我的思路大概是这样：读取图片数据，把数据变成一个个点然后按照顺序画在 canvas 元素上。
![alt text](/image/onionl-ui/pixel.png)

于是就出现了如此的半成品组件，组件主要的创建流程是这样的：

```ts
public async create() {
  await this._waitImageLoad()      // 先等图片加载完
  this.initCanvas()                // 准备一个画布
  this.drawImage()                 // 把图片画上去
  this.getImageData()              // 把图片变成一堆点
  this.drawParticles()            // 最后把这些点画成小方块
}
```

具体来说，它会先创建一个  canvas 画布，然后把原图画上去。接着通过  `getImageData()`  读取图片的像素数据，把它们存成一个个带颜色信息的点：

```ts
private getImageData() {
  for (let y = 0; y < this.canvas.height; y += this.pixelGap) {
    for (let x = 0; x < this.canvas.width; x += this.pixelGap) {
      // 读取每个点的颜色
      const index = (y * this.canvas.width + x) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const a = data[index + 3]
      this.particles.push({ x, y, color: `rgba(${r},${g},${b},${a})` })
    }
  }
}
```

### 光晕背景

起初这个组件是放在整个组件库文档的封面，起到一个好看的效果，但是那天确实是没有灵感，就直接拿来当了组件 🫣
![alt text](/image/onionl-ui/halo.png)
组件的核心就是用 CSS `drop-shadow`  来创建发光效果，再通过动画改变颜色和光圈大小就能实现。

```ts
const keyframes = computed<Keyframe[]>(() => {
  // 处理颜色数组，让光晕可以在多个颜色之间过渡
  const haloColor = clone(props.haloColor)
  const reversedHaloColor = Array.isArray(haloColor)
    ? haloColor.reverse()
    : haloColor

  const duplicatedColors = [props.haloColor, reversedHaloColor].flat()

  // 生成每一帧的光晕效果
  return duplicatedColors.map((color, index) => {
    const offsetX = isNumberString(props.offsetX)
      ? `${props.offsetX}px`
      : props.offsetX
    const offsetY = isNumberString(props.offsetY)
      ? `${props.offsetY}px`
      : props.offsetY

    // 通过 drop-shadow 创建发光效果，可以控制光晕的偏移和大小
    return {
      filter: `drop-shadow(${offsetX} ${offsetY} ${props.haloRadius}em ${color})`
    }
  })
})
// 当组件挂载时就会启动动画
onMounted(() => {
  glowRef.value?.animate(keyframes.value, {
    duration: props.duration, // 动画持续时间
    iterations: Infinity // 无限循环
  })
})
```

## 从野蛮生长到相对统一

在维持了大约一周的头脑风暴，可以说是脑袋空空，想不出好的点子。难度过大实现不了，简单的又觉得无趣，于是我便又写了 TODO 文档。至此，Onionl-UI 完成了相对统一的开发模式。现在，在 Github 仓库内可以看到大概是 4 个 issue，用于有意愿的伙伴能够更好的加入进来。

## 未来规划

说起 Onionl-UI  的未来规划，坦白说，它最初只是我用来学习前端工程化、提升代码能力的一个小项目。但随着开发的深入，我对它有了更多期待。虽然现在它还只是一个"小作坊"式的组件库，但我希望它能成长为一个充满创意的开源项目。在这里，我们可以尽情实现一些在工作中可能"不太实用"但有趣的组件 ✨。

## 结语

我希望 Onionl-UI 能够不断成长，从当初的无人问津到现在有 34 个 star，即使是很小的进步也都值得欣喜，期待有更多志同道合的伙伴加入。如果你也觉得这个项目不错，或者你认同我的观点，可以给我一个 star🌟（项目地址：[Onionl-UI](https://github.com/Onion-L/onionl-ui)），你的每一个小的想法都可能成为 Onionl-UI 的下一个亮点，让我们一起做一些酷的怪东西 🚀
