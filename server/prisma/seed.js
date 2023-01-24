import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import dotenv from "dotenv"
dotenv.config()

import slugify from "slugify"

async function main() {
  await prisma.rickroll.deleteMany()
  await prisma.user.deleteMany()

  const slug1 = "Eka rickroll"
  const slug2 = "En keksi mitään, saatana! Android, kerro sä!"

  await prisma.user.create({
    data: {
      id: "fac17925-dd70-4571-9d5c-78e5cfc57d79",
      name: "Jesse Keskelä",
      email: "juiceneblueyt@gmail.com",
      username: "@theisoj",
      api_key: "1A4mgi2rBHCJdqggsYVx",
      profile_picture:
        "https://images.jesunmaailma.ml/rickrolls-api-images/rickroll.jpg",
      password: "$2y$12$5XvO/wJu7JI6EVfBIriEQuVc7QbAYbanNt7ZjnybHqkYhmD8o8MNC",
      stripe_secret_key: process.env.STRIPE_SECRET_KEY,
      stripe_publishable_key:
        "pk_test_51ML4pRBbS7O9ZyvwBEWZ1SjJzTOIusK9S02J1efJCxG61TeVyygh4Njz7k1qYMVwGBCrEOoIHICC7amMeQxh5zmf00nG7QYZwu",
    },
  })

  await prisma.rickroll.createMany({
    data: [
      {
        id: "f56d64a6-f228-4a52-8347-87286de56160",
        name: "Eka rickroll",
        description: "Eka rickroll",
        slug: slugify.default(slug1, {
          locale: "fi",
          lower: true,
          trim: true
        }),
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoId: "dQw4w9WgXcQ",
        rickroll_cta_link:
          "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg",
      },
      {
        id: "50996030-f78b-48db-9561-df533f350fa6",
        name: "En keksi mitään, saatana! Android, kerro sä!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        slug: slugify.default(slug2, {
          locale: "fi",
          lower: true,
          trim: true
        }),
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoId: "dQw4w9WgXcQ",
        rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
      }
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
