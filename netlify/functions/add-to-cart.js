const { createCartWithItem } = require("./utils/createCartWithItem");
const { addItemToCart } = require("./utils/addItemToCart");

exports.handler = async (event) => {
  let { cartId, itemId, quantity } = JSON.parse(event.body);
  quantity = parseInt(quantity);

  if (cartId) {
    const shopifyResponse = await addItemToCart({
      cartId,
      itemId,
      quantity,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(shopifyResponse.cartLinesAdd.cart),
    };
  } else {
    const createCartResponse = await createCartWithItem({
      itemId,
      quantity,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(createCartResponse.cartCreate.cart),
    };
  }
};
