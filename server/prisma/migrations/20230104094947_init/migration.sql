-- CreateTable
CREATE TABLE `Rickroll` (
    `id` VARCHAR(191) NOT NULL,
    `name` LONGTEXT NOT NULL,
    `description` LONGTEXT NULL,
    `link` LONGTEXT NOT NULL,
    `rickroll_cta_link` LONGTEXT NOT NULL,
    `slug` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` LONGTEXT NOT NULL,
    `email` LONGTEXT NULL,
    `api_key` LONGTEXT NOT NULL,
    `username` LONGTEXT NOT NULL,
    `profile_picture` LONGTEXT NULL,
    `password` LONGTEXT NULL,
    `stripe_secret_key` LONGTEXT NULL,
    `stripe_publishable_key` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
