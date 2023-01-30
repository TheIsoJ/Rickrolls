import express, { Request, Response } from "express"
const router = express.Router()

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { Stripe } from "stripe"

router.post("/luo-uusi-itsepalvelu-sessio", async (req: Request, res: Response) => {
    const apiKey: any = req.query.api_key
    const sessionId: any = req.query.session_id

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
            const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId as any)
            const billingPortalSession = await stripe.billingPortal.sessions.create({
                customer: checkoutSession.customer as string,
                return_url: `${process.env.CLIENT_URL}/tili`
            })

            res.redirect(billingPortalSession.url)
        } catch (err) {
            res.status(500).json({
                message: "Pieleen meni."
            })
        }
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

export default router
