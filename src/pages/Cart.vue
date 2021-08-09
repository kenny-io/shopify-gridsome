<template>
  <Layout>
    <template>
      <main class="cart-page">
        <article class="cart-page-content">
          <h1>Your Cart</h1>
          <div v-if="cartItems.length > 0">
            <CartTable />
            <CartTotal />
          </div>
          <section v-else>
            <p class="cart-page-message">Your cart is empty, fill it up!</p>
            <g-link to="/" class="cart-page-button is-dark">
              Back to Products
            </g-link>
          </section>
        </article>
      </main>
    </template>
  </Layout>
</template>

<script>
import CartTable from "../components/CartTable.vue";
import CartTotal from "../components/CartTotal.vue";
export default {
  metaInfo: {
    title: "Cart",
  },
  components: {
    CartTable,
    CartTotal,
  },
  data() {
    return {
      cart: "",
      cartItems: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      currency: "",
    };
  },
  mounted() {
    // get all the cart details we need from localStorage
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.cartItems = this.cart.lines.edges;
    this.subtotal = this.cart.estimatedCost.subtotalAmount.amount;
    this.currency = this.cart.estimatedCost.subtotalAmount.currencyCode;
    this.total = this.cart.estimatedCost.totalAmount.amount;
    this.tax = this.cart.estimatedCost.totalTaxAmount.amount || 0;
  },
  methods: {
    itemTotal(price, quantity) {
      const totalPrice = Number(price) * Number(quantity);
      return totalPrice.toFixed(2);
    },
    async removeItem(lineId) {
      // remove item from Shopify cart
      const removeItemFromCart = await fetch(
        "/.netlify/functions/remove-from-cart",
        {
          method: "POST",
          body: JSON.stringify({
            cartId: this.cart.id,
            lineId,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => data);

      // update localStorage;

      localStorage.setItem("cartId", removeItemFromCart.id);
      localStorage.setItem("cart", JSON.stringify(removeItemFromCart));
      window.location.reload(true);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #e5eaef;
}
</style>
