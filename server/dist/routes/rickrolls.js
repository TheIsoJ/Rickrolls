import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
router.get("/rickrolls", async (req, res) => {
    const apiKey = req.query.api_key;
    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });
    if (apiKey === user.api_key) {
        const rickrolls = await prisma.rickroll.findMany();
        res.status(200).json({
            rickrolls
        });
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
router.get("/rickrolls/:id", async (req, res) => {
    const id = req.params.id;
    const apiKey = req.query.api_key;
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
        });
        res.status(200).json({
            rickroll
        });
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
router.post("/rickrolls", async (req, res) => {
    try {
        const { name, description, link } = req.body;
        const rickroll = await prisma.rickroll.create({
            data: {
                name,
                description,
                link,
                rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
            }
        });
        return res.status(200).json({
            success: true,
            statusCode: res.statusCode,
            data: rickroll
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: res.statusCode,
            message: error
        });
    }
});
export default router;
//# sourceMappingURL=rickrolls.js.map