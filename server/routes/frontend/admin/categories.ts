import express, { Request, Response } from "express";
const router = express.Router()

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

type CategoryBody = {
    id: string
    name: string
    description: string
}

router.get("/categories", async (req, res) => {
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
                description: true
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

router.get("/categories/:id", async (req, res) => {
    const id: string = req.params.id
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const category = await prisma.category.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                description: true,
            }
        })

        res.status(200).json({
            category
        })
    } else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        })
    }
})

router.post("/categories", async (req: Request, res: Response) => {
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
                description
            }: CategoryBody = req.body

            if (name === "" || name == null) {
                res.status(400).json({
                    message: "Nimi vaaditaan."
                })
            }

            await prisma.category.create({
                data: {
                    name,
                    description
                }
            })

            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                message: "Onnistui, kategoria on nyt lisätty."
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

router.put("/categories/:id", async (req, res) => {
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
            }: CategoryBody = req.body

            if (name === "" || name == null) {
                res.status(400).json({
                    message: "Nimi vaaditaan."
                })
            }

            const category = await prisma.category.update({
                where: { id },
                data: {
                    name,
                    description,
                },
                select: {
                    name: true,
                    description: true,
                }
            })

            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                category
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

router.delete("/categories/:id", async (req, res) => {
    const id: string = req.params.id
    const apiKey: string = req.query.api_key as string

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {

        try {
            await prisma.category.delete({
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
                message: "Onnistui, kategoria on nyt poistettu."
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