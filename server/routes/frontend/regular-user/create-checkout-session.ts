import express from "express"
const router = express.Router()

import { Stripe } from "stripe"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

router.post("/luo-uusi-sessio", async (req, res) => {
    const apiKey: any = req.query.api_key
    const { priceId }: CreateCheckoutSessionBody = req.body

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    })
    const stripeSecret = user.stripe_secret_key

    if (apiKey === user.api_key) {
        const stripe = new Stripe(stripeSecret, {
            apiVersion: "2022-11-15"
        })

        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    }
                ],
                payment_method_types: ["card"],
                mode: "subscription",
                success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_URL}/payment/cancel`
            })
            res.redirect(303, session.url)
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message)
        }
    } else {
        res.status(401).json({
            message: "Et voi suorittaa tätä toimintoa."
        })
    }
})

export default router