import express, { Request, Response } from "express"
const router = express.Router()

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

router.get("/get-stripe-config", async (req: Request, res: Response) => {
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        res.status(200).json({
            stripePublicKey: user.stripe_publishable_key
        })
    } else {
        res.status(401).json({
            statusCode: res.statusCode,
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

export default router