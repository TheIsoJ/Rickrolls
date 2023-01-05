import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
router.get("/config/get-stripe-config", async (req, res) => {
    const apiKey = req.query.api_key;
    const user = await prisma.user.findFirst({
        where: {
            api_key: apiKey
        }
    });
    if (apiKey === user.api_key) {
        res.status(200).json({
            stripePublicKey: user.stripe_publishable_key
        });
    }
    else {
        res.status(401).json({
            statusCode: res.statusCode,
            message: "Et voi tehdä tätä toimintoa."
        });
    }
});
export default router;
//# sourceMappingURL=getStripeConfig.js.map