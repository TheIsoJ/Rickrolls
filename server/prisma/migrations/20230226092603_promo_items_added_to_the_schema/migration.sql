-- CreateTable
CREATE TABLE "PromoItems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "backdropUrl" TEXT NOT NULL,

    CONSTRAINT "PromoItems_pkey" PRIMARY KEY ("id")
);
