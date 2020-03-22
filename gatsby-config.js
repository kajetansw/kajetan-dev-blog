module.exports = {
  siteMetadata: {
    siteTitle: 'kajetan.dev | Kajetan Świątek\'s blog',
    siteDescription: 'A personal blog about my experiences with software development. If you enjoy learning new things, this is the place for you!',
    siteImage: '/banner.png',
    siteUrl: 'https://kajetan.dev/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'Kajetan Świątek',
    authorDescription: 'Angular Developer, coding nerd, learning-new-stuff lover.',
    avatar: '/avatar.jpg',
    twitterSite: '',
    twitterCreator: '',
    social: [
      {
        icon: `twitter`,
        url: `https://twitter.com/KajetanSw`
      },
      {
        icon: `github`,
        url: `http://github.com/kajetansw`
      },
      {
        icon: `linkedin`,
        url: `https://www.linkedin.com/in/kajetan-swiatek/`
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          limit: 7,
          yearSeparator: true,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kajetan.dev`,
        short_name: `kajetan.dev`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#2F3A4C`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-156792712-1'
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Open Sans`, `Montserrat`],
        display: 'swap'
      }
    }
  ]
};
