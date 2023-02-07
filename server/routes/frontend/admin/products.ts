import express, { Request, Response } from "express"
const router = express.Router()

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { Stripe } from "stripe"
import { DefaultPrice } from "../../../types/DefaultPriceProps.js"

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
        active: product.active,
        interval
      },
    })
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }

});

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
        active
      }: SubscriptionBody = req.body

      if (name === "" || name == null) {
        res.status(400).json({
          message: "Nimi vaaditaan."
        })
      } else if (description === "" || description == null) {
        res.status(400).json({
          message: "Kuvaus vaaditaan."
        })
      } else if (price === "" || price == null) {
        res.status(400).json({
          message: "Hinta vaaditaan."
        })
      }

      await stripe.products.create({
        name,
        description: description ?? null,
        active,
        default_price_data: {
          currency: "eur",
          recurring: {
            interval: "month"
          },
          unit_amount: (parseInt(price) / 100)
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

router.put("/products/:id", async (req, res) => {
  const apiKey: string = req.query.api_key as string
  const id: string = req.params.id

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
        active
      }: SubscriptionBody = req.body

      if (name === "" || name == null) {
        res.status(400).json({
          message: "Nimi vaaditaan."
        })
      }

      if (description === "" || description == null) {
        res.status(400).json({
          message: "Kuvaus vaaditaan."
        })
      }

      const updatedProduct = await stripe.products.update(id, {
        name,
        description,
        active,
      })

      return res.status(200).json({
        statusCode: res.statusCode,
        data: updatedProduct,
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

router.delete("/products/:id", async (req, res) => {
  const apiKey: string = req.query.api_key as string
  const id: string = req.params.id

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

      const deletedProduct = await stripe.products.del(id)

      return res.status(200).json({
        statusCode: res.statusCode,
        message: `Onnistui, tuote ID #${deletedProduct.id} on nyt poistettu.`,
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
