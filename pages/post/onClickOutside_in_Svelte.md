---
title: '偷师 VueUse ，在 Svelte 中实现 onClickOutside'
date: '2024-11-14'
---

# 偷师 VueUse ，在 Svelte 中实现 onClickOutside

## 需求说明

最近在学习 svelte，我在做一个抽屉（Drawer）组件时，想要实现点击抽屉外部自动关闭的功能。由于并不是我平时常用的框架，因此我并未找到类似 vueuse 那样专门为 svelte 提供帮助的工具库。于是我想到了 vueuse 的`onClickOutside`方法。

## 技术探索

在前端开发中，点击外部关闭（Click Outside）是一个非常常见的交互模式。无论是下拉菜单、模态框，还是抽屉组件，都可能需要这样的功能。其核心原理其实很简单：监听全局的点击事件，判断点击的目标元素是否在指定区域之外。
让我们来深入理解这个看似简单的功能背后的技术细节：

### 事件传播机制

在实现 onClickOutside 时，我们需要充分理解 DOM 事件的传播机制。事件传播分为三个阶段：

- 捕获阶段（Capturing Phase）
- 目标阶段（Target Phase）
- 冒泡阶段（Bubbling Phase）
  这个机制让我们能够在合适的时机捕获点击事件，从而判断点击是否发生在目标元素外部。

### 实现思路

一个基础的 onClickOutside 实现可能是这样的, 当然这里的添加点击事件可以使用`useEventListener`：

```TypeScript
function onClickOutside(el: HTMLElement, handler: () => void) {
    const handleClick = (event: MouseEvent) => {
	    if (!el || el === event.target ||event.composedPath().includes(el))
		    return
        // 检查点击的目标是否在element内部
	    handler(event)
    };
    // 在window监听点击事件
    window.addEventListener('click', handleClick);
    // 清理函数
   const stop = () => {
        window.removeEventListener('click', handleClick);
    };

	return stop;
}
```

在实现  onClickOutside  时，我们需要一个精确的判断逻辑来确定点击是否发生在目标元素外部。让我们看看这行看似简单的代码：

```TypeScript
if (!el || el === event.target || event.composedPath().includes(el))
```

- `!el`:  检查是否为空
- `el === event.target`:  判断直接命中。当用户点击的正是我们监听的元素时，不会触发外部点击事件。
- `event.composedPath().includes(el)`: 首先`composedPath()`返回事件传播路径上的所有元素数组，从触发事件的目标元素开始，一直到  Window 对象。之后检查是否存在监听的元素。这样可以检查整个事件冒泡路径并且正确处理 Shadow DOM 中的事件传播。
  好了，现在让我加上一点 Svelte：

```TypeScript
interface ClickOutsideOptions {
    enabled?: boolean;
    handler: (event: MouseEvent) => void;
}

type ClickOutsideParameters = ((event: MouseEvent) => void) | ClickOutsideOptions;

// Svelte action 返回类型
interface ClickOutsideAction {
    update: (newParams: ClickOutsideParameters) => void;
    destroy: () => void;
}

export function onClickOutside(
    el: HTMLElement,
    params: ClickOutsideParameters
): ClickOutsideAction {
    let options: ClickOutsideOptions = {
        enabled: true,
        handler: typeof params === 'function' ? params : params.handler
    };

    const handleClick = (event: MouseEvent) => {
        if (!options.enabled) return;

        if (!el ||
            el === event.target ||
            event.composedPath().includes(el)
        ) return;

        options.handler(event);
    };
    window.addEventListener('click', handleClick, true);
    return {
        update(newParams: ClickOutsideParameters) {
            options = {
                enabled: true,
                handler: typeof newParams === 'function'
                    ? newParams
                    : newParams.handler
            };
        },
        destroy() {
            window.removeEventListener('click', handleClick, true);
        }
    };
}
```

```html
<script lang="ts">
  import { onClickOutside } from './clickOutside'

  export let open = false
  export let disabled = false

  const clickOutsideOptions = {
    enabled: !disabled,
    handler: () => {
      open = false
    }
  }
</script>

<div class="drawer" class:open use:onClickOutside="{clickOutsideOptions}">
  <slot />
</div>
```

## 总结

今天研究了下  onClickOutside  的实现原理，没想到这么简单的功能还挺有意思。用  composedPath()  处理事件传播路径属实优雅。顺便还学到了 Svelte 的一些玩法，感觉和 Vue  的思路还挺像的，就是生态不太完善，连个 VueUse 平替都没有（也有可能是我没找到 🤔）。
