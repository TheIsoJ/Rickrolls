import express from "express"
const router = express.Router()

import { PrismaClient } from "@prisma/client"
import slugify from "slugify"
const prisma = new PrismaClient()

// GET-pyynnöt
router.get("/rickrolls", async (req, res) => {
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const rickrolls = await prisma.category.findMany({
            select: {
                name: true,
                description: true,
                rickrolls: {
                    select: {
                        name: true,
                        description: true,
                        imageUrl: true,
                        slug: true,
                        tags: true
                    }
                },
            }
        })

        res.status(200).json({
            rickrolls
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
                video_id: true,
                imageUrl: true,
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

// POST-pyynnöt

router.post("/rickrolls", async (req, res) => {
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {

        try {
            const {
                name,
                description,
                videoId,
                imageUrl,
                link
            }: RickrollBody = req.body

            if (name === "" || name == null) {
                res.status(400).json({
                    message: "Nimi vaaditaan."
                })
            } else if (videoId === "" || videoId == null) {
                res.status(400).json({
                    message: "Videon ID vaaditaan."
                })
            } else if (link === "" || link == null) {
                res.status(400).json({
                    message: "Linkki vaaditaan."
                })
            } else if (imageUrl === "" || imageUrl == null) {
                res.status(400).json({
                    message: "Kuva vaaditaan."
                })
            }

            await prisma.rickroll.create({
                data: {
                    name,
                    description,
                    slug: slugify.default(name, {
                        lower: true,
                        locale: "fi",
                        trim: true,
                        strict: true
                    }),
                    link,
                    video_id: videoId,
                    imageUrl: imageUrl
                }
            })

            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                message: "Onnistui, rickroll on nyt lisätty."
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: res.statusCode,
                message: error
            })
        }
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

router.delete("/rickrolls/:id", async (req, res) => {
    const id: string = req.params.id
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {

        try {
            await prisma.rickroll.delete({
                where: {
                    id
                }
            })

            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                message: "Onnistui, rickroll on nyt poistettu."
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: res.statusCode,
                message: error
            })
        }
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

export default router