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
          <p>
            If you've added an item and don't see it yet! refresh the page!
            (localStorage) 🤦🏽‍♂️
          </p>
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
      await fetch("/.netlify/functions/remove-from-cart", {
        method: "POST",
        body: JSON.stringify({
          cartId: this.cart.id,
          lineId,
        }),
      });

      // remove item from localStorage
      let newCart = this.cart.lines.edges.filter(
        (item) => item.node.id !== lineId
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      console.log(newCart);
      this.cart = localStorage.getItem("cart");
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
