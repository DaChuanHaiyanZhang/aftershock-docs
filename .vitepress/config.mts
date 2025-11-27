import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "aftershcok-docs",
  description: "aftershcok website docs",
  srcDir: "src/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/imgs/logo.svg",
    siteTitle: false,
    outline: {
      label: "页面导航",
      level: "deep",
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
        { text: "页面组成", link: "/aftershockau/routes" },
        { text: "插件和依赖", link: "/aftershockau/dependencies" },
        {
          text: "数据渲染流",
          items: [
            { text: "Layout 全局数据流", link: "/aftershockau/data-layout" },
            {
              text: "Knowledge Hub",
              link: "/aftershockau/data-knowledge-hub",
            },
            {
              text: "Flagship Showroom",
              link: "/aftershockau/data-flagship-showroom",
            },
          ],
        },
        {
          text: "功能说明",
          items: [
            {
              text: "Knowledge Hub",
              link: "/aftershockau/routes-knowledge-hub",
              items: [
                { text: 'Knowledge Hub Categories', link: '/aftershockau/routes-knowlede-hub-categories' },
                { text: 'Knowledge Hub Post', link: '/aftershockau/routes-knowlede-hub-post' }
              ]
            },
            {
              text: "Flagship Showroom",
              link: "/aftershockau/routes-flagship-showroom",
            },
            {
              text: "Contact Us",
              link: "/aftershockau/routes-contact-us",
            },
          ],
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
});
