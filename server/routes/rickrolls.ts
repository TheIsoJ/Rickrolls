import express, { Request, Response, Router } from "express";
const router: Router = express.Router()

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

type RickrollBody = {
    name: string,
    description: string,
    link: string
}

router.get("/rickrolls", async (req: Request, res: Response) => {
    const apiKey: any = req.query.api_key

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const rickrolls = await prisma.rickroll.findMany()

        res.status(200).json({
            rickrolls
        })
    } else {
        res.status(401).json({
          message: "Et voi tehdä tätä toimintoa."
        })
      }
})

router.get("/rickrolls/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id
    const apiKey: any = req.query.api_key

    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });

    if (apiKey === user.api_key) {
        const rickroll = await prisma.rickroll.findFirst({
            where: {
                id
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
    try {
        const {
            name,
            description,
            link
        }: RickrollBody = req.body
    
        const rickroll = await prisma.rickroll.create({
            data: {
                name,
                description,
                link,
                rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
            }
        })
    
        return res.status(200).json({
            success: true,
            statusCode: res.statusCode,
            data: rickroll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: res.statusCode,
            message: error
        })
    }
})

export default router