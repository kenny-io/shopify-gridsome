<template>
  <div>
    <h1>Shoperoni</h1>
    <p>Shop for literally the best products in the world, right here.</p>
    <main>
      <div class="products">
        <ul class="products">
          <li
            v-for="product in $page.products.edges"
            class="product"
            :key="product.node.id"
          >
            <a :href="`/products/${product.node.id}`">
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1,
p {
  text-align: center;
  color: #e5eaef;
}
</style>
