<template>
  <div>
    <h2>
      Shop from our list of mouth-watery charcuteries
    </h2>
    <div>
      <article v-for="edge in $page.products.edges" :key="edge.node.id">
        <card>
          <g-image
            style="max-width: 200px"
            alt="product image"
            :src="`${edge.node.images}`"
          />
          <h3>{{ edge.node.title }}</h3>
          <p>
            {{ edge.node.description }}
          </p>
          <span>
            <a :href="`/products/${edge.node.id}`">View product</a>
          </span>
        </card>
      </article>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>
export default {};
</script>
