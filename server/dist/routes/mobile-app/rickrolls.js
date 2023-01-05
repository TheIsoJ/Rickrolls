import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET-pyynnöt
router.get("/rickrolls", async (req, res) => {
    const apiKey = req.query.api_key;
    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });
    if (apiKey === user.api_key) {
        const rickrolls = await prisma.rickroll.findMany({
            select: {
                name: true,
                description: true,
                rickroll_cta_link: true,
                slug: true
            }
        });
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
router.get("/rickrolls/:slug", async (req, res) => {
    const slug = req.params.slug;
    const apiKey = req.query.api_key;
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
                videoId: true,
                rickroll_cta_link: true
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
// POST-pyynnöt
router.post("/rickrolls", async (req, res) => {
    const apiKey = req.query.api_key;
    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });
    if (apiKey === user.api_key) {
        try {
            const { name, description, videoId, link } = req.body;
            const rickroll = await prisma.rickroll.create({
                data: {
                    name,
                    description,
                    slug: name
                        .replace(" ", "-")
                        .replace("å", "a")
                        .replace("ä", "a")
                        .replace("ö", "o")
                        .toLowerCase(),
                    link,
                    videoId,
                    rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
                }
            });
            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                message: "Onnistui, rickroll on nyt lisätty."
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: res.statusCode,
                message: error
            });
        }
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
router.delete("/rickrolls/:id", async (req, res) => {
    const id = req.params.id;
    const apiKey = req.query.api_key;
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
            });
            return res.status(200).json({
                success: true,
                statusCode: res.statusCode,
                message: "Onnistui, rickroll on nyt poistettu."
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: res.statusCode,
                message: error
            });
        }
    }
    else {
        res.status(401).json({
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
export default router;
//# sourceMappingURL=rickrolls.js.map