type RickrollsResponseData = {
    categories: Categories[]
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

type CategoryResponseData = {
    category: Category
}

type CategoriesResponseData = {
    categoryOptions: CategoryOptions[]
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

type Categories = {
    id?: string
    name: string
    description?: string
    rickrolls: Rickroll[]
}

type Category = {
    id?: string
    name: string
    description?: string
}

type CategoryOptions = {
    label: string
    value: string
}

type Rickroll = {
    id?: string
    name?: string
    description?: string
    link?: string
    slug?: string
    video_id?: string
    imageUrl?: string
    tags?: string[]
    category?: Category
}

type RickrollDataBody = {
    name?: string
    description?: string
    videoId?: string
    link?: string
    imageUrl?: string
    categoryId: string
}

type SubscriptionBody = {
    name?: string
    description?: string
    price?: string
    active?: boolean
}

type CategoryBody = {
    name: string
    description?: string
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
    active?: boolean
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