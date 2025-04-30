[Onion-L's Blog](https://o-crew.github.io/onion-blog/)🧅

Thanks to the [youtube video](https://www.youtube.com/watch?v=kt0FrkQgw8w&t=7158s) made by JavaScript Mastery for the tutorial.

Problems I meet and solutions:

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
