import { PrismaClient } from "@prisma/client"
import slugify from "slugify"
const prisma = new PrismaClient()

async function seed() {
  const name1 = "Tutoriaali"
  const name2 = "Joku saatanan taikatemppu"

  await prisma.category.deleteMany()
  await prisma.rickroll.deleteMany()
  await prisma.user.deleteMany()

  const category1 = await prisma.category.create({
    data: {
      id: "7332da11-374d-4450-9ff5-85f4f29768b1",
      name: "Vittumaiset memet",
      description: "Aika lailla vittumaiset memet niin kuin Sohvaperunoissa.",
    },
  })

  const category2 = await prisma.category.create({
    data: {
      id: "ef578ef4-c3b8-4df0-b0b7-84c9d4b452ed",
      name: "YouTube-memet",
      description: "Aika lailla vittumaiset memet niin kuin YouTubessa.",
    },
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
      rickroll_cta_link: "https://i.ytimg.com/vi/UfUbBWIFdJs/maxresdefault.jpg",
      tags: ["Meemi", "Ei jaksa"],
      category: {
        connect: {
          id: category1?.id
        }
      }
    },
  })

  await prisma.rickroll.create({
    data: {
      name: name2,
      description:
        "Nyt ei ole sitä vitun motivaatiota kirjoittaa tähän mitään saatanan kuvausta. Tulen päivittämään myöhemmin.",
      link: "https://www.youtube.com/watch?v=4m0XXBeH6Uk",
      video_id: "4m0XXBeH6Uk",
      slug: slugify.default(name2, {
        lower: true,
        locale: "fi",
        trim: true,
        strict: true,
      }),
      rickroll_cta_link: "https://i.ytimg.com/vi/4m0XXBeH6Uk/maxresdefault.jpg",
      tags: ["Ei jaksa"],
      category: {
        connect: {
          id: category2?.id
        }
      }
    },
  })

  await prisma.user.create({
    data: {
      name: "Jesse Keskelä",
      email: "juiceneblueyt@gmail.com",
      api_key: "1A4mgi2rBHCJdqggsYVx",
      username: "@theisoj",
      profile_picture:
        "https://images.jesunmaailma.ml/rickrolls-api-images/profile-pictures/rickroll.png",
      password: "$2a$12$rpMQmYQeZ0VckYqjBPuBTOqDF2SwR8crRxH9/bTRoyt6nwBdxGRBW",
      stripe_publishable_key:
        "pk_test_51ML4pRBbS7O9ZyvwBEWZ1SjJzTOIusK9S02J1efJCxG61TeVyygh4Njz7k1qYMVwGBCrEOoIHICC7amMeQxh5zmf00nG7QYZwu",
      stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    },
  })
}

seed()
