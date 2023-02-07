import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
    await prisma.rickroll.deleteMany()
    await prisma.user.deleteMany()

    await prisma.rickroll.create({
        data: {
            name: "Ei jaksa",
            description: "Ei huvita.",
            link: "https://www.youtube.com/watch?v=UfUbBWIFdJs",
            videoId: "UfUbBWIFdJs",
            rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
        }
    })

    await prisma.user.create({
        data: {
           name: "Jesse Keskelä",
           email: "juiceneblueyt@gmail.com",
           api_key: "1A4mgi2rBHCJdqggsYVx",
           username: "@theisoj",
           profile_picture: "https://images.jesunmaailma.ml/rickrolls-api-images/profile-pictures/rickroll.png",
           password: "$2a$12$rpMQmYQeZ0VckYqjBPuBTOqDF2SwR8crRxH9/bTRoyt6nwBdxGRBW",
           stripe_publishable_key: "pk_test_51ML4pRBbS7O9ZyvwBEWZ1SjJzTOIusK9S02J1efJCxG61TeVyygh4Njz7k1qYMVwGBCrEOoIHICC7amMeQxh5zmf00nG7QYZwu",
           stripe_secret_key: process.env.STRIPE_SECRET_KEY
        }
    })
}

seed()