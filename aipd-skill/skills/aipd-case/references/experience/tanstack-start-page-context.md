# TanStack Start 页面上下文

## 来源

- 来源类型：真实 TanStack Start 项目里的页面目录。基础版把页面文件和组件平铺在同一个路由目录；后来的项目把一个地址收成一页，详情页再往下分过一层。
- 经验性质：TanStack Start 代码实践经验。保留页面文件夹怎么放。某一次详情目录只作复杂页的参考。

## 适用场景

在 TanStack Start 的 Design / Execute 阶段，新建页面，或整理 `src/routes/` 里的页面文件和组件文件时，读取本经验。

基础版的 `routes/admin/`、`routes/settings/` 是散开的样子。`users.tsx`、`posts.tsx`、`profile.tsx` 各自是页面，`-copy-button.tsx`、`-settings-form.tsx` 是组件，和页面排在同一层。页面自己的块还会掉到 `src/components`。打开一个目录，看不全某一页的上下文。

## 页面是一夹上下文

一个地址一个文件夹。文件夹根上的 `index.tsx` 是页面。

简单页的根上只有两样：`index.tsx`，和一夹以 `-` 开头的文件夹。组件、文案、样式都进这一夹。`-` 是 TanStack 文件路由的约定，这一夹不进路由。夹名用 `-common` 即可，名字可以随这一页，约定是根上只有这一夹。

```text
routes/model/lm/
  index.tsx
  -common/
    family-band.tsx
    messages.ts
    page.css
```

图像、视频、音频、专业各是一个地址，各是这样一页。五个地址就是五个文件夹，各收各的文件。

已有的目录页、首页和早期列表，根上还摊着组件和文案。那是没收完。新页按根上两样来放。

这一页夹里的文件只给这一页用。站点壳和数据读取留在页面文件夹外面。

## 复杂页再往下分一层

一夹装不下时，再分一层子页面。页里有多块子页面，例如一组 Tab，会走到这里。地址仍是同一个详情页，几种正文差到不适合共用一套，也会走到这里。

模型详情是这种分法的参考。地址仍是 `/model/$modelId`。根上的 `index.tsx` 仍是页面，它取完数据，按差别进入某一块正文。大家一起用的留在 `-common/`。只属于某一块正文的，留在那一块自己的夹里。语言正文自己的规格、评分、接口示例留在 `-pageLm/`。

```text
routes/model/$modelId/
  index.tsx
  -common/
  -pageLm/
    page.tsx
    facts.tsx
    scores.tsx
    api.tsx
  -pageImage/
  -pageVideo/
  -pageAudio/
  -pageDefault/
```

子页面沿用同一件事：这一块的入口在自己的目录里，只属于这一块的留在这一块里。`-pageLm` 这些名字是这次详情的分法，用来看再往下怎么收。

## 后续借鉴方式

- 做 TanStack Start 新页时，先放根上的 `index.tsx` 和一夹 `-common/`。
- 页内要再分成多块子页面，或同一地址下的几种正文不适合共用时，再参照详情页往下分一层。
- 组件之间怎么传数据，读 `vue3-local-context-component-autonomy.md`。本条回答 `routes` 里页面和组件文件怎么放。
