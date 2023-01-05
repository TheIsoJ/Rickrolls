import Stripe from "stripe"

export type DefaultPrice = {
    id: string
} & Stripe.Price