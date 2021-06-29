const { postToShopify } = require("./utils/postToShopify");

exports.handler = async (event) => {
  // Parse the form submission
  const { selectedProduct, quantity } = JSON.parse(event.body);
  /*
  product ID's are invalid at the moment, if you're seeing this,
  it's best to hard code it at the moment!

  const merchandiseId = selectedProduct.id;
  
  */

  const merchandiseId =
    "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTc0NDA5ODA0MjA2Mg==";
  const itemQuantity = Number(quantity);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  // Add to a shopify cart (creating one if required)
  try {
    const response = await postToShopify({
      query: `
        mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
              id
              createdAt
              updatedAt
              lines(first:10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          id
                          title
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: {
        cartInput: {
          lines: [
            {
              quantity: itemQuantity,
              merchandiseId,
            },
          ],
        },
      },
    });

    // console.log(response);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
  }
};
