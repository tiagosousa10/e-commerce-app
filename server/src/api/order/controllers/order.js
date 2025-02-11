'use strict';
const { Stripe } = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
  async create(ctx) {
    const {products, userName, email} = ctx.request.body
    console.log("🚀 ~ create ~ products:", products)
    
    try {
      // retrieve item details
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const items = await strapi.service("api::item.item").find({ // fetching the items from the api strapi
            filters: { id: product.id } // filtering the items by id
          });
          const item = items.results && items.results.length > 0 ? items.results[0] : null; //verifying if the item exists
          
          console.log("Fetched item from Strapi:", item); // <- Verifique no terminal

          if (!item) { //verifying if the item exists
            console.error(`Product not found for ID: ${product.id}`);
            throw new Error(`Product with ID ${product.id} not found`);
          }
      
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );
      
      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode:"payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000/",
        line_items: lineItems, // sending the items to the api from lineItems
      })

      console.log("session: ",session)
      // create the item in the database
      await strapi.service("api::order.order").create({
        data: {userName, products, stripeSessionId: session.id}
      })

      //return the stripe session id
      return {id:session.id}
    } catch(error) {
      ctx.response.status = 500
      return {error: {message: "There was a problem with your payment."}}
    }
  }
}));
