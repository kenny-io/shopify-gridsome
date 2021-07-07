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
            price
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
    title: "Shoperoni",
  },
  components: {
    Products,
  },
};
</script>
