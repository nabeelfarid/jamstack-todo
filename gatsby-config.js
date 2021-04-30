module.exports = {
  siteMetadata: {
    title: "Jamstack Todos App",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jamstack Todos App`,
        short_name: `Todos`,
        start_url: `/`,
        // background_color: `#f7f0eb`,
        // theme_color: `#a2466c`,
        // display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
  ],
};
