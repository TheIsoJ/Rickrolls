-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `api_key` VARCHAR(191) NOT NULL,
    `stripe_secret_key` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rickroll` (
    `id` VARCHAR(191) NOT NULL,
    `name` LONGTEXT NOT NULL,
    `description` LONGTEXT NULL,
    `link` LONGTEXT NOT NULL,
    `rickroll_cta_link` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `name` LONGTEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `image` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
