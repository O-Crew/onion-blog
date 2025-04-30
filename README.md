[Onion-L's Blog](https://o-crew.github.io/onion-blog/)🧅

**Git LFS causes the network returns version pointer file, not the actual file.**

- `git lfs ls-files` to check the files tracked by git lfs.
- `git lfs push --all origin` to push the files to the remote repository.
- change the workflow file to use `lfs: true` to push the files to the remote repository.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
    with:
      lfs: true
```

NOTICE🫣: Remember to clean the cache after deploying.

Thanks to the [youtube video](https://www.youtube.com/watch?v=kt0FrkQgw8w&t=7158s) made by JavaScript Mastery for the tutorial.

GLTF models are from [Sketchfab](https://sketchfab.com/).

[GLTFJSX](https://github.com/pmndrs/gltfjsx) is used to transform the GLTF models to React components.

## 技术实现思路

- 使用 Next.js 和 Tailwind CSS 构建博客
- 使用 Three.js 渲染 3D 模型
- 从 sketchfab 下载的模型，使用 GLTFJSX 转换为 React 组件，并使用 useGLTF 和 useAnimations 控制动画
