---
title: 你可能需要网站国际化
date: 2024-11-6
---

# 你可能需要网站国际化

## 为什么需要 i18n

在这个全球化的时代，英语虽然广泛使用，但实际上只有很小一部分的世界人口会说英语。随着互联网的普及，非英语用户群体正在迅速增长，尤其是在新兴市场中。

为了让网站服务于更广泛的用户群体，开发者们创造了"i18n"这个概念。这个简写源于"internationalization"一词，中间的 18 个字母用数字表示，保留首尾的"i"和"n"。通过 JavaScript 的 i18n API，我们可以轻松实现网站的多语言支持，让来自不同国家的用户都能便捷地使用我们的服务。

## Intl

Intl（Internationalization API）是 JavaScript 内置的国际化 API，它提供了一系列用于处理日期、数字、货币和字符串比较的标准化方法。

### 数字格式化

```JavaScript
const number = 123456.789;

// 基础数字格式化
console.log(new Intl.NumberFormat('zh-CN').format(number))
// 输出: 123,456.789

// 货币格式化
console.log(new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
}).format(number))
// 输出: ¥123,456.79
```

### 日期格式化

```JavaScript
const date = new Date();

// 完整日期
console.log(new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'full'
}).format(date))
// 输出: xxxx年x月xx日星期x

// 自定义格式
console.log(new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date))
// 输出: xxxx年x月xx日
```

### 相对时间

```JavaScript
const rtf = new Intl.RelativeTimeFormat('zh-CN');

console.log(rtf.format(-1, 'day'))    // 1天前

console.log(rtf.format(2, 'month'))   // 2个月后

console.log(rtf.format(-5, 'minute')) // 5分钟前
```

### 语言敏感的字符串比较

```JavaScript
console.log(
  ['Z', 'a', 'z', 'ä'].sort(
    new Intl.Collator('de', { caseFirst: 'upper' }).compare,
  ),
);
//['a', 'ä', 'Z', 'z']
```

除了一些标准的国际化格式配置之外，网站内容的国际化也同样重要。

### 内容 i18n

前段时间公司的一个需求，由于 element plus 组件不支持相应的功能，因此只好去 GitHub 仓库里面提 issue，也就顺便看了看源码。在看的过程中，我注意到这段代码：

```JavaScript
<slot v-if="hasLoadError" name="error">
   <div :class="ns.e('error')">{{ t('el.image.error') }}</div>
</slot>
    ...
const { t } = useLocale()
```

由于之前从未接触过国际化的需求，对这一方面也不太了解。起初我以为是一个 JS 库提供的 hooks，深入了解后才知道是 element plus 自己写的一个 hook，通过 useLocale 函数抛出的 t 方法，传入代表 path 的字符串，再在方法里面去读取对应的数据，这样就可以保证组件的内容使用同一种语言配置。

```JavaScript
export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale))

export const translate = (
  path: string,
  option: undefined | TranslatorOption,
  locale: Language
): string =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  )

export const buildLocaleContext = (
  locale: MaybeRef<Language>
): LocaleContext => {
  const lang = computed(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}
```

当然，除了自己手写 hook 的方法，也有一些开源的库可以使用：

- vue-i18n
- react-i18next
- i18next
- i18n-js

## i18n-ally

i18n-ally 是一个强大的 VSCode 插件,用于帮助开发者更好地管理项目的国际化(i18n)资源。它支持多种流行的 i18n 框架，包括上述提到的几种。

### 主要功能

#### 1. 智能提示与自动补全

在代码中使用翻译 key 时,会自动提示已有的翻译:
![alt text](/image/i18n1.png)

#### 2. 国际化资源管理

可以在 vscode 查看到当前项目的国际化程度:
![alt text](/image/i18n2.png)

#### 3. 翻译预览

内联显示翻译内容：
![alt text](/image/i18n3.png)

### 配置选项

```json
{
  // 翻译文件路径
  "i18n-ally.localesPaths": ["src/locales"],

  // 翻译key的样式：flat 或 nested
  "i18n-ally.keystyle": "nested",

  // 源语言
  "i18n-ally.sourceLanguage": "en",

  // 显示语言
  "i18n-ally.displayLanguage": "zh-CN",

  // 框架设置
  "i18n-ally.framework": "vue",

  // 启用机器翻译
  "i18n-ally.enabledFrameworks": ["vue", "react"],

  // 翻译文件匹配规则
  "i18n-ally.namespace": true,

  // 忽略文件
  "i18n-ally.ignoreFiles": ["node_modules/**"]
}
```

具体问题请参考: [i18n-ally 维基](https://github.com/lokalise/i18n-ally/wiki)

## 小结

以上是我最近几天对于前端国际化的一些研究，希望能为你在实现国际化时提供一些思路。
