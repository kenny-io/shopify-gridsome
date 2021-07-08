<template>
  <div class="product-card">
    <div class="product-card-frame">
      <g-link :to="`/products/${product.handle}`">
        <img
          class="prodimg"
          :src="featuredImage"
          :alt="featuredImage.altText"
        />
      </g-link>
    </div>
    <div class="product-card-text">
      <h3 class="product-card-title">{{ product.title }}</h3>
      <p class="product-card-description">{{ shortDescription }}</p>
    </div>
    <g-link :to="`/products/${product.handle}`">
      <button>View Item ></button>
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    featuredImage() {
      return this.product.images;
    },
    shortDescription() {
      return this.product.description.substring(0, 60) + "...";
    },
  },
};
</script>
