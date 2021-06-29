<template>
  <Layout>
    <template>
      <Products />
    </template>
  </Layout>
</template>

<page-query>
query{
  products: allProduct{
    edges{
      node{
        id,
        title,
        description,
        handle,
        images,
        priceRange{
          maxVariantPrice{
            amount
          }
          minVariantPrice{
            currencyCode
          }
        },
        variants{
          node{
            id 
            title
            quantityAvailable
            priceV2{
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Products from "@/components/Products.vue";
export default {
  metaInfo: {
    title: "Cheese and meat shop",
  },
  components: {
    Products,
  },
};
</script>
