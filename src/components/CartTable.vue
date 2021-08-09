<template>
  <table class="cart-table">
    <thead>
      <th class="cart-table-heading">Item</th>
      <th class="cart-table-heading">Price</th>
      <th class="cart-table-heading">Quantity</th>
      <th class="cart-table-heading">Total</th>
      <th class="cart-table-heading">Actions</th>
    </thead>
    <tbody>
      <tr
        v-for="{ node: item } in cartItems"
        :key="item.id"
        class="cart-table-row"
      >
        <td class="cart-table-cell">
          <g-link :to="`/products/${item.merchandise.product.handle}`">
            {{ item.merchandise.product.title }} ({{ item.merchandise.title }})
          </g-link>
        </td>
        <td class="cart-table-cell">
          {{
            formatCurrency(
              item.merchandise.priceV2.amount,
              item.merchandise.priceV2.currencyCode
            )
          }}
        </td>
        <td class="cart-table-cell">{{ item.quantity }}</td>
        <td class="cart-table-cell">
          {{ itemTotal(item.merchandise.priceV2.amount, item.quantity) }}
        </td>
        <td class="cart-table-cell">
          <button @click="removeItem(item.id)">Remove Item</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { formatCurrency } from "../../utils/currency";
export default {
  metaInfo: {
    title: "Cart",
  },
  data() {
    return {
      cart: "",
      cartItems: [],
    };
  },
  mounted() {
    // get all the cart details we need from localStorage
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.cartItems = this.cart.lines.edges;
  },
  methods: {
    formatCurrency,
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
      location.reload();
    },
  },
};
</script>
