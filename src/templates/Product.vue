<template>
  <Layout>
    <template>
      <div
        style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;"
      >
        <div
          style="
        margin-bottom: 20px;
        padding: 0 10px;"
        >
          <g-image
            style="
            max-width: min(100%, 500px);
            border-radius: 10px;"
            alt="product image"
            :src="`${this.$page.product.images}`"
          >
          </g-image>
        </div>
        <div
          style="
        padding: 0 10px;
        max-width: 500px;"
        >
          <h4>{{ this.$page.product.title }}</h4>
          <p style="margin: 20px 0;">{{ this.$page.product.description }}</p>
          <button
            style="
          padding: 10px;
          background: transparent;
          border-radius: 10px;
          border: 2px solid #fff;
          color: #fff;
          font-size: 1em;"
          >
            Add to Cart
          </button>
        </div>
      </div>
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
export default {
  metaInfo() {
    return {
      title: `Buy ${this.$page.product.title}`,
    };
  },
};
</script>
