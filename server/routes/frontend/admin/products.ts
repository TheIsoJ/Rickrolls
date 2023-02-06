import express, { Request, Response } from "express"
const router = express.Router()

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { Stripe } from "stripe"

router.get("/products", async (req, res) => {
  const apiKey: string = req.query.api_key as string

  const user = await prisma.user.findFirst({
    where: {
      api_key: apiKey
    }
  })

  const stripeSecret = user.stripe_secret_key;

  if (apiKey === user.api_key) {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2022-11-15"
    })

    const products = await stripe.products.list({
      expand: ["data.default_price"]
    })

    return res.status(200).json({
      statusCode: res.statusCode,
      products
    })
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }
})

router.post("/products", async (req: Request, res: Response) => {
  const apiKey: string = req.query.api_key as string

  const user = await prisma.user.findFirst({
    where: {
      api_key: apiKey
    }
  })

  const stripeSecret = user.stripe_secret_key

  if (apiKey === user.api_key) {
    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2022-11-15"
    })

    try {
      const {
        name,
        description,
        price,
        images,
        isActive
      }: SubscriptionBody = req.body

      await stripe.products.create({
        name,
        description: description ?? null,
        images: images ?? null,
        active: isActive,
        default_price_data: {
          currency: "eur",
          recurring: {
            interval: "month"
          },
          unit_amount: price,
          unit_amount_decimal: price.toString()
        },
        
      })

      return res.status(200).json({
        statusCode: res.statusCode,
        message: "Onnistui, uusi tuote on nyt lisätty.",
        status: "success"
      })

    } catch (err) {
      res.status(500).json({
        statusCode: res.statusCode,
        message: "Pieleen meni.",
        technical_info: {
          errorMessage: err.message
        },
        status: "failure"
      })
    }
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }
})

export default router
