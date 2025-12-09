import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config ？
export default withMermaid(
  defineConfig({
    title: "aftershcok-docs",
    description: "aftershcok website docs",
    srcDir: "src/",
    base: "/aftershock-docs/",
    head: [
      // https://cdn.shopify.com/s/files/1/0522/3320/7988/files/favicon.ico?v=1726679956
      ['link', { rel: 'icon', href: '/favicon.svg' }]
    ],
    locales:{
      root: {
        label: '简体中文',
        lang: 'zh-CN',
      },
      en: {
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        themeConfig: {
          outline: {
            label: "On this page",
            level: [2, 3],
          },
          nav: [
            { text: "Overview", link: "/en/" },
            {
              text: "Sites",
              items: [
                { text: "Aftershock AU", link: "/en/aftershockau" },
                { text: "thetechyardau", link: "/en/thetechyardau" },
              ],
            },
          ],
          sidebar: {
            "/en/aftershockau/": [
              { text: "Overview", link: "/en/aftershockau/index" },
              { text: "Page Structure", link: "/en/aftershockau/routes" },
              { text: "Plugins and Dependencies", link: "/en/aftershockau/dependencies" },
              {
                text: "Data Flow",
                items: [
                  { text: "Layout Global Data Flow", link: "/en/aftershockau/data-layout" },
                  { text: "Home Page", link: "/en/aftershockau/data-home" },
                  {
                    text: "Products",
                    collapsed: true,
                    items: [
                      { text: "Sale", link: "/en/aftershockau/data-sale" },
                      {
                        text: "Read To Ship",
                        link: "/en/aftershockau/data-ready-to-ship",
                      },
                      { text: "Collection", link: "/en/aftershockau/data-collection" },
                      { text: "SLP", link: "/en/aftershockau/data-series" },
                      {
                        text: "Limited Edition",
                        link: "/en/aftershockau/data-limited-edition",
                      },
                      { text: "Products", link: "/en/aftershockau/data-products" },
                      { text: "Workstations", link: "/en/aftershockau/data-workstations" },
                      { text: "PC Models", link: "/en/aftershockau/data-pc-models" },
                      { text: "Custom Servers", link: "/en/aftershockau/data-server-landing-page" },
                    ],
                  },

                  {
                    text: "Knowledge Hub",
                    link: "/en/aftershockau/data-knowledge-hub",
                  },
                  {
                    text: "Flagship Showroom",
                    link: "/en/aftershockau/data-flagship-showroom",
                  },
                  { text: "Contact us", link: "/en/aftershockau/data-contact-us" },
                  { text: "FAQ Hub", link: "/en/aftershockau/data-faq-hub" },
                  { text: "Careers", link: "/en/aftershockau/data-careers" },
                  { text: "About us", link: "/en/aftershockau/data-about-us" },
                  { text: "Warranty", link: "/en/aftershockau/data-warranty" },
                  { text: "Drivers", link: "/en/aftershockau/data-drivers" },

                  {
                    text: "User Info",
                    collapsed: true,
                    items: [
                      {
                        text: "User Account",
                        link: "/en/aftershockau/data-user-account",
                      },
                      {
                        text: "Order tracker",
                        link: "/en/aftershockau/data-order-tracker",
                      },
                    ],
                  },
                ],
              },
              {
                text: "Feature Explanation",
                items: [
                  { text: "Home Page", link: "/en/aftershockau/routes-home" },
                  {
                    text: "Products",
                    collapsed: true,
                    items: [
                      { text: "Sale", link: "/en/aftershockau/route-sale" },
                      {
                        text: "Read To Ship",
                        link: "/en/aftershockau/routes-ready-to-ship",
                      },
                      {
                        text: "Collection",
                        link: "/en/aftershockau/routes-collection",
                      },
                      { text: "SLP", link: "/en/aftershockau/routes-series" },
                      {
                        text: "Limited Edition",
                        link: "/en/aftershockau/routes-limited-edition",
                      },
                      { text: "Products", link: "/en/aftershockau/routes-products" },
                    ],
                  },

                  {
                    text: "Knowledge Hub",
                    link: "/en/aftershockau/routes-knowledge-hub",
                    collapsed: true,
                    items: [
                      {
                        text: "Knowledge Hub Categories",
                        link: "/en/aftershockau/routes-knowlede-hub-categories",
                      },
                      {
                        text: "Knowledge Hub Post",
                        link: "/en/aftershockau/routes-knowlede-hub-post",
                      },
                    ],
                  },
                  {
                    text: "Flagship Showroom",
                    link: "/en/aftershockau/routes-flagship-showroom",
                  },
                  {
                    text: "Contact Us",
                    link: "/en/aftershockau/routes-contact-us",
                  },
                  { text: "FAQ Hub", link: "/en/aftershockau/routes-faq-hub" },
                  { text: "Careers", link: "/en/aftershockau/routes-careers" },
                  { text: "About Us", link: "/en/aftershockau/routes-about-us" },
                  { text: "Warranty", link: "/en/aftershockau/routes-warranty" },
                  { text: "Drivers", link: "/en/aftershockau/routes-drivers" },
                  {
                    text: "User Info",
                    collapsed: true,
                    items: [
                      {
                        text: "User Account",
                        link: "/en/aftershockau/routes-user-account",
                      },
                      {
                        text: "Order tracker",
                        link: "/en/aftershockau/routes-order-tracker",
                      },
                    ],
                  },
                ],
              },
              {
                text: "Feedback",
                link: "/en/aftershockau/suggestion",
              },
            ],
          },
        }
      },
    },
    mermaid: {
      /**
       * 主题
       * default - 这是所有图表的默认主题。
       * neutral - 该主题非常适合要打印的黑白文档。
       * dark - 这个主题与深色元素或夜间模式很相配。
       * forest - 这个主题包含绿色阴影。
       * base - 这是唯一可以修改的主题。使用此主题作为自定义的基础。
       */
      theme: "forest",
      markdownAutoWrap: true, // 是否自动换行
      look: 'handDrawn'
    },
    mermaidPlugin: {
      class: "mermaid my-class", // set additional css classes for parent container
    },
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      logo: "/imgs/logo.svg",
      siteTitle: false,
      outline: {
        label: "页面导航",
        level: [2, 3],
      },
      search: {
        provider: "local",
      },
      nav: [
        { text: "概述", link: "/" },
        {
          text: "站点",
          items: [
            { text: "Aftershock AU", link: "/aftershockau" },
            { text: "thetechyardau", link: "/thetechyardau" },
          ],
        },
      ],
      sidebar: {
        "/aftershockau/": [
          { text: "快速开始", link: "/aftershockau/index" },
          { text: "页面组成", link: "/aftershockau/routes" },
          { text: "插件和依赖", link: "/aftershockau/dependencies" },
          {
            text: "数据渲染流",
            items: [
              { text: "Layout 全局数据流", link: "/aftershockau/data-layout" },
              { text: "Home Page", link: "/aftershockau/data-home" },
              {
                text: "Products",
                collapsed: true,
                items: [
                  { text: "Sale 促销界面", link: "/aftershockau/data-sale" },
                  { text: "Read To Ship", link: "/aftershockau/data-ready-to-ship", },
                  { text: "Collection", link: "/aftershockau/data-collection" },
                  { text: "SLP", link: "/aftershockau/data-series" },
                  { text: "Limited Edition", link: "/aftershockau/data-limited-edition", },
                  { text: "Products", link: "/aftershockau/data-products" },
                  { text: "Workstations", link: "/aftershockau/data-workstations" },
                  { text: "PC Models", link: "/aftershockau/data-pc-models" },
                  { text: "Custom Servers", link: "/aftershockau/data-server-landing-page" },
                ],
              },

              {
                text: "Knowledge Hub",
                link: "/aftershockau/data-knowledge-hub",
              },
              {
                text: "Flagship Showroom",
                link: "/aftershockau/data-flagship-showroom",
              },
              { text: "Contact us", link: "/aftershockau/data-contact-us" },
              { text: "FAQ Hub", link: "/aftershockau/data-faq-hub" },
              { text: "Careers", link: "/aftershockau/data-careers" },
              { text: "About us", link: "/aftershockau/data-about-us" },
              { text: "Warranty", link: "/aftershockau/data-warranty" },
              { text: "Drivers", link: "/aftershockau/data-drivers" },

              {
                text: "用户信息",
                collapsed: true,
                items: [
                  {
                    text: "用户个人信息",
                    link: "/aftershockau/data-user-account",
                  },
                  {
                    text: "Order tracker",
                    link: "/aftershockau/data-order-tracker",
                  },
                ],
              },
            ],
          },
          {
            text: "功能说明",
            items: [
              { text: "Home Page", link: "/aftershockau/routes-home" },
              {
                text: "Products",
                collapsed: true,
                items: [
                  { text: "Sale 促销界面", link: "/aftershockau/route-sale" },
                  {
                    text: "Read To Ship",
                    link: "/aftershockau/routes-ready-to-ship",
                  },
                  {
                    text: "Collection",
                    link: "/aftershockau/routes-collection",
                  },
                  { text: "SLP", link: "/aftershockau/routes-series" },
                  {
                    text: "Limited Edition",
                    link: "/aftershockau/routes-limited-edition",
                  },
                  { text: "Products", link: "/aftershockau/routes-products" },
                ],
              },

              {
                text: "Knowledge Hub",
                link: "/aftershockau/routes-knowledge-hub",
                collapsed: true,
                items: [
                  {
                    text: "Knowledge Hub Categories",
                    link: "/aftershockau/routes-knowlede-hub-categories",
                  },
                  {
                    text: "Knowledge Hub Post",
                    link: "/aftershockau/routes-knowlede-hub-post",
                  },
                ],
              },
              {
                text: "Flagship Showroom",
                link: "/aftershockau/routes-flagship-showroom",
              },
              {
                text: "Contact Us",
                link: "/aftershockau/routes-contact-us",
              },
              { text: "FAQ Hub", link: "/aftershockau/routes-faq-hub" },
              { text: "Careers", link: "/aftershockau/routes-careers" },
              { text: "About Us", link: "/aftershockau/routes-about-us" },
              { text: "Warranty", link: "/aftershockau/routes-warranty" },
              { text: "Drivers", link: "/aftershockau/routes-drivers" },
              {
                text: "用户信息",
                collapsed: true,
                items: [
                  {
                    text: "用户个人信息",
                    link: "/aftershockau/routes-user-account",
                  },
                  {
                    text: "Order tracker",
                    link: "/aftershockau/routes-order-tracker",
                  },
                ],
              },
            ],
          },
          {
            text: "意见建议",
            link: "/aftershockau/suggestion",
          },
        ],
      },
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/orgs/AftershockPCDev/dashboard",
        },
      ],
    },
  })
);
