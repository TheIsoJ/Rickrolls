import { PrismaClient } from "@prisma/client"
import slugify from "slugify"
const prisma = new PrismaClient()

async function seed() {
    const name = "Tutoriaali"
    
    await prisma.rickroll.deleteMany()
    await prisma.user.deleteMany()

    await prisma.rickroll.create({
        data: {
            name,
            description: "Tämä on yksi niistä harvoista tutoriaaleista, jota et ikinä ole katsonut.\n\nEhkä. Ehkä et. Emme tiedä. Mutta anna palaa, katso tämä tutoriaali, niin opit jotain uutta.",
            link: "https://www.youtube.com/watch?v=UfUbBWIFdJs",
            videoId: "UfUbBWIFdJs",
            slug: slugify.default(name, {
                lower: true,
                locale: "fi",
                trim: true,
                strict: true
            }),
            rickroll_cta_link: "https://i.ytimg.com/vi/UfUbBWIFdJs/maxresdefault.jpg"
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