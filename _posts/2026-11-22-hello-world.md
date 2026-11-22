---
title: "开博第一篇：这个博客是怎么搭起来的"
date: 2026-11-22 09:30:00 +0800
categories: [折腾]
tags: [GitHub Pages, Jekyll, 建站]
excerpt: "从零到上线：仓库怎么建、主题怎么改、文章怎么写、推上去多久生效。把这套流程记下来，下次换电脑也不用重新摸索。"
---

这是一篇「占位 + 说明书」二合一的文章。它同时验证了三件事：Markdown 渲染正常、代码高亮正常、标签和归档页面正常。

把这篇删掉之前，建议先照着它写一篇自己的，熟悉一下流程。

## 一、写文章只需要三步

### 1. 在 `_posts` 目录新建文件

文件名必须严格遵循这个格式：

```text
YYYY-MM-DD-英文短标题.md
```

例如：

```text
2026-11-22-hello-world.md
2026-12-01-arch-linux-notes.md
```

日期写错、格式不对（比如用了中文冒号、缺了横杠），这篇就不会被生成页面 —— 这是新手最常踩的坑。

### 2. 文件开头写 front matter

三段横线包住的一段配置，叫 front matter，必须放在文件**第一行**：

```yaml
---
title: "文章标题"
date: 2026-11-22 20:00:00 +0800
categories: [折腾]
tags: [GitHub Pages, Jekyll]
excerpt: "列表页显示的摘要，一句话就够。"
---
```

字段说明：

| 字段 | 是否必填 | 作用 |
| --- | --- | --- |
| `title` | 必填 | 文章标题 |
| `date` | 建议填 | 排序依据，带时区更准 |
| `categories` | 可选 | 顶部小字分类，可用数组 |
| `tags` | 可选 | 标签，会出现在标签页 |
| `excerpt` | 可选 | 首页摘要，不填则取正文第一段 |

### 3. 正文直接写 Markdown

标题用 `##`、`###`，代码用三个反引号包起来并标注语言，图片用 `![说明](图片地址)`。就这样，没了。

## 二、提交并上线

在仓库根目录执行：

```bash
git add .
git commit -m "新增文章：开博第一篇"
git push origin main
```

推送后 GitHub 会自动构建，通常 **1～3 分钟**生效。进度可以看仓库的 **Actions** 标签页，绿勾就是成功，红叉点进去能看到具体报错。

## 三、几个常用语法示例

**引用块：**

> 写博客最难的不是排版，是开始写第一句。

**列表：**

1. 先写，再改
2. 别纠结主题配色
3. 三个月后你会感谢现在的记录

**行内代码**：改站点标题就编辑 `_config.yml` 里的 `title`。

**代码块**（带复制按钮）：

```python
def hello(name: str) -> str:
    """最简单的函数，用来验证高亮。"""
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(hello("world"))
```

**表格：**

| 操作 | 命令 |
| --- | --- |
| 本地预览 | `bundle exec jekyll serve` |
| 只看构建 | `bundle exec jekyll build` |
| 清理缓存 | `bundle exec jekyll clean` |

## 四、接下来可以做什么

- 把 `_config.yml` 里的 `title`、`description`、`author` 换成自己的
- 改 `assets/css/main.css` 顶部的 `--accent`，整站配色就变了
- 装 giscus 评论（见 README，五分钟）
- 绑定自己的域名（可选，见 README）

写起来吧。
