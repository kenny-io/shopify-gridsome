<template>
  <header class="app-header">
    <h1>Shoperoni</h1>
    <nav class="main-nav">
      <ul>
        <li class="main-nav-item">
          <g-link exact to="/">All</g-link>
        </li>
        <li class="main-nav-item">
          <g-link to="/?type=cheese">Cheeses</g-link>
        </li>
        <li class="main-nav-item">
          <g-link to="/?type=meat">Meats</g-link>
        </li>
        <li class="main-nav-item">
          <g-link to="/?type=boards">Boards</g-link>
        </li>
        <li class="main-nav-item">
          <div v-if="count > 0" class="cart-size">{{ count }}</div>
          <g-link to="/cart">Cart</g-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      count: "",
      cart: "",
    };
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    if (this.cart) {
      this.count = this.cart.lines.edges.length;
    }
  },
};
</script>
