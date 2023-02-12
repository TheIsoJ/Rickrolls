import express from "express";
const router = express.Router()

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

router.get("/rickrolls", async (req, res) => {
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const categories = await prisma.category.findMany({
            select: {
                name: true,
                description: true,
                rickrolls: {
                    select: {
                        slug: true,
                        name: true,
                        description: true,
                        rickroll_cta_link: true,
                        tags: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        })

        res.status(200).json({
            categories
        })
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

router.get("/rickrolls/:slug", async (req, res) => {
    const slug: string = req.params.slug
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const rickroll = await prisma.rickroll.findFirst({
            where: {
                slug
            },
            select: {
                name: true,
                description: true,
                link: true,
                video_id: true,
                rickroll_cta_link: true,
                category: {
                    select: {
                        name: true,
                        description: true
                    }
                },
                tags: true
            }
        })

        res.status(200).json({
            rickroll
        })
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

export default router