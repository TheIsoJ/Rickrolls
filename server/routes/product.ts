import express from "express";
const router = express.Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Stripe } from "stripe"

router.get("/products/:id", async (req, res) => {
  const id: string = req.params.id;
  const apiKey: any = req.query.api_key

  const user = await prisma.user.findFirst({
    where: {
      api_key: apiKey
    }
  });

  const stripeSecret = user.stripe_secret_key

  if (apiKey === user.api_key) {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2022-11-15"
    })

    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"]
    })

    return res.status(200).json({
      statusCode: res.statusCode,
      product,
    })
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }

});

export default router;
