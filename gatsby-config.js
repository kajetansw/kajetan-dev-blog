module.exports = {
  siteMetadata: {
    siteTitle: 'kajetan.dev',
    siteDescription: 'Blog for everyone who loves learning new things!',
    siteImage: '/banner.png', // main image of the site for metadata
    siteUrl: 'https://kajetan.dev/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'Kajetan Świątek', // for example - 'Ivan Ganev'
    authorDescription: 'Angular Developer, coding nerd, learning-new-stuff lover.',
    avatar: '/avatar.jpg',
    twitterSite: '', // website account on twitter
    twitterCreator: '', // creator account on twitter
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
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 15,
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
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: 'UA-XXXXXXXXX-X'
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
