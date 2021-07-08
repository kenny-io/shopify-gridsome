<template>
  <!-- <div>
    <main>
      <div class="products">
        <ul class="products">
          <li
            v-for="product in $page.products.edges"
            class="product"
            :key="product.node.id"
          >
            <a :href="`/products/${product.node.handle}`">
              <div class="frame">
                <g-image
                  class="prodimg"
                  :alt="`${product.node.altText}`"
                  :src="`${product.node.images}`"
                />
              </div>
              <h2>{{ product.node.title }}</h2>
              <p>{{ product.node.description.substring(0, 60) + "..." }}</p>
            </a>
          </li>
        </ul>
      </div>
    </main>
  </div> -->
  <div class="product-grid">
    <ProductCard
      v-for="product in this.filteredProductList"
      :key="product.node.id"
      :product="product.node"
    />
  </div>

</template>

<script>
import ProductCard from "./ProductCard.vue"
export default {
  components:{
    ProductCard
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

}
</script>
h1,
p {
  text-align: center;
  color: #e5eaef;
}
</style>
