type RickrollBody = {
    name: string
    description: string
    videoId: string
    link: string
}

type SubscriptionBody = {
    name: string
    description?: string
    price: string
    active?: boolean
    images?: string[]
}

type CreateCheckoutSessionBody = {
    priceId: string
    productId: string
}

type UsersBody = {
    name: string
    email: string
}