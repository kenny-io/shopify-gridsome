<template>
  <Layout>
    <template>
      <card>
        <g-image style="max-width: 200px" :src="`${this.$page.product.images}`">
        </g-image>
        <h4>{{ this.$page.product.title }}</h4>
        <div>{{ this.$page.product.description }}</div>
        <button>
          Add to cart
        </button>
        <v-spacer></v-spacer>
      </card>
    </template>
  </Layout>
</template>

<page-query>
query Products($id: ID!) {
  product(id: $id) {
    id
    title
    images
    description
    handle
  }
}
</page-query>

<script>
export default {};
</script>
