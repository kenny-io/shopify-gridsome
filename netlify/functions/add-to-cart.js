const { createCartWithItem } = require("./utils/createCartWithItem");
const { addItemToCart } = require("./utils/addItemToCart");

exports.handler = async (event) => {
  const { cartId, itemId, quantity } = JSON.parse(event.body);
  const itemQuantity = Number(quantity);

  if (cartId) {
    console.log("--------------------------------");
    console.log("Adding item to existing cart...");
    console.log("--------------------------------");

    const shopifyResponse = await addItemToCart({
      cartId,
      itemId,
      itemQuantity,
    });
    console.log(shopifyResponse);
    return {
      statusCode: 200,
      body: JSON.stringify(shopifyResponse.cartLinesAdd.cart),
    };
  } else {
    console.log("--------------------------------");
    console.log("Creating new cart with item...");
    console.log("--------------------------------");
    const createCartResponse = await createCartWithItem({
      itemId,
      itemQuantity,
    });

    console.log(createCartResponse);

    return {
      statusCode: 200,
      body: JSON.stringify(createCartResponse.cartCreate.cart),
    };
  }
};
