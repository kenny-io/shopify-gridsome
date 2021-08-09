<template>
  <section class="cart-total">
    <div class="cart-total-content">
      <div class="cart-total-column">
        <p>
          <strong>Subtotal:</strong>
        </p>
        <p>Shipping:</p>
        <p>Tax:</p>
        <p>Total:</p>
      </div>
      <div class="cart-total-column">
        <p>
          <strong>{{ currency }} {{ subtotal }}</strong>
        </p>
        <p>Free Shipping</p>
        <p>{{ currency }} {{ tax }}</p>
        <p>{{ currency }} {{ total }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  metaInfo: {
    title: "Cart",
  },
  data() {
    return {
      cart: "",
      total: 0,
      subtotal: 0,
      tax: 0,
      currency: "",
    };
  },
  mounted() {
    // get all the cart details we need from localStorage
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.subtotal = this.cart.estimatedCost.subtotalAmount.amount;
    this.currency = this.cart.estimatedCost.subtotalAmount.currencyCode;
    this.total = this.cart.estimatedCost.totalAmount.amount;
    this.tax = this.cart.estimatedCost.totalTaxAmount.amount || 0;
  },
  methods: {},
};
</script>
