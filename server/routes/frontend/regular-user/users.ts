import express, { Request, Response } from "express";
const router = express.Router()

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

router.get("/users", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            profile_picture: true,
            username: true,
            api_key: true
        }
    })

    res.status(200).json({
        users
    })
})

router.get("/users/:username", async (req: Request, res: Response) => {
    const username: string = req.params.username

    const user = await prisma.user.findFirst({
        where: {
            username
        },
        select: {
            id: true,
            name: true,
            email: true,
            profile_picture: true,
            username: true
        }
    })

    res.status(200).json({
        user
    })
})

export default router