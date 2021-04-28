module.exports = {
  siteMetadata: {
    title: "jamstack-todo",
  },
  plugins: [
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
  ],
};
