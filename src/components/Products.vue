<template>
  <div class="product-grid">
    <ProductCard
      v-for="product in this.filteredProductList"
      :key="product.node.id"
      :product="product.node"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  computed: {
    filteredProductList() {
      if (this.$route.query.type) {
        return this.$page.products.edges.filter(
          (product) => product.node.productType === this.$route.query.type
        );
      } else {
        return this.$page.products.edges;
      }
    },
  },
};
</script>
