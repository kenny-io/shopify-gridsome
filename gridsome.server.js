// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fetch = require("node-fetch");
const shopUrl = "https://netlify-demo.myshopify.com";
const storefront_access_token = "b98313b8d60c1d61649070cc78cc41da";

module.exports = function(api) {
  // whitelist vuetify for webpack code here
  api.loadSource(async (actions) => {
    const query = `{
  products(sortKey: TITLE, first: 100) {
    edges {
      node {
        id
        handle
        description
        title
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
      }
    }
  }
}`;

    const products = await fetch(shopUrl + `/api/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": storefront_access_token,
      },
      body: query,
    })
      .then((res) => res.json())
      .then((response) => {
        return response.data.products.edges;
      });

    console.log(products);
    const productData = products.map((prod) => prod.node);
    const collection = actions.addCollection({
      typeName: "Product",
    });
    for (const product of productData) {
      collection.addNode({
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description,
        images: product.images.edges[0].node.src,
        altText: product.images.edges[0].node.altText,
      });
    }
  });
  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
