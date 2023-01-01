type RickrollsResponseData = {
    rickrolls: Rickroll[]
}

type RickrollResponseData = {
    rickroll: Rickroll
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
    id: string
    name: string
    description: string
    link: string
    rickroll_cta_link: string
}

type Product = {
    id: string
    created: number
    name: string
    description: string
    default_price?: DefaultPrice
    images?: string[]
}

type DefaultPrice = {
    id: string
    currency: string
    recurring: {
        interval: "day" | "week" | "month" | "year"
    }
    type: string
    unit_amount: number
}