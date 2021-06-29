// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// import Vuex from "vuex";
import DefaultLayout from "~/layouts/Default.vue";
import "~/assets/styles.css";
export default function(Vue, { appOptions }) {
  // Set default layout as a global component
  // Vue.use(Vuex);
  Vue.component("Layout", DefaultLayout);

  // appOptions.store = new Vuex.Store({
  //   state: {
  //     cart: [{ id: 0 }],
  //   },
  //   mutations: {
  //     addItem(state, item) {
  //       state.cart.push(item);
  //     },
  //   },
  // });
}
