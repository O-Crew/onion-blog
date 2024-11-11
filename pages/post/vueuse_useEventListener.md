---
title: vueuse探索笔记：useEventListener
date: 2024-11-11
---

# vueuse 探索笔记：useEventListener

VueUse 是一个非常实用的 Vue Composition API 工具集合，它提供了大量可复用的组合式函数。useEventListener 是 VueUse 中一个非常实用的组合式函数，它为我们提供了一种优雅的方式来处理事件监听。

## 基本用法

```TypeScript
import { useEventListener } from '@vueuse/core'
const handleResize = () => {
  console.log('Window resized!')
}
useEventListener(window, 'resize', handleResize)
```

`handleResize`  函数会在窗口大小发生变化时被调用。

## 为什么需要 useEventListener

### 1. 自动清理

设想一下你需要监听浏览器窗口大小的变化情况，很显然使用`addEventListener`就能实现。但是，为了避免造成内存泄漏，你必须在组件`unmounted`时手动清除事件。

```TypeScript
onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
```

当一个页面中有多个事件，就需要一个一个手动清理，这就会造成不必要的麻烦，也降低了我们编码的效率。而`useEventListener`会在组件卸载时自动清理，不需要我们手动清除事件。

```TypeScript
 useEventListener(window, 'resize',handleResize)
```

### 2. 支持响应式引用

在 vue 中，如果组件被设置为是响应式的，则需要我们手动去处理监听事件：

```TypeScript
const myButtonRef = ref<HTMLElement>()
 watch(
      () => myButtonRef,
      (newEl, oldEl) => {
        if (oldEl) oldEl.removeEventListener('click', handleClick)
        if (newEl) newEl.addEventListener('click', handleClick)
      }
    )
```

而`useEventListener`则允许直接传入：

```TypeScript
const buttonRef = ref<HTMLElement | null>(null)
    // 自动处理响应式引用的变化
    useEventListener(buttonRef, 'click', handleClick)
```

### 3. 更好的 TypeScript 支持

```TypeScript
// 自动推断事件类型
useEventListener(window, 'scroll', (e) => {
  // e 自动推断为 Event 类型
})

useEventListener(window, 'click', (e) => {
  // e 自动推断为 MouseEvent 类型
})
```

## 看看源码

```TypeScript
    const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }
 
  const register =
  (el: any, event: string, listener: any, options: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => [unrefElement(target as unknown as MaybeElementRef),toValue(options)],
    ([el, options]) => {
      cleanup()
      if (!el)
        return
      const optionsClone = isObject(options) ? { ...options } : options
      cleanups.push(
        ...(events as string[]).flatMap((event) => {
    return (listeners as Function[])
        .map(listener => register(el, event, listener, optionsClone))
        }),
      )
    },
    { immediate: true, flush: 'post' },
  )
 
  const stop = () => {
    stopWatch()
    cleanup()
  }
  tryOnScopeDispose(stop)
```

- 在`register`中做了监听事件的添加并返回一个清除函数，以便后续进行监听事件的清理。
- `unrefElement`对元素进行解包后得到实际的 DOM 元素。
- `watch`对元素和 option 进行监听，对每个 DOM 元素注册监听事件并收集每个元素的监听事件的清理函数，在`stop`中进行清理。
- `tryOnScopeDispose`是 vueuse 封装的工具函数，底层是使用了[vue-demi](https://github.com/vueuse/vue-demi)中的`getCurrentScope`和`onScopeDispose`两个方法，`onScopeDispose`方法会注册一个清理函数，在组件卸载时执行，且只有在一个 effect 作用域中时，`stop`才会被调用。

## 总结

useEventListener  的优势：

- 🧹  自动清理：避免内存泄漏
- 🔄  响应式支持：自动处理响应式引用
- 📝  类型安全：更好的 TypeScript 支持
- 🎯  条件监听：更简单的条件控制
- 🔧  组合式风格：更好的代码组织和复用
- 🎁  更少的模板代码：减少重复代码

该函数在 VueUse 中被广泛使用，理解 useEventListener 会对后续的源码学习带来帮助。
