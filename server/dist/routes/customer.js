import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Stripe } from "stripe";
router.get("/customers", async (req, res) => {
    const apiKey = req.query.api_key;
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
        const sessions = await stripe.checkout.sessions.list();
        return res.status(200).json({
            statusCode: res.statusCode,
            sessions
        });
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
router.get("/customer/:id", async (req, res) => {
    const apiKey = req.query.api_key;
    const customerId = req.params.id;
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
        const session = await stripe.checkout.sessions.retrieve(customerId);
        return res.status(200).json({
            statusCode: res.statusCode,
            session
        });
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
export default router;
//# sourceMappingURL=customer.js.map