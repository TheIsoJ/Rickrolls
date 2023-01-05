import express from "express";
const router = express.Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Stripe } from "stripe"
import { DefaultPrice } from "../../types/DefaultPriceProps.js";

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

    const {
      id: priceId,
      unit_amount: price,
      recurring: {
        interval
      }
    }: DefaultPrice = product.default_price as Stripe.Price

    return res.status(200).json({
      statusCode: res.statusCode,
      product: {
        name: product.name,
        description: product.description,
        priceId: priceId,
        price: price,
        images: product.images,
        interval: "month"
      },
    })
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }

});

export default router;
