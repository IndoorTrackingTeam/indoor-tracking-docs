import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Indoor Tracking',
  tagline: 'This is the documentation for the Indoor Tracking project',
  favicon: 'img/favicon.ico',
  url: 'https://IndoorTrackingTeam.github.io',
  baseUrl: '/indoor-tracking-docs/',
  organizationName: 'IndoorTrackingTeam',
  projectName: 'indoor-tracking-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'pt',
    locales: ['en', 'pt'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/IndoorTrackingTeam/indoor-tracking-docs/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Indoor Tracking',
      logo: {
        alt: 'Indoor Tracking Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/IndoorTrackingTeam',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Indoor Tracking Team, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
