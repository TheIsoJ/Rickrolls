import express from "express"
const router = express.Router()

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// GET-pyynnöt
router.get("/promo-items", async (req, res) => {
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const promoItems = await prisma.promoItems.findMany({
            select: {
                name: true,
                description: true,
                link: true,
                imageUrl: true,
                backdropUrl: true
            }
        })

        res.status(200).json({
            promoItems
        })
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

export default router