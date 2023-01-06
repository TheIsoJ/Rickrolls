type RickrollsResponseData = {
    rickrolls: Rickroll[]
}

type RickrollResponseData = {
    rickroll: Rickroll
    error: RickrollError
}

type ProductsResponseData = {
    products: Products
}

type ProductResponseData = {
    product: Product
}

// type SessionsResponseData = {
//     sessions: Sessions
// }

// type SessionResponseData = {
//     session: Session
// }

// type Session = {
//     id: string
//     customer_details: {
//         name: string
//     }
// }

// type Sessions = {
//     data: Session[]
// }

type Products = {
    data: Product[]
}

type Rickroll = {
    id?: string
    name: string
    description: string
    link: string
    videoId: string
    rickroll_cta_link?: string
}

type RickrollError = {
    message: string
}

type StripeConfigProps = {
    stripePublicKey: string
}

type SessionProps = {
    id: string
}

type Product = {
    id: string
    priceId: string
    created: number
    name: string
    description: string
    price: number
    interval: "day" | "week" | "month" | "year"
    type: string
    images?: string[]
    default_price: DefaultPrice
}

type DefaultPrice = {
    id: string
    unit_amount: number
    recurring: {
        interval: "day" | "week" | "month" | "year"
    }
    type: string
}