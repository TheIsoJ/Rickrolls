import { config } from "dotenv"
config()

import { PrismaClient } from "@prisma/client"
import slugify from "slugify"
const prisma = new PrismaClient()

async function seed() {
  const name1 = "Tutoriaali"
  const name2 = "Mielenterveys Reiskattu 100%"
  const name3 = "Jonnet ei muista"
  const imageUrl = "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"

  await prisma.category.deleteMany()
  await prisma.promoItems.deleteMany()
  await prisma.rickroll.deleteMany()
  await prisma.user.deleteMany()

  const category1 = await prisma.category.create({
    data: {
      id: "7332da11-374d-4450-9ff5-85f4f29768b1",
      name: "Meemit",
      description: "YouTuben kaikki meemit.",
    },
  })

  const category2 = await prisma.category.create({
    data: {
      id: "ef578ef4-c3b8-4df0-b0b7-84c9d4b452ed",
      name: "Tutoriaalit",
      description: "YouTuben kaikki tutoriaalit.",
    },
  })

  await prisma.promoItems.create({
    data: {
      id: "55f3122e-37fa-4915-83b1-62e6827d9988",
      name: "\"Huono peli.exe\" on parasta tavaraa.",
      description: null,
      link: "https://rickrolls.vercel.app/meemit/mielenterveys-reiskattu-100percent",
      imageUrl,
      backdropUrl: imageUrl
    }
  })

  await prisma.rickroll.create({
    data: {
      name: name1,
      description:
        "Tämä on yksi niistä harvoista tutoriaaleista, jota et ikinä ole katsonut.\n\nEhkä. Ehkä et. Emme tiedä. Mutta anna palaa, katso tämä tutoriaali, niin opit jotain uutta.",
      link: "https://www.youtube.com/watch?v=UfUbBWIFdJs",
      video_id: "UfUbBWIFdJs",
      slug: slugify.default(name1, {
        lower: true,
        locale: "fi",
        trim: true,
        strict: true,
      }),
      imageUrl: "https://i.ytimg.com/vi/UfUbBWIFdJs/maxresdefault.jpg",
      tags: ["Tutoriaalit"],
      category: {
        connect: {
          id: category2?.id
        }
      }
    },
  })

  await prisma.rickroll.create({
    data: {
      name: name2,
      description:
        "Nyt ei ole sitä motivaatiota kirjoittaa tähän mitään kuvausta.\n\nTulen päivittämään myöhemmin.",
      link: "https://www.youtube.com/watch?v=4m0XXBeH6Uk",
      video_id: "4m0XXBeH6Uk",
      slug: slugify.default(name2, {
        lower: true,
        locale: "fi",
        trim: true,
        strict: true,
      }),
      imageUrl: "https://i.ytimg.com/vi/4m0XXBeH6Uk/maxresdefault.jpg",
      tags: ["Meemit"],
      category: {
        connect: {
          id: category1?.id
        }
      }
    },
  })
  
  await prisma.rickroll.create({
    data: {
      name: name3,
      description:
        "Katso vaikka.",
      link: "https://www.youtube.com/watch?v=e3uFs_AanMU",
      video_id: "e3uFs_AanMU",
      slug: slugify.default(name3, {
        lower: true,
        locale: "fi",
        trim: true,
        strict: true,
      }),
      imageUrl: "https://i.ytimg.com/vi/e3uFs_AanMU/maxresdefault.jpg",
      tags: ["Meemit"],
      category: {
        connect: {
          id: category1?.id
        }
      }
    },
  })

  await prisma.user.create({
    data: {
      name: "Jesse Keskelä",
      email: "juiceneblueyt@gmail.com",
      api_key: process.env.API_KEY,
      username: "@theisoj",
      profile_picture:
        "https://images.jesunmaailma.ml/rickrolls-api-images/profile-pictures/rickroll.png",
      password: process.env.USER_PASSWORD,
      stripe_publishable_key:
        "pk_test_51ML4pRBbS7O9ZyvwBEWZ1SjJzTOIusK9S02J1efJCxG61TeVyygh4Njz7k1qYMVwGBCrEOoIHICC7amMeQxh5zmf00nG7QYZwu",
      stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    },
  })
}

seed()
