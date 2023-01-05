import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Stripe } from "stripe";
router.post("/payments/payment-sheet/:id", async (req, res) => {
    const apiKey = req.query.api_key;
    const id = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });
    const stripeSecret = user.stripe_secret_key;
    if (apiKey === user.api_key) {
        const stripe = new Stripe(stripeSecret, {
            apiVersion: "2022-11-15"
        });
        const product = await stripe.products.retrieve(id);
        const price = await stripe.prices.retrieve(product.default_price);
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create({
            customer: customer.id
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price.unit_amount,
            currency: "eur",
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true
            }
        });
        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: user.stripe_publishable_key
        });
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
export default router;
//# sourceMappingURL=paymentSheet.js.map