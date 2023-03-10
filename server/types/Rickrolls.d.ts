type RickrollBody = {
    name: string
    description: string
    videoId: string
    imageUrl: string
    link: string
}

type PromoItemsBody = {
    name: string
    description: string
    link: string
    imageUrl: string
    backdropUrl: string
}

type Tag = {
    id: string
    label: string
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