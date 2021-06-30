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
          <h4>{{ product.title }}</h4>
          <p style="margin: 20px 0;">{{ this.product.description }}</p>

          <div v-if="this.product.variants.length > 1">
            <form>
              <div
                v-for="variant in this.product.variants"
                :key="variant.node.id"
              >
                <input
                  type="radio"
                  :id="`${variant.node.id}`"
                  :value="variant.node.id"
                  name="radiobutton"
                  v-model="selectedProduct"
                />
                <label :for="`${variant.node.id}`">
                  {{ variant.node.title }} -
                  {{ variant.node.priceV2.currencyCode }}
                  {{ variant.node.priceV2.amount }}
                  --- {{ variant.node.quantityAvailable }} in stock
                </label>
                <br />
              </div>
            </form>
          </div>
          <div v-else>
            <p>
              {{ this.product.variants[0].node.priceV2.currencyCode }}
              {{ this.product.variants[0].node.priceV2.amount }}
            </p>
          </div>
          <label for="quantity">Select quantity </label>
          <input
            style="margin-top: 10px"
            name="Quantity"
            id="quantity"
            type="number"
            value="1"
            v-model="quantity"
          />
          <br /><br />
          <button
            @click.prevent="addToCart"
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
    handle,
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
      localStorage.setItem("cartId", addToCartResponse.id);
      localStorage.setItem("cart", JSON.stringify(addToCartResponse));
      window.location.reload(true);
    },
  },
};
</script>
