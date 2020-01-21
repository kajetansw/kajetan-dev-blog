import chronoblogTheme from 'gatsby-theme-chronoblog/src/gatsby-plugin-theme-ui';

export default {
  ...chronoblogTheme,
  initialColorMode: 'light',
  colors: {
    ...chronoblogTheme.color,
    text: '#202231',
    background: '#F2F4FC',
    link: '#3d7e9a',
    primary: '#3a5f7d',
    secondary: '#5a809e',
    muted: '#d4dcfc',
    modes: {
      ...chronoblogTheme.colors.modes,
      dark: {
        ...chronoblogTheme.colors.modes.dark,
        text: '#E4E7EB',
        link: '#4293bf',
        background: '#1D2025',
        muted: '#2f3a4c'
      }
    }
  },
  fontSizes: [12, 14, 16, 16, 20, 22, 26, 34],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  borderRadius: {
    ...chronoblogTheme.borderRadius,
    card: 6,
    button: 6,
    search: 6,
    code: 6,
    img: 6,
    authorBanner: 6
  },
  borderWidth: {
    ...chronoblogTheme.borderWidth,
    card: 2,
    search: 2
  },
  fonts: {
    ...chronoblogTheme.fonts,
    body: 'Open Sans, Merriweather, Georgia, sans-serif',
    heading: 'Montserrat, Merriweather, Georgia, sans-serif',
    monospace: 'Menlo, monospace'
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  }
};
