import express from "express";
const router = express.Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Stripe } from "stripe"

router.get("/customers", async (req, res) => {
  const apiKey: string = req.query.api_key as string

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

    const customers = await stripe.customers.list()

    return res.status(200).json({
      statusCode: res.statusCode,
      customers
    })
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }

});

router.get("/customer/:id", async (req, res) => {
  const apiKey: string = req.query.api_key as string
  const customerId: string = req.params.id

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

    const customer = await stripe.customers.retrieve(customerId as string)

    return res.status(200).json({
      statusCode: res.statusCode,
      customer
    })
  } else {
    res.status(401).json({
      message: "Et voi tehdä tätä toimintoa."
    })
  }

});

export default router;
