-- CreateTable
CREATE TABLE "Rickroll" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "rickroll_cta_link" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Rickroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "api_key" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profile_picture" TEXT,
    "password" TEXT,
    "stripe_secret_key" TEXT,
    "stripe_publishable_key" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
