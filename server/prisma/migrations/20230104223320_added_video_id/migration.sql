/*
  Warnings:

  - Added the required column `videoId` to the `Rickroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rickroll` ADD COLUMN `videoId` LONGTEXT NOT NULL;
