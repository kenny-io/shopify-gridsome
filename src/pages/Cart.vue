<template>
  <Layout>
    <template>
      <h1>Your Cart</h1>
      <main>
        <div v-if="cartItems.length > 0">
          <table>
            <thead>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </thead>
            <br />
            <tbody>
              <tr v-for="{ node: item } in cartItems" :key="item.id">
                <td>
                  <g-link :to="`/products/${item.merchandise.product.handle}`">
                    {{ item.merchandise.product.title }} ({{
                      item.merchandise.title
                    }})
                  </g-link>
                </td>
                <td>{{ item.merchandise.priceV2.amount }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  {{
                    itemTotal(item.merchandise.priceV2.amount, item.quantity)
                  }}
                </td>
                <td>
                  <button @click="removeItem(item.id)">Remove Item</button>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <ul>
            <li>Subtotal: {{ currency }} {{ subtotal }}</li>
            <li>Tax: {{ tax }}</li>
            <li>Total: {{ currency }} {{ total }}</li>
          </ul>
        </div>
        <div v-else>
          <p>Your cart is empty, fill it up!</p>
        </div>
        <br />
        <g-link to="/">Back Home</g-link>
      </main>
    </template>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Cart",
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
    this.tax = this.cart.estimatedCost.totalTaxAmount || 0;
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
