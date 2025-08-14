---
title: 解压的艺术：用 Rust 处理 .tar.gz 文件🦀
date: 2025-06-30
---

# 解压的艺术：用 Rust 处理 .tar.gz 文件🦀

如果有人用过 [degit](https://github.com/Rich-Harris/degit) 就会知道，这是一个用于下载”干净“仓库的工具，其中又分为`git`和`tar`两个模式。`git`模式自不必多少，`git clone` 大家平时肯定都不少用到。而`tar`模式，在研究过源码后我知道，是从github等网站上下载仓库的`.tar.gz`文件并且进行解压。至于为什么是tar.gz文件而不是zip文件，我的理解是tar.gz文件在不通系统的兼容性上更高且体积更小，压缩和解压更高效。当然具体的原因还得等作者本人来解答。
## 分层设计📄

不知道有没有人好奇，为什么是`.tar.gz`，为什么不是`.tar`、`.gz`或者`.gz.tar`，这其实是因为`tar.gz`并不是一个单一的压缩算法，它是两种独立工具的结合：`tar` 和 `gzip`。想象一下，你有一堆文件和目录，你想要把它们打包起来，还要让它们变得更小，那么你肯定会选择将所有的文件内容打包成一个单一文件再进行压缩操作，这就是tar和gzip的工作。

tar是 Tape Archive（翻译：磁带档案） 的缩写，顾名思义，是用来打包的。它的主要任务是把多个文件和目录“捆绑”成一个单一的文件。它能保留你的文件结构、权限以及各种元数据，确保你的文件保持原来的样子。但请注意，tar 本身不提供任何压缩功能，它只负责打包，不负责瘦身。

zip 则是个专业的“瘦身师”。它的职责就是压缩单个文件，让文件体积变得更小，从而节省存储空间和传输带宽。但它的缺点是，它只能处理单个文件，如果你想压缩多个文件，它就束手无策了。

这种分层设计也就体现出关注点分离这一原则。`tar` 专注于文件集合的组织和元数据保留，而 `gzip` 则专注于数据的压缩。这种各司其职的设计，也为我们未来选择不同的压缩算法（比如 `bzip2`、`xz`）提供了可能，不同的压缩算法会产生不同的组合。
## `tar.gz` 文件的压缩与解压流程

理解了它们的职责，`tar.gz` 文件的处理流程也就水到渠成了：
- **压缩：**
    1. 首先，我们会用 **`tar`** 命令把多个文件和目录打包成一个 `.tar` 文件。
    2. 然后，再用 **`gzip`** 命令来压缩这个 `.tar` 文件，最终得到我们熟悉的 `.tar.gz`（或者 `tgz`）文件。
- **解压：**
    1. 当我们要解压时，首先在外层使用 **`gzip`** 进行解压，还原出原始的 `.tar` 文件。
    2. 接着， **`tar`** 会解包这个 `.tar` 文件，最终还原出所有的原始文件和目录。
## Rust 实战🦀

Talk is cheap, show me the code! 这里我们以 Rust 为例处理 `tar.gz` 文件的两层结构。我们通常会用到 `flate2` 库来处理 `gzip` 层，以及 `tar` 库来处理 `tar` 层。

```Rust
// 第1层：打开.tar.gz并解压gzip层
let file = File::open("archive.tar.gz")?;
let gzip = GzDecoder::new(file);

// 第2层：解析tar层并提取文件
let mut archive = Archive::new(gzip);
archive.unpack("target_dir_name")?;
```

`GzDecoder::new(file)` 负责解压 `gzip` ，然后 `Archive::new(gzip)` 再用 `tar` 的能力去处理里面的内容。
## 处理顶层目录🤔

然而，从 GitHub 或其他代码仓库下载的 `tar` 包常常会有一个顶层目录（比如 `my-project-1.0.0/`）。如果直接使用 `archive.unpack("dir_name")?`，你可能会发现目标目录下多了一层不必要的目录，这并不是我想要的。

那么，有没有办法可以直接解压到目标目录，同时又跳过顶层目录呢？当然有！基本的思路就是：遍历解压文件，跳过顶层目录，直接将文件解压到我们指定的目标目录中。

```Rust
for entry_result in archive.entries()? {
    let mut entry = entry_result?;
   
   // 获取条目路径
   let path = entry.path()?.to_owned(); // 使用 Path 的 components
   let mut components = path.components(); 
   
   // 跳过第一个组件（根目录） 
   if components.next().is_none() { continue; } 
   
   // 构建新路径 
   let new_path: PathBuf = components.collect();
   if new_path.as_os_str().is_empty() {
       continue; 
   } 
   
   let target_path = Path::new(dir).join(new_path); 
   // 创建父目录 
   if let Some(parent) = target_path.parent() { 
       create_dir_all(parent)?; 
   }
    // 解压文件到新路径
    entry.unpack(&target_path)?;
}
```

这段代码通过迭代 `archive.entries()` 获取每个文件条目，通过路径分隔符 `/` 的数量来判断是否是顶层目录。如果是，就跳过它；如果不是，就移除路径中的顶层部分，然后将文件解压到我们希望的目标位置。
### 流式处理 🌊

在处理大文件时，效率是关键。`flate2` 和 `tar` 这两个 Rust 库都支持流式处理，这使得文件解压的速度十分的快。

你不需要一次性把整个 `.tar.gz` 文件都加载到内存中，数据是逐块处理的。这对于处理几十 GB 甚至上百 GB 的大文件来说至关重要，能有效避免内存溢出。且解压和解析同时进行， `tar` 库需要更多数据来解析下一个文件条目时，`GzDecoder` 就会解压更多数据给它。它们之间就像一个高效的流水线，无缝衔接。

具体来说，`flate2::read::GzDecoder` 实现了 Rust 的 `Read` trait。你只要像读取普通文件一样从它读取数据，它就会自动边读边解压（流式解压）。`tar::Archive` 也同样实现了流式处理。你可以通过 `entries()` 迭代每一个文件条目，或者像我们前面那样使用 `unpack()` 一次性解包到目录。它会自动边读边解包，不会把整个压缩包一股脑读入内存。
## 总结

`tar.gz` 这种看似简单的文件格式，背后蕴含着精巧的分层设计理念和高效的流式处理思想。另外提一嘴，我之所以会了解到这部分内容，是因为我正在尝试用 Rust 重写degit：[ogito](https://github.com/Onion-L/ogito)，请别停止这场 Rust 重写的戏剧，让暴风雨来得更猛烈些吧hhh！