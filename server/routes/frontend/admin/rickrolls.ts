import express, { Request, Response } from "express";
const router = express.Router()

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import slugify from "slugify"

type RickrollBody = {
    name: string
    description: string
    videoId: string
    link: string
    imageUrl: string
    category: string
    categoryId: string
    tags: string[]
}

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
                id: true,
                name: true,
                description: true,
                rickrolls: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        slug: true,
                        rickroll_cta_link: true,
                        tags: true
                    }
                }
            },
            orderBy: {
                id: "desc"
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
                id: true,
                name: true,
                description: true,
                link: true,
                video_id: true,
                category: {
                    select: {
                        name: true,
                        description: true
                    }
                },
                tags: true,
                rickroll_cta_link: true
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

router.post("/rickrolls", async (req: Request, res: Response) => {
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
                link,
                imageUrl,
                category,
                tags
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
            } else if (category === "" || category == null) {
                res.status(400).json({
                    message: "Kategoria vaaditaan."
                })
            } else if (tags.length === 0) {
                res.status(400).json({
                    message: "Tagejä ei ole. Laita ainakin yksi."
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
                    video_id: videoId,
                    link,
                    rickroll_cta_link: imageUrl,
                    tags
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

router.put("/rickrolls/:id", async (req, res) => {
    const id: string = req.params.id
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
                link,
                imageUrl,
                category,
                categoryId,
                tags
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
            } else if (tags.length === 0) {
                res.status(400).json({
                    message: "Tagejä ei ole. Laita ainakin yksi."
                })
            }

            const updateCategory = await prisma.category.update({
                where: {
                    id: categoryId
                },
                data: {
                    name: category
                }
            })

            const rickroll = await prisma.rickroll.update({
                where: { id },
                data: {
                    name,
                    slug: slugify.default(name, {
                        locale: "fi",
                        trim: true,
                        lower: true,
                        strict: true
                    }),
                    description,
                    video_id: videoId,
                    link,
                    rickroll_cta_link: imageUrl,
                    tags,
                    category: {
                        connect: {
                            id: updateCategory?.id
                        }
                    }
                },
                select: {
                    name: true,
                    description: true,
                    video_id: true,
                    link: true,
                    rickroll_cta_link: true,
                    tags: true,
                    category: {
                        select: {
                            name: true,
                            description: true
                        }
                    }
                }
            })

            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                rickroll
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
            success: false,
            statusCode: res.statusCode,
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
                },
                select: {
                    id: true
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