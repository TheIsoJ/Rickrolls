import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
router.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            profile_picture: true,
            username: true,
            api_key: true
        }
    });
    res.status(200).json({
        users
    });
});
router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            profile_picture: true,
            username: true
        }
    });
    res.status(200).json({
        user
    });
});
// router.post("/users", async (req: Request, res: Response) => {
//     try {
//         const apiKey = generateAPIKey(20)
//         const {
//             name,
//             email,
//         }: UsersBody = req.body
//         const user = await prisma.user.create({
//             data: {
//                 name: name,
//                 email: email,
//                 api_key: apiKey,
//                 username
//             }
//         })
//         return res.status(200).json({
//             success: true,
//             statusCode: res.statusCode,
//             data: user
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             statusCode: res.statusCode,
//             message: error
//         })
//     }
// })
export default router;
//# sourceMappingURL=users.js.map