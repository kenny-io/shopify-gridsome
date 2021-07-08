<template>
  <Layout>
    <template>
      <main class="product-page">
        <article>
          <section class="product-page-content">
            <div>
              <img
                class="product-page-image"
                :src="product.images"
                :alt="product.altText"
              />
            </div>
            <div>
              <h1>{{ product.title }}</h1>
              <p>{{ product.description }}</p>
              <form method="POST" @submit.prevent="addToCart">
                <div
                  v-if="product.variants.length > 1"
                  class="product-page-price-list"
                >
                  <div
                    v-for="{ node: variant } in product.variants"
                    :key="variant.id"
                    class="product-page-price"
                  >
                    <input
                      :id="variant.id"
                      v-model="selectedProductId"
                      type="radio"
                      name="merchandiseId"
                      :value="variant.id"
                      :disabled="variant.quantityAvailable === 0"
                    />
                    <label :for="variant.id">
                      {{ variant.title }} - {{ price(variant.price) }}
                      <span v-if="variant.quantityAvailable > 10"
                        >(10+ left)</span
                      >
                      <span v-else-if="variant.quantityAvailable > 0">
                        (Only {{ variant.quantityAvailable }} left)
                      </span>
                      <span v-else> (Bummer. It's sold out!) </span>
                    </label>
                  </div>
                </div>
                <div v-else class="product-page-price is-solo">
                  {{ price(product.variants[0].node.price) }}
                  <span v-if="product.variants[0].node.quantityAvailable > 10">
                    (10+ left)
                  </span>
                  <span
                    v-else-if="product.variants[0].node.quantityAvailable > 0"
                  >
                    (Only {{ product.variants[0].node.quantityAvailable }} left)
                  </span>
                  <span v-else> (Bummer. It's sold out!) </span>
                </div>
                <div class="product-page-quantity-row">
                  <input
                    class="product-page-quantity-input"
                    type="number"
                    name="quantity"
                    value="1"
                    min="1"
                    :max="product.variants[0].node.quantityAvailable"
                    v-model="quantity"
                  />

                  <button type="submit" class="button purchase">
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </section>
        </article>
        <!-- <div class="product-page">
          <div class="product-img">
            <g-image alt="product image" :src="`${product.images}`"> </g-image>
          </div>
          <div class="product-copy">
            <h4>{{ product.title }}</h4>
            <p>{{ product.description }}</p>

            <div v-if="product.variants.length > 1">
              <form>
                <div v-for="variant in product.variants" :key="variant.node.id">
                  <input
                    type="radio"
                    :id="`${variant.node.id}`"
                    :value="variant.node.id"
                    name="radiobutton"
                    v-model="selectedProduct"
                  />
                  <label :for="`${variant.node.id}`">
                    {{ variant.node.title }} -
                    {{ price(variant.node.price) }}
                    ( Only {{ variant.node.quantityAvailable }} left )
                  </label>
                </div>
              </form>
              <br />
            </div>

            <div v-else>
              <p>
                {{ price(product.variants[0].node.price) }}
                <span v-if="product.variants[0].node.quantityAvailable > 10">
                  (10+ left)
                </span>
                <span
                  v-else-if="product.variants[0].node.quantityAvailable > 0"
                >
                  (Only {{ product.variants[0].node.quantityAvailable }} left)
                </span>
                <span v-else> (Bummer. It's sold out!) </span>
              </p>
            </div>

            <label for="quantity">Select quantity </label>
            <input
              name="Quantity"
              id="quantity"
              type="number"
              value="1"
              min="1"
              :max="product.variants[0].node.quantityAvailable"
              v-model="quantity"
            />
            <br /><br />
            <button @click.prevent="addToCart">
              Add to Cart
            </button>
          </div>
        </div> -->
      </main>
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
    handle,
    variants{
      node{
        id
        title
        quantityAvailable
        price
      }
    },
    priceRange{
      maxVariantPrice{
        amount
        currencyCode
      }
      minVariantPrice{
        currencyCode
        amount
      }
    }
  }
}
</page-query>

<script>
const fetch = require("node-fetch");
export default {
  metaInfo() {
    return {
      title: `Buy ${this.product.title}`,
    };
  },
  data() {
    return {
      selectedProduct: "",
      quantity: 1,
      cartId: null,
    };
  },
  computed: {
    product() {
      return this.$page.product;
    },
  },
  mounted() {
    this.selectedProduct = this.product.variants[0].node.id;
  },

  methods: {
    async addToCart() {
      const addToCartResponse = await fetch("/.netlify/functions/add-to-cart", {
        method: "POST",
        body: JSON.stringify({
          cartId: localStorage.getItem("cartId"),
          itemId: this.selectedProduct,
          quantity: this.quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => data);

      // save cart to localStorage
      localStorage.setItem("cartId", addToCartResponse.id);
      localStorage.setItem("cart", JSON.stringify(addToCartResponse));
      window.location.reload(true);
    },
    price(itemPrice) {
      const amount = Number(itemPrice).toFixed(2);
      return amount + " " + "USD";
    },
  },
};
</script>
