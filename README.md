# Zjr 的博客

一个零依赖的中文 Jekyll 博客主题，专为 GitHub Pages 设计：不需要 `remote_theme`，不需要自己装 Ruby，推到 `main` 分支 GitHub 就会自动构建。

**线上地址**：https://zjr0118.github.io

## 目录结构

```text
.
├── _config.yml            # 全站配置（标题、导航、分页、评论）
├── _layouts/              # 页面模板：首页 / 文章 / 独立页 / 通用外壳
├── _includes/             # 复用片段：head、导航、页脚、评论
├── _posts/                # 文章都在这里：YYYY-MM-DD-标题.md
├── assets/
│   ├── css/main.css       # 主题样式（配色、排版、响应式）
│   ├── js/main.js         # 深色模式、回到顶部、代码复制
│   └── favicon.svg        # 站点图标
├── index.html             # 首页（分页列表）
├── archive.html           # /archive/  按年份归档
├── tags.html              # /tags/     标签聚合
├── about.md               # /about/    关于页
├── 404.html               # 404 页面
├── robots.txt
├── Gemfile                # 仅本地预览用，GitHub 构建会忽略
└── README.md
```

## 一、日常写文章（最常做的事）

1. 在 `_posts/` 新建文件，文件名格式**必须**是 `YYYY-MM-DD-英文短标题.md`，例如 `2026-11-22-first-post.md`。
2. 文件开头写 front matter：

```yaml
---
title: "文章标题"
date: 2026-11-22 20:00:00 +0800
categories: [折腾]
tags: [GitHub Pages, Jekyll]
excerpt: "首页列表显示的摘要。"
---
```

3. 正文写 Markdown，提交推送：

```bash
git add .
git commit -m "新增文章：xxx"
git push origin main
```

> 注意 `date` 不能晚于当前时间。Jekyll 默认不生成「未来文章」——写成今天 23:00 而现在是上午，这篇文章就不会出现（也不报错）。想让定时发布生效，在 `_config.yml` 加 `future: true`。

4. 等 1～3 分钟，刷新 https://zjr0118.github.io 。构建进度在仓库 **Actions** 页看。

> 日期或文件名格式错 = 文章不生成页面，这是最高频的坑。

## 二、改站点信息

全在 `_config.yml`：

| 想改什么 | 改哪个字段 |
| --- | --- |
| 站名 | `title` |
| 副标题（导航下方小字） | `tagline` |
| 首页介绍段落 | `description` |
| 作者名 / 简介 / GitHub 主页 | `author.name` / `author.bio` / `author.url` |
| 顶部导航 | `nav` 列表 |
| 每页文章数 | `paginate`（默认 6） |
| 文章网址格式 | `permalink`（默认 `/:year/:month/:title/`） |

改完推送即可。

## 三、换配色（30 秒）

打开 `assets/css/main.css`，只改最上面两个变量：

```css
:root {
  --accent: #0f766e;        /* 主色：链接、按钮、高亮 */
  --accent-ink: #0b5d57;    /* 主色的深一档，用于悬停 */
  --accent-soft: #e7f4f2;   /* 主色的浅底，用于标签底 */
}
html[data-theme="dark"] {
  --accent: #2dd4bf;
  --accent-ink: #7ff0e2;
  --accent-soft: #12312e;
}
```

换成蓝色示例：`#2563eb / #1d4ed8 / #e8efff`，深色用 `#60a5fa / #bfdbfe / #16233d`。

## 四、开启评论（giscus，5 分钟）

1. 确认仓库是 **Public**。
2. 打开 https://github.com/apps/giscus 安装到本仓库。
3. 打开 https://giscus.app ，填入仓库 `Zjr0118/Zjr0118.github.io`，选择 Discussion 分类（通常是 `Announcements`），页面会给出 `data-repo-id` 和 `data-category-id`。
4. 把这两个值填到 `_config.yml`：

```yaml
giscus:
  repo: "Zjr0118/Zjr0118.github.io"
  repo_id: "R_xxxxxxx"
  category: "Announcements"
  category_id: "DIC_xxxxxxx"
```

5. 推送后每篇文章底部自动出现评论区；不填就是全站不显示。

## 五、本地预览（可选）

不装 Ruby 也能写博客 —— 直接在线编辑、推送、等 GitHub 构建即可。想本地实时预览才需要：

```bash
# 1. 安装 Ruby + Devkit（Windows 用 RubyInstaller，勾选 Devkit）
ruby -v

# 2. 装依赖
gem install bundler
bundle install

# 3. 启动（http://127.0.0.1:4000）
bundle exec jekyll serve --livereload

# 4. 只构建不启动
bundle exec jekyll build
```

常见报错：

| 报错 | 解决 |
| --- | --- |
| `cannot load such file -- webrick` | Ruby 3.x 需要 `gem install webrick`（Gemfile 已包含） |
| `bundle install` 卡住 | 换源：`bundle config mirror.https://rubygems.org https://gems.ruby-china.com` |
| 本地好、线上红叉 | 看 Actions 日志，多是 `_config.yml` 缩进/冒号后的空格问题 |
| 中文乱码 | 确认文件保存为 UTF-8 无 BOM |

## 六、绑定自定义域名（可选）

1. 域名商处添加解析：
   - `A` 记录 → `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - `www` 用 `CNAME` → `zjr0118.github.io`
2. 仓库根目录新建文件 `CNAME`，内容只有一行（不要带 `https://`）：

```text
blog.yourdomain.com
```

3. 仓库 `Settings → Pages → Custom domain` 填入同一域名，勾选 **Enforce HTTPS**。
4. 等 DNS 生效（几分钟到几小时）。

## 七、首页 / 归档 / 标签是怎么工作的

- **首页**：`index.html` 用 `paginator.posts` 循环，分页由 `_config.yml` 的 `paginate` 控制（依赖 `jekyll-paginate`）。
- **归档**：`archive.html` 用 `group_by_exp` 按年份分组。
- **标签**：`tags.html` 遍历 `site.tags`，每个标签自带锚点 `#标签名`，文章里的标签链接直接跳过去。
- **RSS / Sitemap / SEO**：分别由 `jekyll-feed`、`jekyll-sitemap`、`jekyll-seo-tag` 自动生成，都是 GitHub Pages 官方允许的插件。

## 八、想换成 Minimal Mistakes 等成熟主题？

本仓库是自建主题，不依赖任何主题 gem。若要换：

1. 删掉 `_layouts/`、`assets/css/main.css`、`index.html` 里的自定义部分；
2. `_config.yml` 加 `remote_theme: "mmistakes/minimal-mistakes@4.24.0"`；
3. 在 `_config.yml` 增加 `plugins: [jekyll-remote-theme, ...]`；
4. 按主题文档补 `_data/navigation.yml` 等文件。

注意 `remote_theme` 依赖 `jekyll-remote-theme` 插件在 GitHub Pages 白名单内，可行但比自建主题更容易构建失败，出问题优先看 Actions 日志。
