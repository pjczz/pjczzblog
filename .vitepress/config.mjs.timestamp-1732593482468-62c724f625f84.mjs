// .vitepress/config.mjs
import { defineConfig } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/vitepress@1.4.0_@algolia+client-search@5.8.0_@types+node@22.7.5_markdown-it-mathjax3@4.3.2_po_bardl3e3lcu4wj2bix6qf73dqy/node_modules/vitepress/dist/node/index.js";

// .vitepress/theme/utils/generateRSS.mjs
import { createContentLoader } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/vitepress@1.4.0_@algolia+client-search@5.8.0_@types+node@22.7.5_markdown-it-mathjax3@4.3.2_po_bardl3e3lcu4wj2bix6qf73dqy/node_modules/vitepress/dist/node/index.js";
import { writeFileSync } from "fs";
import { Feed } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/feed@4.2.2/node_modules/feed/lib/feed.js";
import path from "path";
var createRssFile = async (config, themeConfig3) => {
  const siteMeta = themeConfig3.siteMeta;
  const hostLink = siteMeta.site;
  const feed = new Feed({
    title: siteMeta.title,
    description: siteMeta.description,
    id: hostLink,
    link: hostLink,
    language: "zh",
    generator: siteMeta.author.name,
    favicon: siteMeta.author.cover,
    copyright: `Copyright \xA9 2020-present ${siteMeta.author.name}`,
    updated: /* @__PURE__ */ new Date()
  });
  let posts = await createContentLoader("posts/**/*.md", {
    render: true
  }).load();
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
  for (const { url, frontmatter } of posts) {
    if (feed.items.length >= 10) break;
    let { title, description, date } = frontmatter;
    if (typeof date === "string") date = new Date(date);
    feed.addItem({
      title,
      id: `${hostLink}${url}`,
      link: `${hostLink}${url}`,
      description,
      date,
      // updated,
      author: [
        {
          name: siteMeta.author.name,
          email: siteMeta.author.email,
          link: siteMeta.author.link
        }
      ]
    });
  }
  writeFileSync(path.join(config.outDir, "rss.xml"), feed.rss2(), "utf-8");
};

// .vitepress/config.mjs
import { withPwa } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/@vite-pwa+vitepress@0.4.0_vite-plugin-pwa@0.19.8_vite@5.4.8_@types+node@22.7.5_sass@1.79.4_te_4texzszdeifsnxu4vy5pq26ile/node_modules/@vite-pwa/vitepress/dist/index.mjs";

// .vitepress/theme/utils/commonTools.mjs
import { load } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/cheerio@1.0.0-rc.12/node_modules/cheerio/lib/esm/index.js";
var generateId = (fileName) => {
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash << 5) - hash + fileName.charCodeAt(i);
  }
  const numericId = Math.abs(hash % 1e10);
  return numericId;
};
var jumpRedirect = (html, themeConfig3, isDom = false) => {
  try {
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return false;
    if (!themeConfig3.jumpRedirect.enable) return html;
    const redirectPage = "/redirect";
    const excludeClass = themeConfig3.jumpRedirect.exclude;
    if (isDom) {
      if (typeof window === "undefined" || typeof document === "undefined") return false;
      const allLinks = [...document.getElementsByTagName("a")];
      if (allLinks?.length === 0) return false;
      allLinks.forEach((link) => {
        if (link.getAttribute("target") === "_blank") {
          if (excludeClass.some((className) => link.classList.contains(className))) {
            return false;
          }
          const linkHref = link.getAttribute("href");
          if (linkHref && !linkHref.includes(redirectPage)) {
            const encodedHref = btoa(linkHref);
            const redirectLink = `${redirectPage}?url=${encodedHref}`;
            link.setAttribute("original-href", linkHref);
            link.setAttribute("href", redirectLink);
          }
        }
      });
    } else {
      const $ = load(html);
      $("a[target='_blank']").each((_, el) => {
        const $a = $(el);
        const href = $a.attr("href");
        const classesStr = $a.attr("class");
        const innerText = $a.text();
        const classes = classesStr ? classesStr.trim().split(" ") : [];
        if (excludeClass.some((className) => classes.includes(className))) {
          return;
        }
        if (href && !href.includes(redirectPage)) {
          const encodedHref = Buffer.from(href, "utf-8").toString("base64");
          const attributes = el.attribs;
          let attributesStr = "";
          for (let attr in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
              attributesStr += ` ${attr}="${attributes[attr]}"`;
            }
          }
          const newLink = `<a href="${redirectPage}?url=${encodedHref}" original-href="${href}" ${attributesStr}>${innerText}</a>`;
          $a.replaceWith(newLink);
        }
      });
      return $.html();
    }
  } catch (error) {
    console.error("\u5904\u7406\u94FE\u63A5\u65F6\u51FA\u9519\uFF1A", error);
  }
};

// .vitepress/theme/utils/getPostData.mjs
import { globby } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/globby@14.0.2/node_modules/globby/index.js";
import matter from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import fs from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js";
var getPostMDFilePaths = async () => {
  try {
    let paths = await globby(["**.md"], {
      ignore: ["node_modules", "pages", ".vitepress", "README.md"]
    });
    return paths.filter((item) => item.includes("posts/"));
  } catch (error) {
    console.error("\u83B7\u53D6\u6587\u7AE0\u8DEF\u5F84\u65F6\u51FA\u9519:", error);
    throw error;
  }
};
var compareDate = (obj1, obj2) => {
  return obj1.date < obj2.date ? 1 : -1;
};
var comparePostPriority = (a, b) => {
  if (a.top && !b.top) {
    return -1;
  }
  if (!a.top && b.top) {
    return 1;
  }
  return compareDate(a, b);
};
var getAllPosts = async () => {
  try {
    let paths = await getPostMDFilePaths();
    let posts = await Promise.all(
      paths.map(async (item) => {
        try {
          const content = await fs.readFile(item, "utf-8");
          const stat = await fs.stat(item);
          const { birthtimeMs, mtimeMs } = stat;
          const { data } = matter(content);
          const { title, date, categories, description, tags, top, cover } = data;
          const expired = Math.floor(
            ((/* @__PURE__ */ new Date()).getTime() - new Date(date).getTime()) / (1e3 * 60 * 60 * 24)
          );
          return {
            id: generateId(item),
            title: title || "\u672A\u547D\u540D\u6587\u7AE0",
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            expired,
            tags,
            categories,
            description,
            regularPath: `/${item.replace(".md", ".html")}`,
            top,
            cover
          };
        } catch (error) {
          console.error(`\u5904\u7406\u6587\u7AE0\u6587\u4EF6 '${item}' \u65F6\u51FA\u9519:`, error);
          throw error;
        }
      })
    );
    posts.sort(comparePostPriority);
    return posts;
  } catch (error) {
    console.error("\u83B7\u53D6\u6240\u6709\u6587\u7AE0\u65F6\u51FA\u9519:", error);
    throw error;
  }
};
var getAllType = (postData2) => {
  const tagData = {};
  postData2.map((item) => {
    if (!item.tags || item.tags.length === 0) return;
    if (typeof item.tags === "string") {
      item.tags = item.tags.split(",");
    }
    item.tags.forEach((tag) => {
      if (!tagData[tag]) {
        tagData[tag] = {
          count: 1,
          articles: [item]
        };
      } else {
        tagData[tag].count++;
        tagData[tag].articles.push(item);
      }
    });
  });
  return tagData;
};
var getAllCategories = (postData2) => {
  const catData = {};
  postData2.map((item) => {
    if (!item.categories || item.categories.length === 0) return;
    if (typeof item.categories === "string") {
      item.categories = item.categories.split(",");
    }
    item.categories.forEach((tag) => {
      if (!catData[tag]) {
        catData[tag] = {
          count: 1,
          articles: [item]
        };
      } else {
        catData[tag].count++;
        catData[tag].articles.push(item);
      }
    });
  });
  return catData;
};
var getAllArchives = (postData2) => {
  const archiveData = {};
  postData2.forEach((item) => {
    if (item.date) {
      const date = new Date(item.date);
      const year = date.getFullYear().toString();
      if (!archiveData[year]) {
        archiveData[year] = {
          count: 1,
          articles: [item]
        };
      } else {
        archiveData[year].count++;
        archiveData[year].articles.push(item);
      }
    }
  });
  const sortedYears = Object.keys(archiveData).sort((a, b) => parseInt(b) - parseInt(a));
  return { data: archiveData, year: sortedYears };
};

// .vitepress/theme/assets/themeConfig.mjs
var themeConfig = {
  // 站点信息
  siteMeta: {
    // 站点标题
    title: "Pjczz",
    // 站点描述
    description: "\u613F\u968F\u5FC3\u6240\u6B32",
    // 站点logo
    logo: "/images/logo/logo.webp",
    // 站点地址
    site: "https://blog.imsyy.top",
    // 语言
    lang: "zh-CN",
    // 作者
    author: {
      name: "Admin",
      cover: "/images/logo/logo.webp",
      email: "114514@gmail.com",
      link: "https://www.imsyy.top"
    }
  },
  // 备案信息
  icp: "\u840CICP\u5907114514\u53F7",
  // 建站日期
  since: "2020-07-28",
  // 每页文章数据
  postSize: 8,
  // inject
  inject: {
    // 头部
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon
      ["link", { rel: "icon", href: "/favicon.ico" }],
      // RSS
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://blog.imsyy.top/rss.xml"
        }
      ],
      // 预载 CDN
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://s1.hdslb.com"
        }
      ],
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://mirrors.sustech.edu.cn"
        }
      ],
      // HarmonyOS font
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css"
        }
      ],
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/style.css"
        }
      ],
      // iconfont
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css"
        }
      ],
      // Embed code
      ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
      ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
      [
        "link",
        {
          crossorigin: "anonymous",
          href: "https://use.sevencdn.com/css2?family=Fira+Code:wght@300..700&display=swap",
          rel: "stylesheet"
        }
      ],
      // 预载 DocSearch
      [
        "link",
        {
          href: "https://X5EBEZB53I-dsn.algolia.net",
          rel: "preconnect",
          crossorigin: ""
        }
      ]
    ]
  },
  // 导航栏菜单
  nav: [
    {
      text: "\u6587\u5E93",
      items: [
        { text: "\u6587\u7AE0\u5217\u8868", link: "/pages/archives", icon: "article" },
        { text: "\u5168\u90E8\u5206\u7C7B", link: "/pages/categories", icon: "folder" },
        { text: "\u5168\u90E8\u6807\u7B7E", link: "/pages/tags", icon: "hashtag" }
      ]
    },
    {
      text: "\u4E13\u680F",
      items: [
        { text: "\u6280\u672F\u5206\u4EAB", link: "/pages/categories/\u6280\u672F\u5206\u4EAB", icon: "technical" },
        { text: "\u6211\u7684\u9879\u76EE", link: "/pages/project", icon: "code" },
        { text: "\u6548\u7387\u5DE5\u5177", link: "/pages/tools", icon: "tools" }
      ]
    },
    {
      text: "\u53CB\u94FE",
      items: [
        { text: "\u53CB\u94FE\u9C7C\u5858", link: "/pages/friends", icon: "fish" },
        { text: "\u53CB\u60C5\u94FE\u63A5", link: "/pages/link", icon: "people" }
      ]
    },
    {
      text: "\u6211\u7684",
      items: [
        { text: "\u7545\u6240\u6B32\u8A00", link: "/pages/message", icon: "chat" },
        { text: "\u81F4\u8C22\u540D\u5355", link: "/pages/thanks", icon: "reward" },
        { text: "\u5173\u4E8E\u672C\u7AD9", link: "/pages/about", icon: "contacts" }
      ]
    }
  ],
  // 导航栏菜单 - 左侧
  navMore: [
    {
      name: "\u535A\u5BA2",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "\u4E3B\u7AD9",
          url: "/"
        },
        {
          icon: "/images/logo/logo.webp",
          name: "\u535A\u5BA2\u955C\u50CF\u7AD9",
          url: "https://blog-backup.imsyy.top/"
        }
      ]
    },
    {
      name: "\u670D\u52A1",
      list: [
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
          name: "\u8D77\u59CB\u9875",
          url: "https://nav.imsyy.top/"
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
          name: "\u4ECA\u65E5\u70ED\u699C",
          url: "https://hot.imsyy.top/"
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
          name: "\u7AD9\u70B9\u76D1\u6D4B",
          url: "https://status.imsyy.top/"
        }
      ]
    },
    {
      name: "\u9879\u76EE",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "Curve",
          url: "https://github.com/imsyy/vitepress-theme-curve"
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/07/66124f5fc63c8.png",
          name: "SPlayer",
          url: "https://github.com/imsyy/SPlayer"
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/6613465358077.png",
          name: "Snavigation",
          url: "https://github.com/imsyy/SPlayer"
        },
        {
          icon: "/images/logo/logo.webp",
          name: "Home",
          url: "https://github.com/imsyy/home"
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/661346d418ad7.png",
          name: "DailyHotApi",
          url: "https://github.com/imsyy/DailyHotApi"
        },
        {
          icon: "https://pic.efefee.cn/uploads/2024/04/08/66134722586fa.png",
          name: "site-status",
          url: "https://github.com/imsyy/site-status"
        }
      ]
    }
  ],
  // 封面配置
  cover: {
    // 是否开启双栏布局
    twoColumns: false,
    // 是否开启封面显示
    showCover: {
      // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
      enable: true,
      // 封面布局方式: left | right | both
      coverLayout: "both",
      // 默认封面(随机展示)
      defaultCover: [
        "https://c.wallhere.com/images/30/2b/3f2214aa618eebf62e4ea4358f9a-1563305.jpg!d",
        "https://c.wallhere.com/images/83/c3/1cacab872d57c656e586a610d826-1580443.jpg!d",
        "https://c.wallhere.com/images/89/e5/17c1c33463358611cb5897f6f45e-1437727.jpg!d"
      ]
    }
  },
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      {
        icon: "email",
        link: "mailto:one@imsyy.top"
      },
      {
        icon: "github",
        link: "https://www.github.com/imsyy/"
      },
      {
        icon: "telegram",
        link: "https://t.me/bottom_user"
      },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/98544142"
      },
      {
        icon: "qq",
        link: "https://res.abeim.cn/api/qq/?qq=1539250352"
      },
      {
        icon: "twitter-x",
        link: "https://twitter.com/iimmsyy"
      }
    ],
    // sitemap
    sitemap: [
      {
        text: "\u535A\u5BA2",
        items: [
          { text: "\u8FD1\u671F\u6587\u7AE0", link: "/" },
          { text: "\u5168\u90E8\u5206\u7C7B", link: "/pages/categories" },
          { text: "\u5168\u90E8\u6807\u7B7E", link: "/pages/tags" },
          { text: "\u6587\u7AE0\u5F52\u6863", link: "/pages/archives", newTab: true }
        ]
      },
      {
        text: "\u9879\u76EE",
        items: [
          { text: "Home", link: "https://github.com/imsyy/home/", newTab: true },
          { text: "SPlayer", link: "https://github.com/imsyy/SPlayer/", newTab: true },
          { text: "DailyHotApi", link: "https://github.com/imsyy/DailyHotApi/", newTab: true },
          { text: "Snavigation", link: "https://github.com/imsyy/Snavigation/", newTab: true }
        ]
      },
      {
        text: "\u4E13\u680F",
        items: [
          { text: "\u6280\u672F\u5206\u4EAB", link: "/pages/categories/\u6280\u672F\u5206\u4EAB" },
          { text: "\u6211\u7684\u9879\u76EE", link: "/pages/project" },
          { text: "\u6548\u7387\u5DE5\u5177", link: "/pages/tools" }
        ]
      },
      {
        text: "\u9875\u9762",
        items: [
          { text: "\u7545\u6240\u6B32\u8A00", link: "/pages/message" },
          { text: "\u5173\u4E8E\u672C\u7AD9", link: "/pages/about" },
          { text: "\u9690\u79C1\u653F\u7B56", link: "/pages/privacy" },
          { text: "\u7248\u6743\u534F\u8BAE", link: "/pages/cc" }
        ]
      },
      {
        text: "\u670D\u52A1",
        items: [
          { text: "\u7AD9\u70B9\u72B6\u6001", link: "https://status.imsyy.top/", newTab: true },
          { text: "\u4E00\u4E2A\u5BFC\u822A", link: "https://nav.imsyy.top/", newTab: true },
          { text: "\u7AD9\u70B9\u8BA2\u9605", link: "https://blog.imsyy.top/rss.xml", newTab: true },
          {
            text: "\u53CD\u9988\u6295\u8BC9",
            link: "https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre",
            newTab: true
          }
        ]
      }
    ]
  },
  // 评论
  comment: {
    enable: false,
    // 评论系统选择
    // artalk / twikoo
    type: "artalk",
    // artalk
    // https://artalk.js.org/
    artalk: {
      site: "",
      server: ""
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      // 必填，若不想使用 CDN，可以使用 pnpm add twikoo 安装并引入
      js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/twikoo/1.6.39/twikoo.all.min.js",
      envId: "",
      // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
      region: "ap-shanghai",
      lang: "zh-CN"
    }
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: "\u8FD9\u91CC\u6709\u5173\u4E8E<strong>\u5F00\u53D1</strong>\u76F8\u5173\u7684\u95EE\u9898\u548C\u770B\u6CD5\uFF0C\u4E5F\u4F1A\u6709\u4E00\u4E9B<strong>\u5947\u6280\u6DEB\u5DE7</strong>\u7684\u5206\u4EAB\uFF0C\u5176\u4E2D\u5927\u90E8\u5206\u5185\u5BB9\u4F1A\u4FA7\u91CD\u4E8E<strong>\u524D\u7AEF\u5F00\u53D1</strong>\u3002\u5E0C\u671B\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u627E\u5230\u5BF9\u4F60\u6709\u7528\u7684\u77E5\u8BC6\u548C\u6559\u7A0B\u3002"
    },
    // 目录
    toc: {
      enable: true
    },
    // 标签
    tags: {
      enable: true
    },
    // 倒计时
    countDown: {
      enable: true,
      // 倒计时日期
      data: {
        name: "\u6625\u8282",
        date: "2025-01-29"
      }
    },
    // 站点数据
    siteData: {
      enable: true
    }
  },
  // 友链
  friends: {
    // 友链朋友圈
    circleOfFriends: "",
    // 动态友链
    dynamicLink: {
      server: "",
      app_token: "",
      table_id: ""
    }
  },
  // 音乐播放器
  // https://github.com/imsyy/Meting-API
  music: {
    enable: false,
    // url
    url: "https://api-meting.example.com",
    // id
    id: 9379831714,
    // netease / tencent / kugou
    server: "netease",
    // playlist / album / song
    type: "playlist"
  },
  // 搜索
  // https://www.algolia.com/
  search: {
    enable: false,
    appId: "",
    apiKey: ""
  },
  // 打赏
  rewardData: {
    enable: true,
    // 微信二维码
    wechat: "https://pic.efefee.cn/uploads/2024/04/07/66121049d1e80.webp",
    // 支付宝二维码
    alipay: "https://pic.efefee.cn/uploads/2024/04/07/661206631d3b5.webp"
  },
  // 图片灯箱
  fancybox: {
    enable: true,
    js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js",
    css: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css"
  },
  // 外链中转
  jumpRedirect: {
    enable: true,
    // 排除类名
    exclude: [
      "cf-friends-link",
      "upyun",
      "icp",
      "author",
      "rss",
      "cc",
      "power",
      "social-link",
      "link-text",
      "travellings",
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
      "link-card"
    ]
  },
  // 站点统计
  tongji: {
    "51la": ""
  }
};

// .vitepress/init.mjs
import { existsSync } from "fs";
import path2 from "path";
var __vite_injected_original_dirname = "D:\\project\\pjczz\\vitepress-theme-curve\\.vitepress";
var getThemeConfig = async () => {
  try {
    const configPath = path2.resolve(__vite_injected_original_dirname, "../themeConfig.mjs");
    if (existsSync(configPath)) {
      const userConfig = await import("../themeConfig.mjs");
      return Object.assign(themeConfig, userConfig?.themeConfig || {});
    } else {
      console.warn("User configuration file not found, using default themeConfig.");
      return themeConfig;
    }
  } catch (error) {
    console.error("An error occurred while loading the configuration:", error);
    return themeConfig;
  }
};

// .vitepress/theme/utils/markdownConfig.mjs
import { tabsMarkdownPlugin } from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.4.0_@algolia+client-search@5.8.0_@types+node@22.7.5_m_mgntr6j2azrjb2mnoamjsn5sfy/node_modules/vitepress-plugin-tabs/dist/index.js";
import markdownItAttrs from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/markdown-it-attrs@4.2.0_markdown-it@14.1.0/node_modules/markdown-it-attrs/index.js";
import container from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/markdown-it-container@4.0.0/node_modules/markdown-it-container/index.mjs";
var markdownConfig = (md, themeConfig3) => {
  md.use(markdownItAttrs);
  md.use(tabsMarkdownPlugin);
  md.use(container, "timeline", {
    validate: (params) => params.trim().match(/^timeline\s+(.*)$/),
    render: (tokens, idx) => {
      const m = tokens[idx].info.trim().match(/^timeline\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return `<div class="timeline">
                    <span class="timeline-title">${md.utils.escapeHtml(m[1])}</span>
                    <div class="timeline-content">`;
      } else {
        return "</div></div>\n";
      }
    }
  });
  md.use(container, "radio", {
    render: (tokens, idx, _options, env) => {
      const token = tokens[idx];
      const check = token.info.trim().slice("radio".length).trim();
      if (token.nesting === 1) {
        const isChecked = md.renderInline(check, {
          references: env.references
        });
        return `<div class="radio">
          <div class="radio-point ${isChecked}" />`;
      } else {
        return "</div>";
      }
    }
  });
  md.use(container, "button", {
    render: (tokens, idx, _options) => {
      const token = tokens[idx];
      const check = token.info.trim().slice("button".length).trim();
      if (token.nesting === 1) {
        return `<button class="button ${check}">`;
      } else {
        return "</button>";
      }
    }
  });
  md.use(container, "card", {
    render: (tokens, idx, _options) => {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return `<div class="card">`;
      } else {
        return "</div>";
      }
    }
  });
  md.renderer.rules.table_open = () => {
    return '<div class="table-container"><table>';
  };
  md.renderer.rules.table_close = () => {
    return "</table></div>";
  };
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrs[token.attrIndex("src")][1];
    const alt = token.content;
    if (!themeConfig3.fancybox.enable) {
      return `<img src="${src}" alt="${alt}" loading="lazy">`;
    }
    return `<a class="img-fancybox" href="${src}" data-fancybox="gallery" data-caption="${alt}">
                <img class="post-img" src="${src}" alt="${alt}" loading="lazy" />
                <span class="post-img-tip">${alt}</span>
              </a>`;
  };
};
var markdownConfig_default = markdownConfig;

// .vitepress/config.mjs
import AutoImport from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.1.0_vue@3.5.11_typescript@4.9.5___rollup@2.79.2_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/project/pjczz/vitepress-theme-curve/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.25.7_rollup@2.79.2_vue@3.5.11_typescript@4.9.5__webpack-sources@3.2.3/node_modules/unplugin-vue-components/dist/vite.js";
import path3 from "path";
var __vite_injected_original_dirname2 = "D:\\project\\pjczz\\vitepress-theme-curve\\.vitepress";
var postData = await getAllPosts();
var themeConfig2 = await getThemeConfig();
var config_default = withPwa(
  defineConfig({
    title: themeConfig2.siteMeta.title,
    description: themeConfig2.siteMeta.description,
    lang: themeConfig2.siteMeta.lang,
    // 简洁的 URL
    cleanUrls: true,
    // 最后更新时间戳
    lastUpdated: true,
    // 主题
    appearance: "dark",
    // Head
    head: themeConfig2.inject.header,
    // sitemap
    sitemap: {
      hostname: themeConfig2.siteMeta.site
    },
    // 主题配置
    themeConfig: {
      ...themeConfig2,
      // 必要数据
      postData,
      tagsData: getAllType(postData),
      categoriesData: getAllCategories(postData),
      archivesData: getAllArchives(postData)
    },
    // markdown
    markdown: {
      math: true,
      lineNumbers: true,
      toc: { level: [1, 2, 3] },
      image: {
        lazyLoading: true
      },
      config: (md) => markdownConfig_default(md, themeConfig2)
    },
    // 构建排除
    srcExclude: ["**/README.md", "**/TODO.md"],
    // transformHead
    transformPageData: async (pageData) => {
      const canonicalUrl = `${themeConfig2.siteMeta.site}/${pageData.relativePath}`.replace(/index\.md$/, "").replace(/\.md$/, "");
      pageData.frontmatter.head ??= [];
      pageData.frontmatter.head.push(["link", { rel: "canonical", href: canonicalUrl }]);
    },
    // transformHtml
    transformHtml: (html) => {
      return jumpRedirect(html, themeConfig2);
    },
    // buildEnd
    buildEnd: async (config) => {
      await createRssFile(config, themeConfig2);
    },
    // vite
    vite: {
      plugins: [
        AutoImport({
          imports: ["vue", "vitepress"],
          dts: ".vitepress/auto-imports.d.ts"
        }),
        Components({
          dirs: [".vitepress/theme/components", ".vitepress/theme/views"],
          extensions: ["vue", "md"],
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: ".vitepress/components.d.ts"
        })
      ],
      resolve: {
        // 配置路径别名
        alias: {
          // eslint-disable-next-line no-undef
          "@": path3.resolve(__vite_injected_original_dirname2, "./theme")
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ["legacy-js-api"]
          }
        }
      },
      // 服务器
      server: {
        port: 9877
      },
      // 构建
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          }
        }
      }
    },
    // PWA
    pwa: {
      registerType: "autoUpdate",
      selfDestroying: true,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // 资源缓存
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(woff2|woff|ttf|css)/,
            handler: "CacheFirst",
            options: {
              cacheName: "file-cache"
            }
          },
          {
            urlPattern: /(.*?)\.(ico|webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache"
            }
          },
          {
            urlPattern: /^https:\/\/cdn2\.codesign\.qq\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "iconfont-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 2
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        // 缓存文件
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,woff2,ttf}"],
        // 排除路径
        navigateFallbackDenylist: [/^\/sitemap.xml$/, /^\/rss.xml$/, /^\/robots.txt$/]
      },
      manifest: {
        name: themeConfig2.siteMeta.title,
        short_name: themeConfig2.siteMeta.title,
        description: themeConfig2.siteMeta.description,
        display: "standalone",
        start_url: "/",
        theme_color: "#fff",
        background_color: "#efefef",
        icons: [
          {
            src: "/images/logo/favicon-32x32.webp",
            sizes: "32x32",
            type: "image/webp"
          },
          {
            src: "/images/logo/favicon-96x96.webp",
            sizes: "96x96",
            type: "image/webp"
          },
          {
            src: "/images/logo/favicon-256x256.webp",
            sizes: "256x256",
            type: "image/webp"
          },
          {
            src: "/images/logo/favicon-512x512.webp",
            sizes: "512x512",
            type: "image/webp"
          }
        ]
      }
    }
  })
);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZ2VuZXJhdGVSU1MubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvY29tbW9uVG9vbHMubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZ2V0UG9zdERhdGEubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvYXNzZXRzL3RoZW1lQ29uZmlnLm1qcyIsICIudml0ZXByZXNzL2luaXQubWpzIiwgIi52aXRlcHJlc3MvdGhlbWUvdXRpbHMvbWFya2Rvd25Db25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxwamN6elxcXFx2aXRlcHJlc3MtdGhlbWUtY3VydmVcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxwamN6elxcXFx2aXRlcHJlc3MtdGhlbWUtY3VydmVcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3BqY3p6L3ZpdGVwcmVzcy10aGVtZS1jdXJ2ZS8udml0ZXByZXNzL2NvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVJzc0ZpbGUgfSBmcm9tIFwiLi90aGVtZS91dGlscy9nZW5lcmF0ZVJTUy5tanNcIjtcclxuaW1wb3J0IHsgd2l0aFB3YSB9IGZyb20gXCJAdml0ZS1wd2Evdml0ZXByZXNzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0QWxsUG9zdHMsXHJcbiAgZ2V0QWxsVHlwZSxcclxuICBnZXRBbGxDYXRlZ29yaWVzLFxyXG4gIGdldEFsbEFyY2hpdmVzLFxyXG59IGZyb20gXCIuL3RoZW1lL3V0aWxzL2dldFBvc3REYXRhLm1qc1wiO1xyXG5pbXBvcnQgeyBqdW1wUmVkaXJlY3QgfSBmcm9tIFwiLi90aGVtZS91dGlscy9jb21tb25Ub29scy5tanNcIjtcclxuaW1wb3J0IHsgZ2V0VGhlbWVDb25maWcgfSBmcm9tIFwiLi9pbml0Lm1qc1wiO1xyXG5pbXBvcnQgbWFya2Rvd25Db25maWcgZnJvbSBcIi4vdGhlbWUvdXRpbHMvbWFya2Rvd25Db25maWcubWpzXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBcdTgzQjdcdTUzRDZcdTUxNjhcdTVDNDBcdTY1NzBcdTYzNkVcclxuY29uc3QgcG9zdERhdGEgPSBhd2FpdCBnZXRBbGxQb3N0cygpO1xyXG5cclxuLy8gXHU4M0I3XHU1M0Q2XHU0RTNCXHU5ODk4XHU5MTREXHU3RjZFXHJcbmNvbnN0IHRoZW1lQ29uZmlnID0gYXdhaXQgZ2V0VGhlbWVDb25maWcoKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcclxuZXhwb3J0IGRlZmF1bHQgd2l0aFB3YShcclxuICBkZWZpbmVDb25maWcoe1xyXG4gICAgdGl0bGU6IHRoZW1lQ29uZmlnLnNpdGVNZXRhLnRpdGxlLFxyXG4gICAgZGVzY3JpcHRpb246IHRoZW1lQ29uZmlnLnNpdGVNZXRhLmRlc2NyaXB0aW9uLFxyXG4gICAgbGFuZzogdGhlbWVDb25maWcuc2l0ZU1ldGEubGFuZyxcclxuICAgIC8vIFx1N0I4MFx1NkQwMVx1NzY4NCBVUkxcclxuICAgIGNsZWFuVXJsczogdHJ1ZSxcclxuICAgIC8vIFx1NjcwMFx1NTQwRVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNFx1NjIzM1xyXG4gICAgbGFzdFVwZGF0ZWQ6IHRydWUsXHJcbiAgICAvLyBcdTRFM0JcdTk4OThcclxuICAgIGFwcGVhcmFuY2U6IFwiZGFya1wiLFxyXG4gICAgLy8gSGVhZFxyXG4gICAgaGVhZDogdGhlbWVDb25maWcuaW5qZWN0LmhlYWRlcixcclxuICAgIC8vIHNpdGVtYXBcclxuICAgIHNpdGVtYXA6IHtcclxuICAgICAgaG9zdG5hbWU6IHRoZW1lQ29uZmlnLnNpdGVNZXRhLnNpdGUsXHJcbiAgICB9LFxyXG4gICAgLy8gXHU0RTNCXHU5ODk4XHU5MTREXHU3RjZFXHJcbiAgICB0aGVtZUNvbmZpZzoge1xyXG4gICAgICAuLi50aGVtZUNvbmZpZyxcclxuICAgICAgLy8gXHU1RkM1XHU4OTgxXHU2NTcwXHU2MzZFXHJcbiAgICAgIHBvc3REYXRhOiBwb3N0RGF0YSxcclxuICAgICAgdGFnc0RhdGE6IGdldEFsbFR5cGUocG9zdERhdGEpLFxyXG4gICAgICBjYXRlZ29yaWVzRGF0YTogZ2V0QWxsQ2F0ZWdvcmllcyhwb3N0RGF0YSksXHJcbiAgICAgIGFyY2hpdmVzRGF0YTogZ2V0QWxsQXJjaGl2ZXMocG9zdERhdGEpLFxyXG4gICAgfSxcclxuICAgIC8vIG1hcmtkb3duXHJcbiAgICBtYXJrZG93bjoge1xyXG4gICAgICBtYXRoOiB0cnVlLFxyXG4gICAgICBsaW5lTnVtYmVyczogdHJ1ZSxcclxuICAgICAgdG9jOiB7IGxldmVsOiBbMSwgMiwgM10gfSxcclxuICAgICAgaW1hZ2U6IHtcclxuICAgICAgICBsYXp5TG9hZGluZzogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgY29uZmlnOiAobWQpID0+IG1hcmtkb3duQ29uZmlnKG1kLCB0aGVtZUNvbmZpZyksXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU2MzkyXHU5NjY0XHJcbiAgICBzcmNFeGNsdWRlOiBbXCIqKi9SRUFETUUubWRcIiwgXCIqKi9UT0RPLm1kXCJdLFxyXG4gICAgLy8gdHJhbnNmb3JtSGVhZFxyXG4gICAgdHJhbnNmb3JtUGFnZURhdGE6IGFzeW5jIChwYWdlRGF0YSkgPT4ge1xyXG4gICAgICAvLyBjYW5vbmljYWwgVVJMXHJcbiAgICAgIGNvbnN0IGNhbm9uaWNhbFVybCA9IGAke3RoZW1lQ29uZmlnLnNpdGVNZXRhLnNpdGV9LyR7cGFnZURhdGEucmVsYXRpdmVQYXRofWBcclxuICAgICAgICAucmVwbGFjZSgvaW5kZXhcXC5tZCQvLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cXC5tZCQvLCBcIlwiKTtcclxuICAgICAgcGFnZURhdGEuZnJvbnRtYXR0ZXIuaGVhZCA/Pz0gW107XHJcbiAgICAgIHBhZ2VEYXRhLmZyb250bWF0dGVyLmhlYWQucHVzaChbXCJsaW5rXCIsIHsgcmVsOiBcImNhbm9uaWNhbFwiLCBocmVmOiBjYW5vbmljYWxVcmwgfV0pO1xyXG4gICAgfSxcclxuICAgIC8vIHRyYW5zZm9ybUh0bWxcclxuICAgIHRyYW5zZm9ybUh0bWw6IChodG1sKSA9PiB7XHJcbiAgICAgIHJldHVybiBqdW1wUmVkaXJlY3QoaHRtbCwgdGhlbWVDb25maWcpO1xyXG4gICAgfSxcclxuICAgIC8vIGJ1aWxkRW5kXHJcbiAgICBidWlsZEVuZDogYXN5bmMgKGNvbmZpZykgPT4ge1xyXG4gICAgICBhd2FpdCBjcmVhdGVSc3NGaWxlKGNvbmZpZywgdGhlbWVDb25maWcpO1xyXG4gICAgfSxcclxuICAgIC8vIHZpdGVcclxuICAgIHZpdGU6IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgaW1wb3J0czogW1widnVlXCIsIFwidml0ZXByZXNzXCJdLFxyXG4gICAgICAgICAgZHRzOiBcIi52aXRlcHJlc3MvYXV0by1pbXBvcnRzLmQudHNcIixcclxuICAgICAgICB9KSxcclxuICAgICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICAgIGRpcnM6IFtcIi52aXRlcHJlc3MvdGhlbWUvY29tcG9uZW50c1wiLCBcIi52aXRlcHJlc3MvdGhlbWUvdmlld3NcIl0sXHJcbiAgICAgICAgICBleHRlbnNpb25zOiBbXCJ2dWVcIiwgXCJtZFwiXSxcclxuICAgICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICAgICAgICBkdHM6IFwiLnZpdGVwcmVzcy9jb21wb25lbnRzLmQudHNcIixcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICAgICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vdGhlbWVcIiksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgY3NzOiB7XHJcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgICBzaWxlbmNlRGVwcmVjYXRpb25zOiBbXCJsZWdhY3ktanMtYXBpXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcdTY3MERcdTUyQTFcdTU2NjhcclxuICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogOTg3NyxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2Nzg0XHU1RUZBXHJcbiAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbWluaWZ5OiBcInRlcnNlclwiLFxyXG4gICAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgICAgIHB1cmVfZnVuY3M6IFtcImNvbnNvbGUubG9nXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFBXQVxyXG4gICAgcHdhOiB7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXHJcbiAgICAgIHNlbGZEZXN0cm95aW5nOiB0cnVlLFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxyXG4gICAgICAgIHNraXBXYWl0aW5nOiB0cnVlLFxyXG4gICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuICAgICAgICAvLyBcdThENDRcdTZFOTBcdTdGMTNcdTVCNThcclxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvKC4qPylcXC4od29mZjJ8d29mZnx0dGZ8Y3NzKS8sXHJcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiBcImZpbGUtY2FjaGVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC8oLio/KVxcLihpY298d2VicHxwbmd8anBlP2d8c3ZnfGdpZnxibXB8cHNkfHRpZmZ8dGdhfGVwcykvLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiBcIkNhY2hlRmlyc3RcIixcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJpbWFnZS1jYWNoZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9jZG4yXFwuY29kZXNpZ25cXC5xcVxcLmNvbVxcLy4qL2ksXHJcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiBcImljb25mb250LWNhY2hlXCIsXHJcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAsXHJcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAyLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbMCwgMjAwXSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIC8vIFx1N0YxM1x1NUI1OFx1NjU4N1x1NEVGNlxyXG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxqcGcsanBlZyxnaWYsc3ZnLHdvZmYyLHR0Zn1cIl0sXHJcbiAgICAgICAgLy8gXHU2MzkyXHU5NjY0XHU4REVGXHU1Rjg0XHJcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFja0RlbnlsaXN0OiBbL15cXC9zaXRlbWFwLnhtbCQvLCAvXlxcL3Jzcy54bWwkLywgL15cXC9yb2JvdHMudHh0JC9dLFxyXG4gICAgICB9LFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6IHRoZW1lQ29uZmlnLnNpdGVNZXRhLnRpdGxlLFxyXG4gICAgICAgIHNob3J0X25hbWU6IHRoZW1lQ29uZmlnLnNpdGVNZXRhLnRpdGxlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiB0aGVtZUNvbmZpZy5zaXRlTWV0YS5kZXNjcmlwdGlvbixcclxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgICBzdGFydF91cmw6IFwiL1wiLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZcIixcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNlZmVmZWZcIixcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL2ltYWdlcy9sb2dvL2Zhdmljb24tMzJ4MzIud2VicFwiLFxyXG4gICAgICAgICAgICBzaXplczogXCIzMngzMlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3dlYnBcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvaW1hZ2VzL2xvZ28vZmF2aWNvbi05Nng5Ni53ZWJwXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjk2eDk2XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2Uvd2VicFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIi9pbWFnZXMvbG9nby9mYXZpY29uLTI1NngyNTYud2VicFwiLFxyXG4gICAgICAgICAgICBzaXplczogXCIyNTZ4MjU2XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2Uvd2VicFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIi9pbWFnZXMvbG9nby9mYXZpY29uLTUxMng1MTIud2VicFwiLFxyXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2Uvd2VicFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KSxcclxuKTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBqY3p6XFxcXHZpdGVwcmVzcy10aGVtZS1jdXJ2ZVxcXFwudml0ZXByZXNzXFxcXHRoZW1lXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBqY3p6XFxcXHZpdGVwcmVzcy10aGVtZS1jdXJ2ZVxcXFwudml0ZXByZXNzXFxcXHRoZW1lXFxcXHV0aWxzXFxcXGdlbmVyYXRlUlNTLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC9wamN6ei92aXRlcHJlc3MtdGhlbWUtY3VydmUvLnZpdGVwcmVzcy90aGVtZS91dGlscy9nZW5lcmF0ZVJTUy5tanNcIjtpbXBvcnQgeyBjcmVhdGVDb250ZW50TG9hZGVyIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xyXG5pbXBvcnQgeyB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7IEZlZWQgfSBmcm9tIFwiZmVlZFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuLyoqXHJcbiAqIFx1NzUxRlx1NjIxMCBSU1NcclxuICogQHBhcmFtIHsqfSBjb25maWcgVml0ZVByZXNzIGJ1aWxkRW5kXHJcbiAqIEBwYXJhbSB7Kn0gdGhlbWVDb25maWcgXHU0RTNCXHU5ODk4XHU5MTREXHU3RjZFXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlUnNzRmlsZSA9IGFzeW5jIChjb25maWcsIHRoZW1lQ29uZmlnKSA9PiB7XHJcbiAgLy8gXHU5MTREXHU3RjZFXHU0RkUxXHU2MDZGXHJcbiAgY29uc3Qgc2l0ZU1ldGEgPSB0aGVtZUNvbmZpZy5zaXRlTWV0YTtcclxuICBjb25zdCBob3N0TGluayA9IHNpdGVNZXRhLnNpdGU7XHJcbiAgLy8gRmVlZCBcdTVCOUVcdTRGOEJcclxuICBjb25zdCBmZWVkID0gbmV3IEZlZWQoe1xyXG4gICAgdGl0bGU6IHNpdGVNZXRhLnRpdGxlLFxyXG4gICAgZGVzY3JpcHRpb246IHNpdGVNZXRhLmRlc2NyaXB0aW9uLFxyXG4gICAgaWQ6IGhvc3RMaW5rLFxyXG4gICAgbGluazogaG9zdExpbmssXHJcbiAgICBsYW5ndWFnZTogXCJ6aFwiLFxyXG4gICAgZ2VuZXJhdG9yOiBzaXRlTWV0YS5hdXRob3IubmFtZSxcclxuICAgIGZhdmljb246IHNpdGVNZXRhLmF1dGhvci5jb3ZlcixcclxuICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkgMjAyMC1wcmVzZW50ICR7c2l0ZU1ldGEuYXV0aG9yLm5hbWV9YCxcclxuICAgIHVwZGF0ZWQ6IG5ldyBEYXRlKCksXHJcbiAgfSk7XHJcbiAgLy8gXHU1MkEwXHU4RjdEXHU2NTg3XHU3QUUwXHJcbiAgbGV0IHBvc3RzID0gYXdhaXQgY3JlYXRlQ29udGVudExvYWRlcihcInBvc3RzLyoqLyoubWRcIiwge1xyXG4gICAgcmVuZGVyOiB0cnVlLFxyXG4gIH0pLmxvYWQoKTtcclxuICAvLyBcdTY1RTVcdTY3MUZcdTk2NERcdTVFOEZcdTYzOTJcdTVFOEZcclxuICBwb3N0cyA9IHBvc3RzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYS5mcm9udG1hdHRlci5kYXRlKTtcclxuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5mcm9udG1hdHRlci5kYXRlKTtcclxuICAgIHJldHVybiBkYXRlQiAtIGRhdGVBO1xyXG4gIH0pO1xyXG4gIGZvciAoY29uc3QgeyB1cmwsIGZyb250bWF0dGVyIH0gb2YgcG9zdHMpIHtcclxuICAgIC8vIFx1NEVDNVx1NEZERFx1NzU1OVx1NjcwMFx1OEZEMSAxMCBcdTdCQzdcdTY1ODdcdTdBRTBcclxuICAgIGlmIChmZWVkLml0ZW1zLmxlbmd0aCA+PSAxMCkgYnJlYWs7XHJcbiAgICAvLyBcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcclxuICAgIGxldCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSB9ID0gZnJvbnRtYXR0ZXI7XHJcbiAgICAvLyBcdTU5MDRcdTc0MDZcdTY1RTVcdTY3MUZcclxuICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJzdHJpbmdcIikgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgLy8gXHU2REZCXHU1MkEwXHU2NTg3XHU3QUUwXHJcbiAgICBmZWVkLmFkZEl0ZW0oe1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgaWQ6IGAke2hvc3RMaW5rfSR7dXJsfWAsXHJcbiAgICAgIGxpbms6IGAke2hvc3RMaW5rfSR7dXJsfWAsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBkYXRlLFxyXG4gICAgICAvLyB1cGRhdGVkLFxyXG4gICAgICBhdXRob3I6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBzaXRlTWV0YS5hdXRob3IubmFtZSxcclxuICAgICAgICAgIGVtYWlsOiBzaXRlTWV0YS5hdXRob3IuZW1haWwsXHJcbiAgICAgICAgICBsaW5rOiBzaXRlTWV0YS5hdXRob3IubGluayxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8vIFx1NTE5OVx1NTE2NVx1NjU4N1x1NEVGNlxyXG4gIHdyaXRlRmlsZVN5bmMocGF0aC5qb2luKGNvbmZpZy5vdXREaXIsIFwicnNzLnhtbFwiKSwgZmVlZC5yc3MyKCksIFwidXRmLThcIik7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxwamN6elxcXFx2aXRlcHJlc3MtdGhlbWUtY3VydmVcXFxcLnZpdGVwcmVzc1xcXFx0aGVtZVxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxwamN6elxcXFx2aXRlcHJlc3MtdGhlbWUtY3VydmVcXFxcLnZpdGVwcmVzc1xcXFx0aGVtZVxcXFx1dGlsc1xcXFxjb21tb25Ub29scy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QvcGpjenovdml0ZXByZXNzLXRoZW1lLWN1cnZlLy52aXRlcHJlc3MvdGhlbWUvdXRpbHMvY29tbW9uVG9vbHMubWpzXCI7aW1wb3J0IHsgbG9hZCB9IGZyb20gXCJjaGVlcmlvXCI7XHJcblxyXG4vKipcclxuICogXHU0RUNFXHU2NTg3XHU0RUY2XHU1NDBEXHU3NTFGXHU2MjEwXHU2NTcwXHU1QjU3IElEXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZSAtIFx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIFx1NzUxRlx1NjIxMFx1NzY4NFx1NjU3MFx1NUI1N0lEXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVJZCA9IChmaWxlTmFtZSkgPT4ge1xyXG4gIC8vIFx1NUMwNlx1NjU4N1x1NEVGNlx1NTQwRFx1OEY2Q1x1NjM2Mlx1NEUzQVx1NTRDOFx1NUUwQ1x1NTAzQ1xyXG4gIGxldCBoYXNoID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVOYW1lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBoYXNoID0gKGhhc2ggPDwgNSkgLSBoYXNoICsgZmlsZU5hbWUuY2hhckNvZGVBdChpKTtcclxuICB9XHJcbiAgLy8gXHU1QzA2XHU1NEM4XHU1RTBDXHU1MDNDXHU4RjZDXHU2MzYyXHU0RTNBXHU2QjYzXHU2NTc0XHU2NTcwXHJcbiAgY29uc3QgbnVtZXJpY0lkID0gTWF0aC5hYnMoaGFzaCAlIDEwMDAwMDAwMDAwKTtcclxuICByZXR1cm4gbnVtZXJpY0lkO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFx1NTJBOFx1NjAwMVx1NTJBMFx1OEY3RFx1ODExQVx1NjcyQ1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0gXHU4MTFBXHU2NzJDIFVSTFxyXG4gKiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb24gLSBcdTkxNERcdTdGNkVcclxuICovXHJcbmV4cG9ydCBjb25zdCBsb2FkU2NyaXB0ID0gKHNyYywgb3B0aW9uID0ge30pID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8ICFzcmMpIHJldHVybiBmYWxzZTtcclxuICAvLyBcdTgzQjdcdTUzRDZcdTkxNERcdTdGNkVcclxuICBjb25zdCB7IGFzeW5jID0gZmFsc2UsIHJlbG9hZCA9IGZhbHNlLCBjYWxsYmFjayB9ID0gb3B0aW9uO1xyXG4gIC8vIFx1NjhDMFx1NjdFNVx1NjYyRlx1NTQyNlx1NURGMlx1N0VDRlx1NTJBMFx1OEY3RFx1OEZDN1x1NkI2NFx1ODExQVx1NjcyQ1xyXG4gIGNvbnN0IGV4aXN0aW5nU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYz1cIiR7c3JjfVwiXWApO1xyXG4gIGlmIChleGlzdGluZ1NjcmlwdCkge1xyXG4gICAgY29uc29sZS5sb2coXCJcdTVERjJcdTY3MDlcdTkxQ0RcdTU5MERcdTgxMUFcdTY3MkNcIik7XHJcbiAgICBpZiAoIXJlbG9hZCkge1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBleGlzdGluZ1NjcmlwdCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGV4aXN0aW5nU2NyaXB0LnJlbW92ZSgpO1xyXG4gIH1cclxuICAvLyBcdTUyMUJcdTVFRkFcdTRFMDBcdTRFMkFcdTY1QjBcdTc2ODRzY3JpcHRcdTY4MDdcdTdCN0VcdTVFNzZcdTUyQTBcdThGN0RcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgIHNjcmlwdC5zcmMgPSBzcmM7XHJcbiAgICBpZiAoYXN5bmMpIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICByZXNvbHZlKHNjcmlwdCk7XHJcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHNjcmlwdCk7XHJcbiAgICB9O1xyXG4gICAgc2NyaXB0Lm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcclxuICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZXJyb3IpO1xyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTUyQThcdTYwMDFcdTUyQTBcdThGN0RcdTY4MzdcdTVGMEZcdTg4NjhcclxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWYgLSBcdTY4MzdcdTVGMEZcdTg4NjggVVJMXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb24gLSBcdTkxNERcdTdGNkVcclxuICovXHJcbmV4cG9ydCBjb25zdCBsb2FkQ1NTID0gKGhyZWYsIG9wdGlvbiA9IHt9KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhaHJlZikgcmV0dXJuIGZhbHNlO1xyXG4gIC8vIFx1ODNCN1x1NTNENlx1OTE0RFx1N0Y2RVxyXG4gIGNvbnN0IHsgcmVsb2FkID0gZmFsc2UsIGNhbGxiYWNrIH0gPSBvcHRpb247XHJcbiAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU1REYyXHU3RUNGXHU1MkEwXHU4RjdEXHU4RkM3XHU2QjY0XHU2ODM3XHU1RjBGXHU4ODY4XHJcbiAgY29uc3QgZXhpc3RpbmdMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tocmVmPVwiJHtocmVmfVwiXWApO1xyXG4gIGlmIChleGlzdGluZ0xpbmspIHtcclxuICAgIGNvbnNvbGUubG9nKFwiXHU1REYyXHU2NzA5XHU5MUNEXHU1OTBEXHU2ODM3XHU1RjBGXCIpO1xyXG4gICAgaWYgKCFyZWxvYWQpIHtcclxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgZXhpc3RpbmdMaW5rKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZXhpc3RpbmdMaW5rLnJlbW92ZSgpO1xyXG4gIH1cclxuICAvLyBcdTUyMUJcdTVFRkFcdTY1QjBcdTc2ODRsaW5rXHU2ODA3XHU3QjdFXHU1RTc2XHU4QkJFXHU3RjZFXHU1QzVFXHU2MDI3XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuICAgIGxpbmsuaHJlZiA9IGhyZWY7XHJcbiAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG4gICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG4gICAgbGluay5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHJlc29sdmUobGluayk7XHJcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIGxpbmspO1xyXG4gICAgfTtcclxuICAgIGxpbmsub25lcnJvciA9IChlcnJvcikgPT4ge1xyXG4gICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlcnJvcik7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdThERjNcdThGNkNcdTRFMkRcdThGNkNcdTk4NzVcclxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWwgLSBcdTk4NzVcdTk3NjJcdTUxODVcdTVCQjlcclxuICogQHBhcmFtIHtib29sZWFufSBpc0RvbSAtIFx1NjYyRlx1NTQyNlx1NEUzQSBET00gXHU1QkY5XHU4QzYxXHJcbiAqL1xyXG5leHBvcnQgY29uc3QganVtcFJlZGlyZWN0ID0gKGh0bWwsIHRoZW1lQ29uZmlnLCBpc0RvbSA9IGZhbHNlKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFx1NjYyRlx1NTQyNlx1NEUzQVx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1xyXG4gICAgY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiO1xyXG4gICAgaWYgKGlzRGV2KSByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcclxuICAgIGlmICghdGhlbWVDb25maWcuanVtcFJlZGlyZWN0LmVuYWJsZSkgcmV0dXJuIGh0bWw7XHJcbiAgICAvLyBcdTRFMkRcdThGNkNcdTk4NzVcdTU3MzBcdTU3NDBcclxuICAgIGNvbnN0IHJlZGlyZWN0UGFnZSA9IFwiL3JlZGlyZWN0XCI7XHJcbiAgICAvLyBcdTYzOTJcdTk2NjRcdTc2ODQgY2xhc3NOYW1lXHJcbiAgICBjb25zdCBleGNsdWRlQ2xhc3MgPSB0aGVtZUNvbmZpZy5qdW1wUmVkaXJlY3QuZXhjbHVkZTtcclxuICAgIGlmIChpc0RvbSkge1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgLy8gXHU2MjQwXHU2NzA5XHU5NEZFXHU2M0E1XHJcbiAgICAgIGNvbnN0IGFsbExpbmtzID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYVwiKV07XHJcbiAgICAgIGlmIChhbGxMaW5rcz8ubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGFsbExpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTk0RkVcdTYzQTVcdTY2MkZcdTU0MjZcdTUzMDVcdTU0MkIgdGFyZ2V0PVwiX2JsYW5rXCIgXHU1QzVFXHU2MDI3XHJcbiAgICAgICAgaWYgKGxpbmsuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpID09PSBcIl9ibGFua1wiKSB7XHJcbiAgICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTk0RkVcdTYzQTVcdTY2MkZcdTU0MjZcdTUzMDVcdTU0MkJcdTYzOTJcdTk2NjRcdTc2ODRcdTdDN0JcclxuICAgICAgICAgIGlmIChleGNsdWRlQ2xhc3Muc29tZSgoY2xhc3NOYW1lKSA9PiBsaW5rLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBsaW5rSHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcclxuICAgICAgICAgIC8vIFx1NUI1OFx1NTcyOFx1OTRGRVx1NjNBNVx1NEUxNFx1OTc1RVx1NEUyRFx1OEY2Q1x1OTg3NVxyXG4gICAgICAgICAgaWYgKGxpbmtIcmVmICYmICFsaW5rSHJlZi5pbmNsdWRlcyhyZWRpcmVjdFBhZ2UpKSB7XHJcbiAgICAgICAgICAgIC8vIEJhc2U2NFxyXG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkSHJlZiA9IGJ0b2EobGlua0hyZWYpO1xyXG4gICAgICAgICAgICBjb25zdCByZWRpcmVjdExpbmsgPSBgJHtyZWRpcmVjdFBhZ2V9P3VybD0ke2VuY29kZWRIcmVmfWA7XHJcbiAgICAgICAgICAgIC8vIFx1NEZERFx1NUI1OFx1NTM5Rlx1NTlDQlx1OTRGRVx1NjNBNVxyXG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcIm9yaWdpbmFsLWhyZWZcIiwgbGlua0hyZWYpO1xyXG4gICAgICAgICAgICAvLyBcdTg5ODZcdTc2RDYgaHJlZlxyXG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcmVkaXJlY3RMaW5rKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgJCA9IGxvYWQoaHRtbCk7XHJcbiAgICAgIC8vIFx1NjZGRlx1NjM2Mlx1N0IyNlx1NTQwOFx1Njc2MVx1NEVGNlx1NzY4NFx1NjgwN1x1N0I3RVxyXG4gICAgICAkKFwiYVt0YXJnZXQ9J19ibGFuayddXCIpLmVhY2goKF8sIGVsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGEgPSAkKGVsKTtcclxuICAgICAgICBjb25zdCBocmVmID0gJGEuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgY29uc3QgY2xhc3Nlc1N0ciA9ICRhLmF0dHIoXCJjbGFzc1wiKTtcclxuICAgICAgICBjb25zdCBpbm5lclRleHQgPSAkYS50ZXh0KCk7XHJcbiAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU1MzA1XHU1NDJCXHU2MzkyXHU5NjY0XHU3Njg0XHU3QzdCXHJcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzZXNTdHIgPyBjbGFzc2VzU3RyLnRyaW0oKS5zcGxpdChcIiBcIikgOiBbXTtcclxuICAgICAgICBpZiAoZXhjbHVkZUNsYXNzLnNvbWUoKGNsYXNzTmFtZSkgPT4gY2xhc3Nlcy5pbmNsdWRlcyhjbGFzc05hbWUpKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcdTVCNThcdTU3MjhcdTk0RkVcdTYzQTVcdTRFMTRcdTk3NUVcdTRFMkRcdThGNkNcdTk4NzVcclxuICAgICAgICBpZiAoaHJlZiAmJiAhaHJlZi5pbmNsdWRlcyhyZWRpcmVjdFBhZ2UpKSB7XHJcbiAgICAgICAgICAvLyBCYXNlNjQgXHU3RjE2XHU3ODAxIGhyZWZcclxuICAgICAgICAgIGNvbnN0IGVuY29kZWRIcmVmID0gQnVmZmVyLmZyb20oaHJlZiwgXCJ1dGYtOFwiKS50b1N0cmluZyhcImJhc2U2NFwiKTtcclxuICAgICAgICAgIC8vIFx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NUM1RVx1NjAyN1xyXG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGVsLmF0dHJpYnM7XHJcbiAgICAgICAgICAvLyBcdTkxQ0RcdTY3ODRcdTVDNUVcdTYwMjdcdTVCNTdcdTdCMjZcdTRFMzJcdUZGMENcdTRGRERcdTc1NTlcdTUzOUZcdTY3MDlcdTVDNUVcdTYwMjdcclxuICAgICAgICAgIGxldCBhdHRyaWJ1dGVzU3RyID0gXCJcIjtcclxuICAgICAgICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGF0dHJpYnV0ZXMsIGF0dHIpKSB7XHJcbiAgICAgICAgICAgICAgYXR0cmlidXRlc1N0ciArPSBgICR7YXR0cn09XCIke2F0dHJpYnV0ZXNbYXR0cl19XCJgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBcdTY3ODRcdTkwMjBcdTY1QjBcdTY4MDdcdTdCN0VcclxuICAgICAgICAgIGNvbnN0IG5ld0xpbmsgPSBgPGEgaHJlZj1cIiR7cmVkaXJlY3RQYWdlfT91cmw9JHtlbmNvZGVkSHJlZn1cIiBvcmlnaW5hbC1ocmVmPVwiJHtocmVmfVwiICR7YXR0cmlidXRlc1N0cn0+JHtpbm5lclRleHR9PC9hPmA7XHJcbiAgICAgICAgICAvLyBcdTY2RkZcdTYzNjJcdTUzOUZcdTY3MDlcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICRhLnJlcGxhY2VXaXRoKG5ld0xpbmspO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiAkLmh0bWwoKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIlx1NTkwNFx1NzQwNlx1OTRGRVx1NjNBNVx1NjVGNlx1NTFGQVx1OTUxOVx1RkYxQVwiLCBlcnJvcik7XHJcbiAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccGpjenpcXFxcdml0ZXByZXNzLXRoZW1lLWN1cnZlXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccGpjenpcXFxcdml0ZXByZXNzLXRoZW1lLWN1cnZlXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcXFxcZ2V0UG9zdERhdGEubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3BqY3p6L3ZpdGVwcmVzcy10aGVtZS1jdXJ2ZS8udml0ZXByZXNzL3RoZW1lL3V0aWxzL2dldFBvc3REYXRhLm1qc1wiO2ltcG9ydCB7IGdlbmVyYXRlSWQgfSBmcm9tIFwiLi9jb21tb25Ub29scy5tanNcIjtcclxuaW1wb3J0IHsgZ2xvYmJ5IH0gZnJvbSBcImdsb2JieVwiO1xyXG5pbXBvcnQgbWF0dGVyIGZyb20gXCJncmF5LW1hdHRlclwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzLWV4dHJhXCI7XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2IHBvc3RzIFx1NzZFRVx1NUY1NVx1NEUwQlx1NjI0MFx1NjcwOSBNYXJrZG93biBcdTY1ODdcdTRFRjZcdTc2ODRcdThERUZcdTVGODRcclxuICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nW10+fSAtIFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1NjU3MFx1N0VDNFxyXG4gKi9cclxuY29uc3QgZ2V0UG9zdE1ERmlsZVBhdGhzID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDkgbWQgXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHJcbiAgICBsZXQgcGF0aHMgPSBhd2FpdCBnbG9iYnkoW1wiKioubWRcIl0sIHtcclxuICAgICAgaWdub3JlOiBbXCJub2RlX21vZHVsZXNcIiwgXCJwYWdlc1wiLCBcIi52aXRlcHJlc3NcIiwgXCJSRUFETUUubWRcIl0sXHJcbiAgICB9KTtcclxuICAgIC8vIFx1OEZDN1x1NkVFNFx1OERFRlx1NUY4NFx1RkYwQ1x1NTNFQVx1NTMwNVx1NjJFQyAncG9zdHMnIFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NFx1NjU4N1x1NEVGNlxyXG4gICAgcmV0dXJuIHBhdGhzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pbmNsdWRlcyhcInBvc3RzL1wiKSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJcdTgzQjdcdTUzRDZcdTY1ODdcdTdBRTBcdThERUZcdTVGODRcdTY1RjZcdTUxRkFcdTk1MTk6XCIsIGVycm9yKTtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTU3RkFcdTRFOEUgZnJvbnRNYXR0ZXIgXHU2NUU1XHU2NzFGXHU5NjREXHU1RThGXHU2MzkyXHU1RThGXHU2NTg3XHU3QUUwXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIC0gXHU3QjJDXHU0RTAwXHU3QkM3XHU2NTg3XHU3QUUwXHU1QkY5XHU4QzYxXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIC0gXHU3QjJDXHU0RThDXHU3QkM3XHU2NTg3XHU3QUUwXHU1QkY5XHU4QzYxXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gXHU2QkQ0XHU4RjgzXHU3RUQzXHU2NzlDXHJcbiAqL1xyXG5jb25zdCBjb21wYXJlRGF0ZSA9IChvYmoxLCBvYmoyKSA9PiB7XHJcbiAgcmV0dXJuIG9iajEuZGF0ZSA8IG9iajIuZGF0ZSA/IDEgOiAtMTtcclxufTtcclxuY29uc3QgY29tcGFyZVBvc3RQcmlvcml0eSA9IChhLCBiKSA9PiB7XHJcbiAgaWYgKGEudG9wICYmICFiLnRvcCkge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuICBpZiAoIWEudG9wICYmIGIudG9wKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbXBhcmVEYXRlKGEsIGIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NjU4N1x1N0FFMFx1RkYwQ1x1OEJGQlx1NTNENlx1NTE3Nlx1NTE4NVx1NUJCOVx1NUU3Nlx1ODlFM1x1Njc5MCBmcm9udCBtYXR0ZXJcclxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0W10+fSAtIFx1NjU4N1x1N0FFMFx1NUJGOVx1OEM2MVx1NjU3MFx1N0VDNFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEFsbFBvc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDkgTWFya2Rvd24gXHU2NTg3XHU0RUY2XHU3Njg0XHU4REVGXHU1Rjg0XHJcbiAgICBsZXQgcGF0aHMgPSBhd2FpdCBnZXRQb3N0TURGaWxlUGF0aHMoKTtcclxuICAgIC8vIFx1OEJGQlx1NTNENlx1NTQ4Q1x1NTkwNFx1NzQwNlx1NkJDRlx1NEUyQSBNYXJrZG93biBcdTY1ODdcdTRFRjZcdTc2ODRcdTUxODVcdTVCQjlcclxuICAgIGxldCBwb3N0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICBwYXRocy5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gXHU4QkZCXHU1M0Q2XHU2NTg3XHU0RUY2XHU1MTg1XHU1QkI5XHJcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucmVhZEZpbGUoaXRlbSwgXCJ1dGYtOFwiKTtcclxuICAgICAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NzY4NFx1NTE0M1x1NjU3MFx1NjM2RVxyXG4gICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IGZzLnN0YXQoaXRlbSk7XHJcbiAgICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTY1ODdcdTRFRjZcdTUyMUJcdTVFRkFcdTY1RjZcdTk1RjRcdTU0OENcdTY3MDBcdTU0MEVcdTRGRUVcdTY1MzlcdTY1RjZcdTk1RjRcclxuICAgICAgICAgIGNvbnN0IHsgYmlydGh0aW1lTXMsIG10aW1lTXMgfSA9IHN0YXQ7XHJcbiAgICAgICAgICAvLyBcdTg5RTNcdTY3OTAgZnJvbnQgbWF0dGVyXHJcbiAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IG1hdHRlcihjb250ZW50KTtcclxuICAgICAgICAgIGNvbnN0IHsgdGl0bGUsIGRhdGUsIGNhdGVnb3JpZXMsIGRlc2NyaXB0aW9uLCB0YWdzLCB0b3AsIGNvdmVyIH0gPSBkYXRhO1xyXG4gICAgICAgICAgLy8gXHU4QkExXHU3Qjk3XHU2NTg3XHU3QUUwXHU3Njg0XHU4RkM3XHU2NzFGXHU1OTI5XHU2NTcwXHJcbiAgICAgICAgICBjb25zdCBleHBpcmVkID0gTWF0aC5mbG9vcihcclxuICAgICAgICAgICAgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBcdThGRDRcdTU2REVcdTY1ODdcdTdBRTBcdTVCRjlcdThDNjFcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiBnZW5lcmF0ZUlkKGl0ZW0pLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgXCJcdTY3MkFcdTU0N0RcdTU0MERcdTY1ODdcdTdBRTBcIixcclxuICAgICAgICAgICAgZGF0ZTogZGF0ZSA/IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKSA6IGJpcnRodGltZU1zLFxyXG4gICAgICAgICAgICBsYXN0TW9kaWZpZWQ6IG10aW1lTXMsXHJcbiAgICAgICAgICAgIGV4cGlyZWQsXHJcbiAgICAgICAgICAgIHRhZ3MsXHJcbiAgICAgICAgICAgIGNhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICByZWd1bGFyUGF0aDogYC8ke2l0ZW0ucmVwbGFjZShcIi5tZFwiLCBcIi5odG1sXCIpfWAsXHJcbiAgICAgICAgICAgIHRvcCxcclxuICAgICAgICAgICAgY292ZXIsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBcdTU5MDRcdTc0MDZcdTY1ODdcdTdBRTBcdTY1ODdcdTRFRjYgJyR7aXRlbX0nIFx1NjVGNlx1NTFGQVx1OTUxOTpgLCBlcnJvcik7XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgKTtcclxuICAgIC8vIFx1NjgzOVx1NjM2RVx1NjVFNVx1NjcxRlx1NjM5Mlx1NUU4Rlx1NjU4N1x1N0FFMFxyXG4gICAgcG9zdHMuc29ydChjb21wYXJlUG9zdFByaW9yaXR5KTtcclxuICAgIHJldHVybiBwb3N0cztcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIlx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NjU4N1x1N0FFMFx1NjVGNlx1NTFGQVx1OTUxOTpcIiwgZXJyb3IpO1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NjgwN1x1N0I3RVx1NTNDQVx1NTE3Nlx1NzZGOFx1NTE3M1x1NjU4N1x1N0FFMFx1NzY4NFx1N0VERlx1OEJBMVx1NEZFMVx1NjA2RlxyXG4gKiBAcGFyYW0ge09iamVjdFtdfSBwb3N0RGF0YSAtIFx1NTMwNVx1NTQyQlx1NjU4N1x1N0FFMFx1NEZFMVx1NjA2Rlx1NzY4NFx1NjU3MFx1N0VDNFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIFx1NTMwNVx1NTQyQlx1NjgwN1x1N0I3RVx1N0VERlx1OEJBMVx1NEZFMVx1NjA2Rlx1NzY4NFx1NUJGOVx1OEM2MVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEFsbFR5cGUgPSAocG9zdERhdGEpID0+IHtcclxuICBjb25zdCB0YWdEYXRhID0ge307XHJcbiAgLy8gXHU5MDREXHU1Mzg2XHU2NTcwXHU2MzZFXHJcbiAgcG9zdERhdGEubWFwKChpdGVtKSA9PiB7XHJcbiAgICAvLyBcdTY4QzBcdTY3RTVcdTY2MkZcdTU0MjZcdTY3MDkgdGFncyBcdTVDNUVcdTYwMjdcclxuICAgIGlmICghaXRlbS50YWdzIHx8IGl0ZW0udGFncy5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgIC8vIFx1NTkwNFx1NzQwNlx1NjgwN1x1N0I3RVxyXG4gICAgaWYgKHR5cGVvZiBpdGVtLnRhZ3MgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgLy8gXHU0RUU1XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHJcbiAgICAgIGl0ZW0udGFncyA9IGl0ZW0udGFncy5zcGxpdChcIixcIik7XHJcbiAgICB9XHJcbiAgICAvLyBcdTkwNERcdTUzODZcdTY1ODdcdTdBRTBcdTc2ODRcdTZCQ0ZcdTRFMkFcdTY4MDdcdTdCN0VcclxuICAgIGl0ZW0udGFncy5mb3JFYWNoKCh0YWcpID0+IHtcclxuICAgICAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU2ODA3XHU3QjdFXHU3Njg0XHU3RURGXHU4QkExXHU0RkUxXHU2MDZGXHVGRjBDXHU1OTgyXHU2NzlDXHU0RTBEXHU1QjU4XHU1NzI4XHJcbiAgICAgIGlmICghdGFnRGF0YVt0YWddKSB7XHJcbiAgICAgICAgdGFnRGF0YVt0YWddID0ge1xyXG4gICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICBhcnRpY2xlczogW2l0ZW1dLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2ODA3XHU3QjdFXHU1REYyXHU1QjU4XHU1NzI4XHVGRjBDXHU1MjE5XHU1ODlFXHU1MkEwXHU4QkExXHU2NTcwXHU1NDhDXHU4QkIwXHU1RjU1XHU2MjQwXHU1QzVFXHU2NTg3XHU3QUUwXHJcbiAgICAgICAgdGFnRGF0YVt0YWddLmNvdW50Kys7XHJcbiAgICAgICAgdGFnRGF0YVt0YWddLmFydGljbGVzLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0YWdEYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NTIwNlx1N0M3Qlx1NTNDQVx1NTE3Nlx1NzZGOFx1NTE3M1x1NjU4N1x1N0FFMFx1NzY4NFx1N0VERlx1OEJBMVx1NEZFMVx1NjA2RlxyXG4gKiBAcGFyYW0ge09iamVjdFtdfSBwb3N0RGF0YSAtIFx1NTMwNVx1NTQyQlx1NjU4N1x1N0FFMFx1NEZFMVx1NjA2Rlx1NzY4NFx1NjU3MFx1N0VDNFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIFx1NTMwNVx1NTQyQlx1NjgwN1x1N0I3RVx1N0VERlx1OEJBMVx1NEZFMVx1NjA2Rlx1NzY4NFx1NUJGOVx1OEM2MVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEFsbENhdGVnb3JpZXMgPSAocG9zdERhdGEpID0+IHtcclxuICBjb25zdCBjYXREYXRhID0ge307XHJcbiAgLy8gXHU5MDREXHU1Mzg2XHU2NTcwXHU2MzZFXHJcbiAgcG9zdERhdGEubWFwKChpdGVtKSA9PiB7XHJcbiAgICBpZiAoIWl0ZW0uY2F0ZWdvcmllcyB8fCBpdGVtLmNhdGVnb3JpZXMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAvLyBcdTU5MDRcdTc0MDZcdTY4MDdcdTdCN0VcclxuICAgIGlmICh0eXBlb2YgaXRlbS5jYXRlZ29yaWVzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIC8vIFx1NEVFNVx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFxyXG4gICAgICBpdGVtLmNhdGVnb3JpZXMgPSBpdGVtLmNhdGVnb3JpZXMuc3BsaXQoXCIsXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gXHU5MDREXHU1Mzg2XHU2NTg3XHU3QUUwXHU3Njg0XHU2QkNGXHU0RTJBXHU2ODA3XHU3QjdFXHJcbiAgICBpdGVtLmNhdGVnb3JpZXMuZm9yRWFjaCgodGFnKSA9PiB7XHJcbiAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1NjgwN1x1N0I3RVx1NzY4NFx1N0VERlx1OEJBMVx1NEZFMVx1NjA2Rlx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NEUwRFx1NUI1OFx1NTcyOFxyXG4gICAgICBpZiAoIWNhdERhdGFbdGFnXSkge1xyXG4gICAgICAgIGNhdERhdGFbdGFnXSA9IHtcclxuICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgYXJ0aWNsZXM6IFtpdGVtXSxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjgwN1x1N0I3RVx1NURGMlx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NTg5RVx1NTJBMFx1OEJBMVx1NjU3MFx1NTQ4Q1x1OEJCMFx1NUY1NVx1NjI0MFx1NUM1RVx1NjU4N1x1N0FFMFxyXG4gICAgICAgIGNhdERhdGFbdGFnXS5jb3VudCsrO1xyXG4gICAgICAgIGNhdERhdGFbdGFnXS5hcnRpY2xlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuICByZXR1cm4gY2F0RGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTVFNzRcdTRFRkRcdTUzQ0FcdTUxNzZcdTc2RjhcdTUxNzNcdTY1ODdcdTdBRTBcdTc2ODRcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcclxuICogQHBhcmFtIHtPYmplY3RbXX0gcG9zdERhdGEgLSBcdTUzMDVcdTU0MkJcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcdTc2ODRcdTY1NzBcdTdFQzRcclxuICogQHJldHVybnMge09iamVjdH0gLSBcdTUzMDVcdTU0MkJcdTVGNTJcdTY4NjNcdTdFREZcdThCQTFcdTRGRTFcdTYwNkZcdTc2ODRcdTVCRjlcdThDNjFcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxBcmNoaXZlcyA9IChwb3N0RGF0YSkgPT4ge1xyXG4gIGNvbnN0IGFyY2hpdmVEYXRhID0ge307XHJcbiAgLy8gXHU5MDREXHU1Mzg2XHU2NTcwXHU2MzZFXHJcbiAgcG9zdERhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU2NzA5IGRhdGUgXHU1QzVFXHU2MDI3XHJcbiAgICBpZiAoaXRlbS5kYXRlKSB7XHJcbiAgICAgIC8vIFx1NUMwNlx1NjVGNlx1OTVGNFx1NjIzM1x1OEY2Q1x1NjM2Mlx1NEUzQVx1NjVFNVx1NjcxRlx1NUJGOVx1OEM2MVxyXG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaXRlbS5kYXRlKTtcclxuICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU1RTc0XHU0RUZEXHJcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcclxuICAgICAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU4QkU1XHU1RTc0XHU0RUZEXHU3Njg0XHU3RURGXHU4QkExXHU0RkUxXHU2MDZGXHVGRjBDXHU1OTgyXHU2NzlDXHU0RTBEXHU1QjU4XHU1NzI4XHJcbiAgICAgIGlmICghYXJjaGl2ZURhdGFbeWVhcl0pIHtcclxuICAgICAgICBhcmNoaXZlRGF0YVt5ZWFyXSA9IHtcclxuICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgYXJ0aWNsZXM6IFtpdGVtXSxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NUU3NFx1NEVGRFx1NURGMlx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NTg5RVx1NTJBMFx1OEJBMVx1NjU3MFx1NTQ4Q1x1OEJCMFx1NUY1NVx1NjI0MFx1NUM1RVx1NjU4N1x1N0FFMFxyXG4gICAgICAgIGFyY2hpdmVEYXRhW3llYXJdLmNvdW50Kys7XHJcbiAgICAgICAgYXJjaGl2ZURhdGFbeWVhcl0uYXJ0aWNsZXMucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIC8vIFx1NjNEMFx1NTNENlx1NUU3NFx1NEVGRFx1NUU3Nlx1NjMwOVx1OTY0RFx1NUU4Rlx1NjM5Mlx1NUU4RlxyXG4gIGNvbnN0IHNvcnRlZFllYXJzID0gT2JqZWN0LmtleXMoYXJjaGl2ZURhdGEpLnNvcnQoKGEsIGIpID0+IHBhcnNlSW50KGIpIC0gcGFyc2VJbnQoYSkpO1xyXG4gIHJldHVybiB7IGRhdGE6IGFyY2hpdmVEYXRhLCB5ZWFyOiBzb3J0ZWRZZWFycyB9O1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccGpjenpcXFxcdml0ZXByZXNzLXRoZW1lLWN1cnZlXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcYXNzZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBqY3p6XFxcXHZpdGVwcmVzcy10aGVtZS1jdXJ2ZVxcXFwudml0ZXByZXNzXFxcXHRoZW1lXFxcXGFzc2V0c1xcXFx0aGVtZUNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QvcGpjenovdml0ZXByZXNzLXRoZW1lLWN1cnZlLy52aXRlcHJlc3MvdGhlbWUvYXNzZXRzL3RoZW1lQ29uZmlnLm1qc1wiOy8vIFx1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxyXG5leHBvcnQgY29uc3QgdGhlbWVDb25maWcgPSB7XHJcbiAgLy8gXHU3QUQ5XHU3MEI5XHU0RkUxXHU2MDZGXHJcbiAgc2l0ZU1ldGE6IHtcclxuICAgIC8vIFx1N0FEOVx1NzBCOVx1NjgwN1x1OTg5OFxyXG4gICAgdGl0bGU6IFwiUGpjenpcIixcclxuICAgIC8vIFx1N0FEOVx1NzBCOVx1NjNDRlx1OEZGMFxyXG4gICAgZGVzY3JpcHRpb246IFwiXHU2MTNGXHU5NjhGXHU1RkMzXHU2MjQwXHU2QjMyXCIsXHJcbiAgICAvLyBcdTdBRDlcdTcwQjlsb2dvXHJcbiAgICBsb2dvOiBcIi9pbWFnZXMvbG9nby9sb2dvLndlYnBcIixcclxuICAgIC8vIFx1N0FEOVx1NzBCOVx1NTczMFx1NTc0MFxyXG4gICAgc2l0ZTogXCJodHRwczovL2Jsb2cuaW1zeXkudG9wXCIsXHJcbiAgICAvLyBcdThCRURcdThBMDBcclxuICAgIGxhbmc6IFwiemgtQ05cIixcclxuICAgIC8vIFx1NEY1Q1x1ODAwNVxyXG4gICAgYXV0aG9yOiB7XHJcbiAgICAgIG5hbWU6IFwiQWRtaW5cIixcclxuICAgICAgY292ZXI6IFwiL2ltYWdlcy9sb2dvL2xvZ28ud2VicFwiLFxyXG4gICAgICBlbWFpbDogXCIxMTQ1MTRAZ21haWwuY29tXCIsXHJcbiAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cuaW1zeXkudG9wXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gXHU1OTA3XHU2ODQ4XHU0RkUxXHU2MDZGXHJcbiAgaWNwOiBcIlx1ODQwQ0lDUFx1NTkwNzExNDUxNFx1NTNGN1wiLFxyXG4gIC8vIFx1NUVGQVx1N0FEOVx1NjVFNVx1NjcxRlxyXG4gIHNpbmNlOiBcIjIwMjAtMDctMjhcIixcclxuICAvLyBcdTZCQ0ZcdTk4NzVcdTY1ODdcdTdBRTBcdTY1NzBcdTYzNkVcclxuICBwb3N0U2l6ZTogOCxcclxuICAvLyBpbmplY3RcclxuICBpbmplY3Q6IHtcclxuICAgIC8vIFx1NTkzNFx1OTBFOFxyXG4gICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3poL3JlZmVyZW5jZS9zaXRlLWNvbmZpZyNoZWFkXHJcbiAgICBoZWFkZXI6IFtcclxuICAgICAgLy8gZmF2aWNvblxyXG4gICAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgaHJlZjogXCIvZmF2aWNvbi5pY29cIiB9XSxcclxuICAgICAgLy8gUlNTXHJcbiAgICAgIFtcclxuICAgICAgICBcImxpbmtcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZWw6IFwiYWx0ZXJuYXRlXCIsXHJcbiAgICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL3Jzcyt4bWxcIixcclxuICAgICAgICAgIHRpdGxlOiBcIlJTU1wiLFxyXG4gICAgICAgICAgaHJlZjogXCJodHRwczovL2Jsb2cuaW1zeXkudG9wL3Jzcy54bWxcIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICAvLyBcdTk4ODRcdThGN0QgQ0ROXHJcbiAgICAgIFtcclxuICAgICAgICBcImxpbmtcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjcm9zc29yaWdpbjogXCJcIixcclxuICAgICAgICAgIHJlbDogXCJwcmVjb25uZWN0XCIsXHJcbiAgICAgICAgICBocmVmOiBcImh0dHBzOi8vczEuaGRzbGIuY29tXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcIlwiLFxyXG4gICAgICAgICAgcmVsOiBcInByZWNvbm5lY3RcIixcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9taXJyb3JzLnN1c3RlY2guZWR1LmNuXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgLy8gSGFybW9ueU9TIGZvbnRcclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcImFub255bW91c1wiLFxyXG4gICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9zMS5oZHNsYi5jb20vYmZzL3N0YXRpYy9qaW5rZWxhL2xvbmcvZm9udC9yZWd1bGFyLmNzc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIFtcclxuICAgICAgICBcImxpbmtcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjcm9zc29yaWdpbjogXCJhbm9ueW1vdXNcIixcclxuICAgICAgICAgIHJlbDogXCJzdHlsZXNoZWV0XCIsXHJcbiAgICAgICAgICBocmVmOiBcImh0dHBzOi8vbWlycm9ycy5zdXN0ZWNoLmVkdS5jbi9jZG5qcy9hamF4L2xpYnMvbHhndy13ZW5rYWktc2NyZWVuLXdlYmZvbnQvMS43LjAvc3R5bGUuY3NzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgLy8gaWNvbmZvbnRcclxuICAgICAgW1xyXG4gICAgICAgIFwibGlua1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNyb3Nzb3JpZ2luOiBcImFub255bW91c1wiLFxyXG4gICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9jZG4yLmNvZGVzaWduLnFxLmNvbS9pY29ucy9nNVpwRWd4M3o0Vk82ajIvbGF0ZXN0L2ljb25mb250LmNzc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIC8vIEVtYmVkIGNvZGVcclxuICAgICAgW1wibGlua1wiLCB7IHJlbDogXCJwcmVjb25uZWN0XCIsIGhyZWY6IFwiaHR0cHM6Ly91c2Uuc2V2ZW5jZG4uY29tXCIgfV0sXHJcbiAgICAgIFtcImxpbmtcIiwgeyByZWw6IFwicHJlY29ubmVjdFwiLCBocmVmOiBcImh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb21cIiwgY3Jvc3NvcmlnaW46IFwiXCIgfV0sXHJcbiAgICAgIFtcclxuICAgICAgICBcImxpbmtcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjcm9zc29yaWdpbjogXCJhbm9ueW1vdXNcIixcclxuICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly91c2Uuc2V2ZW5jZG4uY29tL2NzczI/ZmFtaWx5PUZpcmErQ29kZTp3Z2h0QDMwMC4uNzAwJmRpc3BsYXk9c3dhcFwiLFxyXG4gICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICAvLyBcdTk4ODRcdThGN0QgRG9jU2VhcmNoXHJcbiAgICAgIFtcclxuICAgICAgICBcImxpbmtcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICBocmVmOiBcImh0dHBzOi8vWDVFQkVaQjUzSS1kc24uYWxnb2xpYS5uZXRcIixcclxuICAgICAgICAgIHJlbDogXCJwcmVjb25uZWN0XCIsXHJcbiAgICAgICAgICBjcm9zc29yaWdpbjogXCJcIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgXSxcclxuICB9LFxyXG4gIC8vIFx1NUJGQ1x1ODIyQVx1NjgwRlx1ODNEQ1x1NTM1NVxyXG4gIG5hdjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NjU4N1x1NUU5M1wiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcIiwgbGluazogXCIvcGFnZXMvYXJjaGl2ZXNcIiwgaWNvbjogXCJhcnRpY2xlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1MTY4XHU5MEU4XHU1MjA2XHU3QzdCXCIsIGxpbms6IFwiL3BhZ2VzL2NhdGVnb3JpZXNcIiwgaWNvbjogXCJmb2xkZXJcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUxNjhcdTkwRThcdTY4MDdcdTdCN0VcIiwgbGluazogXCIvcGFnZXMvdGFnc1wiLCBpY29uOiBcImhhc2h0YWdcIiB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTRFMTNcdTY4MEZcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU2MjgwXHU2NzJGXHU1MjA2XHU0RUFCXCIsIGxpbms6IFwiL3BhZ2VzL2NhdGVnb3JpZXMvXHU2MjgwXHU2NzJGXHU1MjA2XHU0RUFCXCIsIGljb246IFwidGVjaG5pY2FsXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFXCIsIGxpbms6IFwiL3BhZ2VzL3Byb2plY3RcIiwgaWNvbjogXCJjb2RlXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU2NTQ4XHU3Mzg3XHU1REU1XHU1MTc3XCIsIGxpbms6IFwiL3BhZ2VzL3Rvb2xzXCIsIGljb246IFwidG9vbHNcIiB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTUzQ0JcdTk0RkVcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU1M0NCXHU5NEZFXHU5QzdDXHU1ODU4XCIsIGxpbms6IFwiL3BhZ2VzL2ZyaWVuZHNcIiwgaWNvbjogXCJmaXNoXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1M0NCXHU2MEM1XHU5NEZFXHU2M0E1XCIsIGxpbms6IFwiL3BhZ2VzL2xpbmtcIiwgaWNvbjogXCJwZW9wbGVcIiB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTYyMTFcdTc2ODRcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU3NTQ1XHU2MjQwXHU2QjMyXHU4QTAwXCIsIGxpbms6IFwiL3BhZ2VzL21lc3NhZ2VcIiwgaWNvbjogXCJjaGF0XCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU4MUY0XHU4QzIyXHU1NDBEXHU1MzU1XCIsIGxpbms6IFwiL3BhZ2VzL3RoYW5rc1wiLCBpY29uOiBcInJld2FyZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NTE3M1x1NEU4RVx1NjcyQ1x1N0FEOVwiLCBsaW5rOiBcIi9wYWdlcy9hYm91dFwiLCBpY29uOiBcImNvbnRhY3RzXCIgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXSxcclxuICAvLyBcdTVCRkNcdTgyMkFcdTY4MEZcdTgzRENcdTUzNTUgLSBcdTVERTZcdTRGQTdcclxuICBuYXZNb3JlOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwiXHU1MzVBXHU1QkEyXCIsXHJcbiAgICAgIGxpc3Q6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uOiBcIi9pbWFnZXMvbG9nby9sb2dvLndlYnBcIixcclxuICAgICAgICAgIG5hbWU6IFwiXHU0RTNCXHU3QUQ5XCIsXHJcbiAgICAgICAgICB1cmw6IFwiL1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbjogXCIvaW1hZ2VzL2xvZ28vbG9nby53ZWJwXCIsXHJcbiAgICAgICAgICBuYW1lOiBcIlx1NTM1QVx1NUJBMlx1OTU1Q1x1NTBDRlx1N0FEOVwiLFxyXG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vYmxvZy1iYWNrdXAuaW1zeXkudG9wL1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBcIlx1NjcwRFx1NTJBMVwiLFxyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbjogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA4LzY2MTM0NjUzNTgwNzcucG5nXCIsXHJcbiAgICAgICAgICBuYW1lOiBcIlx1OEQ3N1x1NTlDQlx1OTg3NVwiLFxyXG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vbmF2Lmltc3l5LnRvcC9cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9waWMuZWZlZmVlLmNuL3VwbG9hZHMvMjAyNC8wNC8wOC82NjEzNDZkNDE4YWQ3LnBuZ1wiLFxyXG4gICAgICAgICAgbmFtZTogXCJcdTRFQ0FcdTY1RTVcdTcwRURcdTY5OUNcIixcclxuICAgICAgICAgIHVybDogXCJodHRwczovL2hvdC5pbXN5eS50b3AvXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uOiBcImh0dHBzOi8vcGljLmVmZWZlZS5jbi91cGxvYWRzLzIwMjQvMDQvMDgvNjYxMzQ3MjI1ODZmYS5wbmdcIixcclxuICAgICAgICAgIG5hbWU6IFwiXHU3QUQ5XHU3MEI5XHU3NkQxXHU2RDRCXCIsXHJcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zdGF0dXMuaW1zeXkudG9wL1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiBcIlx1OTg3OVx1NzZFRVwiLFxyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbjogXCIvaW1hZ2VzL2xvZ28vbG9nby53ZWJwXCIsXHJcbiAgICAgICAgICBuYW1lOiBcIkN1cnZlXCIsXHJcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L3ZpdGVwcmVzcy10aGVtZS1jdXJ2ZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbjogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA3LzY2MTI0ZjVmYzYzYzgucG5nXCIsXHJcbiAgICAgICAgICBuYW1lOiBcIlNQbGF5ZXJcIixcclxuICAgICAgICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvU1BsYXllclwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbjogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA4LzY2MTM0NjUzNTgwNzcucG5nXCIsXHJcbiAgICAgICAgICBuYW1lOiBcIlNuYXZpZ2F0aW9uXCIsXHJcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L1NQbGF5ZXJcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb246IFwiL2ltYWdlcy9sb2dvL2xvZ28ud2VicFwiLFxyXG4gICAgICAgICAgbmFtZTogXCJIb21lXCIsXHJcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L2hvbWVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb246IFwiaHR0cHM6Ly9waWMuZWZlZmVlLmNuL3VwbG9hZHMvMjAyNC8wNC8wOC82NjEzNDZkNDE4YWQ3LnBuZ1wiLFxyXG4gICAgICAgICAgbmFtZTogXCJEYWlseUhvdEFwaVwiLFxyXG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9pbXN5eS9EYWlseUhvdEFwaVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbjogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA4LzY2MTM0NzIyNTg2ZmEucG5nXCIsXHJcbiAgICAgICAgICBuYW1lOiBcInNpdGUtc3RhdHVzXCIsXHJcbiAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L3NpdGUtc3RhdHVzXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXSxcclxuICAvLyBcdTVDMDFcdTk3NjJcdTkxNERcdTdGNkVcclxuICBjb3Zlcjoge1xyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHU1M0NDXHU2ODBGXHU1RTAzXHU1QzQwXHJcbiAgICB0d29Db2x1bW5zOiBmYWxzZSxcclxuICAgIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NUMwMVx1OTc2Mlx1NjYzRVx1NzkzQVxyXG4gICAgc2hvd0NvdmVyOiB7XHJcbiAgICAgIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NUMwMVx1OTc2Mlx1NjYzRVx1NzkzQSBcdTY1ODdcdTdBRTBcdTRFMERcdThCQkVcdTdGNkVjb3Zlclx1NUMwMVx1OTc2Mlx1NEYxQVx1NjYzRVx1NzkzQVx1NUYwMlx1NUUzOFx1RkYwQ1x1NTNFRlx1NEVFNVx1OEJCRVx1N0Y2RVx1NEUwQlx1NjVCOVx1OUVEOFx1OEJBNFx1NUMwMVx1OTc2MlxyXG4gICAgICBlbmFibGU6IHRydWUsXHJcbiAgICAgIC8vIFx1NUMwMVx1OTc2Mlx1NUUwM1x1NUM0MFx1NjVCOVx1NUYwRjogbGVmdCB8IHJpZ2h0IHwgYm90aFxyXG4gICAgICBjb3ZlckxheW91dDogJ2JvdGgnLFxyXG4gICAgICAvLyBcdTlFRDhcdThCQTRcdTVDMDFcdTk3NjIoXHU5NjhGXHU2NzNBXHU1QzU1XHU3OTNBKVxyXG4gICAgICBkZWZhdWx0Q292ZXI6IFtcclxuICAgICAgICAnaHR0cHM6Ly9jLndhbGxoZXJlLmNvbS9pbWFnZXMvMzAvMmIvM2YyMjE0YWE2MThlZWJmNjJlNGVhNDM1OGY5YS0xNTYzMzA1LmpwZyFkJyxcclxuICAgICAgICAnaHR0cHM6Ly9jLndhbGxoZXJlLmNvbS9pbWFnZXMvODMvYzMvMWNhY2FiODcyZDU3YzY1NmU1ODZhNjEwZDgyNi0xNTgwNDQzLmpwZyFkJyxcclxuICAgICAgICAnaHR0cHM6Ly9jLndhbGxoZXJlLmNvbS9pbWFnZXMvODkvZTUvMTdjMWMzMzQ2MzM1ODYxMWNiNTg5N2Y2ZjQ1ZS0xNDM3NzI3LmpwZyFkJ1xyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBcdTk4NzVcdTgxMUFcdTRGRTFcdTYwNkZcclxuICBmb290ZXI6IHtcclxuICAgIC8vIFx1NzkzRVx1NEVBNFx1OTRGRVx1NjNBNVx1RkYwOFx1OEJGN1x1Nzg2RVx1NEZERFx1NEUzQVx1NTA3Nlx1NjU3MFx1NEUyQVx1RkYwOVxyXG4gICAgc29jaWFsOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uOiBcImVtYWlsXCIsXHJcbiAgICAgICAgbGluazogXCJtYWlsdG86b25lQGltc3l5LnRvcFwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWNvbjogXCJnaXRodWJcIixcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vd3d3LmdpdGh1Yi5jb20vaW1zeXkvXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uOiBcInRlbGVncmFtXCIsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3QubWUvYm90dG9tX3VzZXJcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGljb246IFwiYmlsaWJpbGlcIixcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vc3BhY2UuYmlsaWJpbGkuY29tLzk4NTQ0MTQyXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uOiBcInFxXCIsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3Jlcy5hYmVpbS5jbi9hcGkvcXEvP3FxPTE1MzkyNTAzNTJcIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGljb246IFwidHdpdHRlci14XCIsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3R3aXR0ZXIuY29tL2lpbW1zeXlcIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICAvLyBzaXRlbWFwXHJcbiAgICBzaXRlbWFwOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NTM1QVx1NUJBMlwiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU4RkQxXHU2NzFGXHU2NTg3XHU3QUUwXCIsIGxpbms6IFwiL1wiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1MTY4XHU5MEU4XHU1MjA2XHU3QzdCXCIsIGxpbms6IFwiL3BhZ2VzL2NhdGVnb3JpZXNcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1NTE2OFx1OTBFOFx1NjgwN1x1N0I3RVwiLCBsaW5rOiBcIi9wYWdlcy90YWdzXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTY1ODdcdTdBRTBcdTVGNTJcdTY4NjNcIiwgbGluazogXCIvcGFnZXMvYXJjaGl2ZXNcIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU5ODc5XHU3NkVFXCIsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogXCJIb21lXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L2hvbWUvXCIsIG5ld1RhYjogdHJ1ZSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlNQbGF5ZXJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvU1BsYXllci9cIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiRGFpbHlIb3RBcGlcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vaW1zeXkvRGFpbHlIb3RBcGkvXCIsIG5ld1RhYjogdHJ1ZSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlNuYXZpZ2F0aW9uXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ltc3l5L1NuYXZpZ2F0aW9uL1wiLCBuZXdUYWI6IHRydWUgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTRFMTNcdTY4MEZcIixcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1NjI4MFx1NjcyRlx1NTIwNlx1NEVBQlwiLCBsaW5rOiBcIi9wYWdlcy9jYXRlZ29yaWVzL1x1NjI4MFx1NjcyRlx1NTIwNlx1NEVBQlwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFXCIsIGxpbms6IFwiL3BhZ2VzL3Byb2plY3RcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1NjU0OFx1NzM4N1x1NURFNVx1NTE3N1wiLCBsaW5rOiBcIi9wYWdlcy90b29sc1wiIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU5ODc1XHU5NzYyXCIsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTc1NDVcdTYyNDBcdTZCMzJcdThBMDBcIiwgbGluazogXCIvcGFnZXMvbWVzc2FnZVwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXHU2NzJDXHU3QUQ5XCIsIGxpbms6IFwiL3BhZ2VzL2Fib3V0XCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTk2OTBcdTc5QzFcdTY1M0ZcdTdCNTZcIiwgbGluazogXCIvcGFnZXMvcHJpdmFjeVwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU3MjQ4XHU2NzQzXHU1MzRGXHU4QkFFXCIsIGxpbms6IFwiL3BhZ2VzL2NjXCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTY3MERcdTUyQTFcIixcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1N0FEOVx1NzBCOVx1NzJCNlx1NjAwMVwiLCBsaW5rOiBcImh0dHBzOi8vc3RhdHVzLmltc3l5LnRvcC9cIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU0RTAwXHU0RTJBXHU1QkZDXHU4MjJBXCIsIGxpbms6IFwiaHR0cHM6Ly9uYXYuaW1zeXkudG9wL1wiLCBuZXdUYWI6IHRydWUgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTdBRDlcdTcwQjlcdThCQTJcdTk2MDVcIiwgbGluazogXCJodHRwczovL2Jsb2cuaW1zeXkudG9wL3Jzcy54bWxcIiwgbmV3VGFiOiB0cnVlIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1M0NEXHU5OTg4XHU2Mjk1XHU4QkM5XCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly9lcW54d2VpbWtyNS5mZWlzaHUuY24vc2hhcmUvYmFzZS9mb3JtL3NocmNuQ1hDUG14Q0tLSllJM1JLVWZlZkpyZVwiLFxyXG4gICAgICAgICAgICBuZXdUYWI6IHRydWUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgLy8gXHU4QkM0XHU4QkJBXHJcbiAgY29tbWVudDoge1xyXG4gICAgZW5hYmxlOiBmYWxzZSxcclxuICAgIC8vIFx1OEJDNFx1OEJCQVx1N0NGQlx1N0VERlx1OTAwOVx1NjJFOVxyXG4gICAgLy8gYXJ0YWxrIC8gdHdpa29vXHJcbiAgICB0eXBlOiBcImFydGFsa1wiLFxyXG4gICAgLy8gYXJ0YWxrXHJcbiAgICAvLyBodHRwczovL2FydGFsay5qcy5vcmcvXHJcbiAgICBhcnRhbGs6IHtcclxuICAgICAgc2l0ZTogXCJcIixcclxuICAgICAgc2VydmVyOiBcIlwiLFxyXG4gICAgfSxcclxuICAgIC8vIHR3aWtvb1xyXG4gICAgLy8gaHR0cHM6Ly90d2lrb28uanMub3JnL1xyXG4gICAgdHdpa29vOiB7XHJcbiAgICAgIC8vIFx1NUZDNVx1NTg2Qlx1RkYwQ1x1ODJFNVx1NEUwRFx1NjBGM1x1NEY3Rlx1NzUyOCBDRE5cdUZGMENcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjggcG5wbSBhZGQgdHdpa29vIFx1NUI4OVx1ODhDNVx1NUU3Nlx1NUYxNVx1NTE2NVxyXG4gICAgICBqczogXCJodHRwczovL21pcnJvcnMuc3VzdGVjaC5lZHUuY24vY2RuanMvYWpheC9saWJzL3R3aWtvby8xLjYuMzkvdHdpa29vLmFsbC5taW4uanNcIixcclxuICAgICAgZW52SWQ6IFwiXCIsXHJcbiAgICAgIC8vIFx1NzNBRlx1NTg4M1x1NTczMFx1NTdERlx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQSBhcC1zaGFuZ2hhaVx1RkYwQ1x1ODE3RVx1OEJBRlx1NEU5MVx1NzNBRlx1NTg4M1x1NTg2QiBhcC1zaGFuZ2hhaSBcdTYyMTYgYXAtZ3Vhbmd6aG91XHVGRjFCVmVyY2VsIFx1NzNBRlx1NTg4M1x1NEUwRFx1NTg2QlxyXG4gICAgICByZWdpb246IFwiYXAtc2hhbmdoYWlcIixcclxuICAgICAgbGFuZzogXCJ6aC1DTlwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIFx1NEZBN1x1OEZCOVx1NjgwRlxyXG4gIGFzaWRlOiB7XHJcbiAgICAvLyBcdTdBRDlcdTcwQjlcdTdCODBcdTRFQ0JcclxuICAgIGhlbGxvOiB7XHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgICAgdGV4dDogXCJcdThGRDlcdTkxQ0NcdTY3MDlcdTUxNzNcdTRFOEU8c3Ryb25nPlx1NUYwMFx1NTNEMTwvc3Ryb25nPlx1NzZGOFx1NTE3M1x1NzY4NFx1OTVFRVx1OTg5OFx1NTQ4Q1x1NzcwQlx1NkNENVx1RkYwQ1x1NEU1Rlx1NEYxQVx1NjcwOVx1NEUwMFx1NEU5QjxzdHJvbmc+XHU1OTQ3XHU2MjgwXHU2REVCXHU1REU3PC9zdHJvbmc+XHU3Njg0XHU1MjA2XHU0RUFCXHVGRjBDXHU1MTc2XHU0RTJEXHU1OTI3XHU5MEU4XHU1MjA2XHU1MTg1XHU1QkI5XHU0RjFBXHU0RkE3XHU5MUNEXHU0RThFPHN0cm9uZz5cdTUyNERcdTdBRUZcdTVGMDBcdTUzRDE8L3N0cm9uZz5cdTMwMDJcdTVFMENcdTY3MUJcdTRGNjBcdTUzRUZcdTRFRTVcdTU3MjhcdThGRDlcdTkxQ0NcdTYyN0VcdTUyMzBcdTVCRjlcdTRGNjBcdTY3MDlcdTc1MjhcdTc2ODRcdTc3RTVcdThCQzZcdTU0OENcdTY1NTlcdTdBMEJcdTMwMDJcIixcclxuICAgIH0sXHJcbiAgICAvLyBcdTc2RUVcdTVGNTVcclxuICAgIHRvYzoge1xyXG4gICAgICBlbmFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2ODA3XHU3QjdFXHJcbiAgICB0YWdzOiB7XHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTUwMTJcdThCQTFcdTY1RjZcclxuICAgIGNvdW50RG93bjoge1xyXG4gICAgICBlbmFibGU6IHRydWUsXHJcbiAgICAgIC8vIFx1NTAxMlx1OEJBMVx1NjVGNlx1NjVFNVx1NjcxRlxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbmFtZTogXCJcdTY2MjVcdTgyODJcIixcclxuICAgICAgICBkYXRlOiBcIjIwMjUtMDEtMjlcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTdBRDlcdTcwQjlcdTY1NzBcdTYzNkVcclxuICAgIHNpdGVEYXRhOiB7XHJcbiAgICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyBcdTUzQ0JcdTk0RkVcclxuICBmcmllbmRzOiB7XHJcbiAgICAvLyBcdTUzQ0JcdTk0RkVcdTY3MEJcdTUzQ0JcdTU3MDhcclxuICAgIGNpcmNsZU9mRnJpZW5kczogXCJcIixcclxuICAgIC8vIFx1NTJBOFx1NjAwMVx1NTNDQlx1OTRGRVxyXG4gICAgZHluYW1pY0xpbms6IHtcclxuICAgICAgc2VydmVyOiBcIlwiLFxyXG4gICAgICBhcHBfdG9rZW46IFwiXCIsXHJcbiAgICAgIHRhYmxlX2lkOiBcIlwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIFx1OTdGM1x1NEU1MFx1NjRBRFx1NjUzRVx1NTY2OFxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbXN5eS9NZXRpbmctQVBJXHJcbiAgbXVzaWM6IHtcclxuICAgIGVuYWJsZTogZmFsc2UsXHJcbiAgICAvLyB1cmxcclxuICAgIHVybDogXCJodHRwczovL2FwaS1tZXRpbmcuZXhhbXBsZS5jb21cIixcclxuICAgIC8vIGlkXHJcbiAgICBpZDogOTM3OTgzMTcxNCxcclxuICAgIC8vIG5ldGVhc2UgLyB0ZW5jZW50IC8ga3Vnb3VcclxuICAgIHNlcnZlcjogXCJuZXRlYXNlXCIsXHJcbiAgICAvLyBwbGF5bGlzdCAvIGFsYnVtIC8gc29uZ1xyXG4gICAgdHlwZTogXCJwbGF5bGlzdFwiLFxyXG4gIH0sXHJcbiAgLy8gXHU2NDFDXHU3RDIyXHJcbiAgLy8gaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vXHJcbiAgc2VhcmNoOiB7XHJcbiAgICBlbmFibGU6IGZhbHNlLFxyXG4gICAgYXBwSWQ6IFwiXCIsXHJcbiAgICBhcGlLZXk6IFwiXCIsXHJcbiAgfSxcclxuICAvLyBcdTYyNTNcdThENEZcclxuICByZXdhcmREYXRhOiB7XHJcbiAgICBlbmFibGU6IHRydWUsXHJcbiAgICAvLyBcdTVGQUVcdTRGRTFcdTRFOENcdTdFRjRcdTc4MDFcclxuICAgIHdlY2hhdDogXCJodHRwczovL3BpYy5lZmVmZWUuY24vdXBsb2Fkcy8yMDI0LzA0LzA3LzY2MTIxMDQ5ZDFlODAud2VicFwiLFxyXG4gICAgLy8gXHU2NTJGXHU0RUQ4XHU1QjlEXHU0RThDXHU3RUY0XHU3ODAxXHJcbiAgICBhbGlwYXk6IFwiaHR0cHM6Ly9waWMuZWZlZmVlLmNuL3VwbG9hZHMvMjAyNC8wNC8wNy82NjEyMDY2MzFkM2I1LndlYnBcIixcclxuICB9LFxyXG4gIC8vIFx1NTZGRVx1NzI0N1x1NzA2Rlx1N0JCMVxyXG4gIGZhbmN5Ym94OiB7XHJcbiAgICBlbmFibGU6IHRydWUsXHJcbiAgICBqczogXCJodHRwczovL21pcnJvcnMuc3VzdGVjaC5lZHUuY24vY2RuanMvYWpheC9saWJzL2ZhbmN5YXBwcy11aS81LjAuMzYvZmFuY3lib3gvZmFuY3lib3gudW1kLm1pbi5qc1wiLFxyXG4gICAgY3NzOiBcImh0dHBzOi8vbWlycm9ycy5zdXN0ZWNoLmVkdS5jbi9jZG5qcy9hamF4L2xpYnMvZmFuY3lhcHBzLXVpLzUuMC4zNi9mYW5jeWJveC9mYW5jeWJveC5taW4uY3NzXCIsXHJcbiAgfSxcclxuICAvLyBcdTU5MTZcdTk0RkVcdTRFMkRcdThGNkNcclxuICBqdW1wUmVkaXJlY3Q6IHtcclxuICAgIGVuYWJsZTogdHJ1ZSxcclxuICAgIC8vIFx1NjM5Mlx1OTY2NFx1N0M3Qlx1NTQwRFxyXG4gICAgZXhjbHVkZTogW1xyXG4gICAgICBcImNmLWZyaWVuZHMtbGlua1wiLFxyXG4gICAgICBcInVweXVuXCIsXHJcbiAgICAgIFwiaWNwXCIsXHJcbiAgICAgIFwiYXV0aG9yXCIsXHJcbiAgICAgIFwicnNzXCIsXHJcbiAgICAgIFwiY2NcIixcclxuICAgICAgXCJwb3dlclwiLFxyXG4gICAgICBcInNvY2lhbC1saW5rXCIsXHJcbiAgICAgIFwibGluay10ZXh0XCIsXHJcbiAgICAgIFwidHJhdmVsbGluZ3NcIixcclxuICAgICAgXCJwb3N0LWxpbmtcIixcclxuICAgICAgXCJyZXBvcnRcIixcclxuICAgICAgXCJtb3JlLWxpbmtcIixcclxuICAgICAgXCJza2lsbHMtaXRlbVwiLFxyXG4gICAgICBcInJpZ2h0LW1lbnUtbGlua1wiLFxyXG4gICAgICBcImxpbmstY2FyZFwiLFxyXG4gICAgXSxcclxuICB9LFxyXG4gIC8vIFx1N0FEOVx1NzBCOVx1N0VERlx1OEJBMVxyXG4gIHRvbmdqaToge1xyXG4gICAgXCI1MWxhXCI6IFwiXCIsXHJcbiAgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBqY3p6XFxcXHZpdGVwcmVzcy10aGVtZS1jdXJ2ZVxcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBqY3p6XFxcXHZpdGVwcmVzcy10aGVtZS1jdXJ2ZVxcXFwudml0ZXByZXNzXFxcXGluaXQubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3BqY3p6L3ZpdGVwcmVzcy10aGVtZS1jdXJ2ZS8udml0ZXByZXNzL2luaXQubWpzXCI7aW1wb3J0IHsgdGhlbWVDb25maWcgfSBmcm9tIFwiLi90aGVtZS9hc3NldHMvdGhlbWVDb25maWcubWpzXCI7XHJcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTVFNzZcdTU0MDhcdTVFNzZcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRUaGVtZUNvbmZpZyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHJcbiAgICBjb25zdCBjb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi90aGVtZUNvbmZpZy5tanNcIik7XHJcbiAgICBpZiAoZXhpc3RzU3luYyhjb25maWdQYXRoKSkge1xyXG4gICAgICAvLyBcdTY1ODdcdTRFRjZcdTVCNThcdTU3MjhcdTY1RjZcdThGREJcdTg4NENcdTUyQThcdTYwMDFcdTVCRkNcdTUxNjVcclxuICAgICAgY29uc3QgdXNlckNvbmZpZyA9IGF3YWl0IGltcG9ydChcIi4uL3RoZW1lQ29uZmlnLm1qc1wiKTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhlbWVDb25maWcsIHVzZXJDb25maWc/LnRoZW1lQ29uZmlnIHx8IHt9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1NjVGNlx1OEZENFx1NTZERVx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxyXG4gICAgICBjb25zb2xlLndhcm4oXCJVc2VyIGNvbmZpZ3VyYXRpb24gZmlsZSBub3QgZm91bmQsIHVzaW5nIGRlZmF1bHQgdGhlbWVDb25maWcuXCIpO1xyXG4gICAgICByZXR1cm4gdGhlbWVDb25maWc7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBsb2FkaW5nIHRoZSBjb25maWd1cmF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gdGhlbWVDb25maWc7XHJcbiAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccGpjenpcXFxcdml0ZXByZXNzLXRoZW1lLWN1cnZlXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxccGpjenpcXFxcdml0ZXByZXNzLXRoZW1lLWN1cnZlXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcXFxcbWFya2Rvd25Db25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3BqY3p6L3ZpdGVwcmVzcy10aGVtZS1jdXJ2ZS8udml0ZXByZXNzL3RoZW1lL3V0aWxzL21hcmtkb3duQ29uZmlnLm1qc1wiO2ltcG9ydCB7IHRhYnNNYXJrZG93blBsdWdpbiB9IGZyb20gXCJ2aXRlcHJlc3MtcGx1Z2luLXRhYnNcIjtcclxuaW1wb3J0IG1hcmtkb3duSXRBdHRycyBmcm9tIFwibWFya2Rvd24taXQtYXR0cnNcIjtcclxuaW1wb3J0IGNvbnRhaW5lciBmcm9tIFwibWFya2Rvd24taXQtY29udGFpbmVyXCI7XHJcblxyXG4vLyBtYXJrZG93bi1pdFxyXG5jb25zdCBtYXJrZG93bkNvbmZpZyA9IChtZCwgdGhlbWVDb25maWcpID0+IHtcclxuICAvLyBcdTYzRDJcdTRFRjZcclxuICBtZC51c2UobWFya2Rvd25JdEF0dHJzKTtcclxuICBtZC51c2UodGFic01hcmtkb3duUGx1Z2luKTtcclxuICAvLyB0aW1lbGluZVxyXG4gIG1kLnVzZShjb250YWluZXIsIFwidGltZWxpbmVcIiwge1xyXG4gICAgdmFsaWRhdGU6IChwYXJhbXMpID0+IHBhcmFtcy50cmltKCkubWF0Y2goL150aW1lbGluZVxccysoLiopJC8pLFxyXG4gICAgcmVuZGVyOiAodG9rZW5zLCBpZHgpID0+IHtcclxuICAgICAgY29uc3QgbSA9IHRva2Vuc1tpZHhdLmluZm8udHJpbSgpLm1hdGNoKC9edGltZWxpbmVcXHMrKC4qKSQvKTtcclxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm5lc3RpbmcgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ0aW1lbGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZWxpbmUtdGl0bGVcIj4ke21kLnV0aWxzLmVzY2FwZUh0bWwobVsxXSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lbGluZS1jb250ZW50XCI+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCI8L2Rpdj48L2Rpdj5cXG5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyByYWRpb1xyXG4gIG1kLnVzZShjb250YWluZXIsIFwicmFkaW9cIiwge1xyXG4gICAgcmVuZGVyOiAodG9rZW5zLCBpZHgsIF9vcHRpb25zLCBlbnYpID0+IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgICAgY29uc3QgY2hlY2sgPSB0b2tlbi5pbmZvLnRyaW0oKS5zbGljZShcInJhZGlvXCIubGVuZ3RoKS50cmltKCk7XHJcbiAgICAgIGlmICh0b2tlbi5uZXN0aW5nID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgaXNDaGVja2VkID0gbWQucmVuZGVySW5saW5lKGNoZWNrLCB7XHJcbiAgICAgICAgICByZWZlcmVuY2VzOiBlbnYucmVmZXJlbmNlcyxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJyYWRpb1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvLXBvaW50ICR7aXNDaGVja2VkfVwiIC8+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCI8L2Rpdj5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyBidXR0b25cclxuICBtZC51c2UoY29udGFpbmVyLCBcImJ1dHRvblwiLCB7XHJcbiAgICByZW5kZXI6ICh0b2tlbnMsIGlkeCwgX29wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgICAgY29uc3QgY2hlY2sgPSB0b2tlbi5pbmZvLnRyaW0oKS5zbGljZShcImJ1dHRvblwiLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiAke2NoZWNrfVwiPmA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiPC9idXR0b24+XCI7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgLy8gY2FyZFxyXG4gIG1kLnVzZShjb250YWluZXIsIFwiY2FyZFwiLCB7XHJcbiAgICByZW5kZXI6ICh0b2tlbnMsIGlkeCwgX29wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgICAgaWYgKHRva2VuLm5lc3RpbmcgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJjYXJkXCI+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCI8L2Rpdj5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyBcdTg4NjhcdTY4M0NcclxuICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwidGFibGUtY29udGFpbmVyXCI+PHRhYmxlPic7XHJcbiAgfTtcclxuICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9jbG9zZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBcIjwvdGFibGU+PC9kaXY+XCI7XHJcbiAgfTtcclxuICAvLyBcdTU2RkVcdTcyNDdcclxuICBtZC5yZW5kZXJlci5ydWxlcy5pbWFnZSA9ICh0b2tlbnMsIGlkeCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcclxuICAgIGNvbnN0IHNyYyA9IHRva2VuLmF0dHJzW3Rva2VuLmF0dHJJbmRleChcInNyY1wiKV1bMV07XHJcbiAgICBjb25zdCBhbHQgPSB0b2tlbi5jb250ZW50O1xyXG4gICAgaWYgKCF0aGVtZUNvbmZpZy5mYW5jeWJveC5lbmFibGUpIHtcclxuICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7c3JjfVwiIGFsdD1cIiR7YWx0fVwiIGxvYWRpbmc9XCJsYXp5XCI+YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgPGEgY2xhc3M9XCJpbWctZmFuY3lib3hcIiBocmVmPVwiJHtzcmN9XCIgZGF0YS1mYW5jeWJveD1cImdhbGxlcnlcIiBkYXRhLWNhcHRpb249XCIke2FsdH1cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwb3N0LWltZ1wiIHNyYz1cIiR7c3JjfVwiIGFsdD1cIiR7YWx0fVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicG9zdC1pbWctdGlwXCI+JHthbHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvYT5gO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYXJrZG93bkNvbmZpZztcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VSxTQUFTLG9CQUFvQjs7O0FDQXFCLFNBQVMsMkJBQTJCO0FBQzdaLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsWUFBWTtBQUNyQixPQUFPLFVBQVU7QUFPVixJQUFNLGdCQUFnQixPQUFPLFFBQVFBLGlCQUFnQjtBQUUxRCxRQUFNLFdBQVdBLGFBQVk7QUFDN0IsUUFBTSxXQUFXLFNBQVM7QUFFMUIsUUFBTSxPQUFPLElBQUksS0FBSztBQUFBLElBQ3BCLE9BQU8sU0FBUztBQUFBLElBQ2hCLGFBQWEsU0FBUztBQUFBLElBQ3RCLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDM0IsU0FBUyxTQUFTLE9BQU87QUFBQSxJQUN6QixXQUFXLCtCQUE0QixTQUFTLE9BQU8sSUFBSTtBQUFBLElBQzNELFNBQVMs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T0FBTztBQUFBO0FBQUEsSUFFUCxhQUFhO0FBQUE7QUFBQSxJQUViLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxLQUFLO0FBQUE7QUFBQSxFQUVMLE9BQU87QUFBQTtBQUFBLEVBRVAsVUFBVTtBQUFBO0FBQUEsRUFFVixRQUFRO0FBQUE7QUFBQTtBQUFBLElBR04sUUFBUTtBQUFBO0FBQUEsTUFFTixDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFBQTtBQUFBLE1BRTlDO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQTtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxhQUFh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TTtBQUFBLFVBQ04sS0FBSztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sS0FBSztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFlBQVk7QUFBQTtBQUFBLElBRVosV0FBVztBQUFBO0FBQUEsTUFFVCxRQUFRO0FBQUE7QUFBQSxNQUVSLGFBQWE7QUFBQTtBQUFBLE1BRWIsY0FBYztBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxRQUFRO0FBQUE7QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFD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O0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsUUFDUCxjQUFjO0FBQUEsUUFDZCxhQUFhO0FBQUEsUUFDYix1QkFBdUI7QUFBQTtBQUFBLFFBRXZCLGdCQUFnQjtBQUFBLFVBQ2Q7QUFBQSxZQUNFLFlBQVk7QUFBQSxZQUNaLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLFlBQVk7QUFBQSxZQUNaLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLFlBQVk7QUFBQSxZQUNaLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxjQUNYLFlBQVk7QUFBQSxnQkFDVixZQUFZO0FBQUEsZ0JBQ1osZUFBZSxLQUFLLEtBQUssS0FBSztBQUFBLGNBQ2hDO0FBQUEsY0FDQSxtQkFBbUI7QUFBQSxnQkFDakIsVUFBVSxDQUFDLEdBQUcsR0FBRztBQUFBLGNBQ25CO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUE7QUFBQSxRQUVBLGNBQWMsQ0FBQyx1REFBdUQ7QUFBQTtBQUFBLFFBRXRFLDBCQUEwQixDQUFDLG1CQUFtQixlQUFlLGdCQUFnQjtBQUFBLE1BQy9FO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNRixhQUFZLFNBQVM7QUFBQSxRQUMzQixZQUFZQSxhQUFZLFNBQVM7QUFBQSxRQUNqQyxhQUFhQSxhQUFZLFNBQVM7QUFBQSxRQUNsQyxTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsidGhlbWVDb25maWciLCAidGhlbWVDb25maWciLCAicG9zdERhdGEiLCAicGF0aCIsICJwYXRoIiwgInRoZW1lQ29uZmlnIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAidGhlbWVDb25maWciLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
