<template>
  <footer>
    <section class="testimonial">
      <h2>
        "The interplay of flavors between the cheese, meats and fruits is an
        absolute delight."
      </h2>
      <p>Paul Hotcakes</p>
    </section>
    <footer-links />
    <div class="project-credit">
      <p>
        This project is
        <a href="https://github.com/kenny-io/shopify-gridsome">
          open source on GitHub </a
        >, hosted with <a href="https://bit.ly/2G29YwK">Netlify</a>, built with
        <a href="https://gridsome.org/">Gridsome</a> and made with 💚 by Ekene
        Eze (<a href="https://twitter.com/kenny_io">@kenny_io</a>)
      </p>
    </div>
  </footer>
</template>

<script>
import FooterLinks from "./FooterLinks.vue";
export default {
  components: {
    FooterLinks,
  },
};
</script>
