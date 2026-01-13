/*
  Warnings:

  - The primary key for the `productdetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `productdetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `productdetail` DROP FOREIGN KEY `ProductDetail_productId_fkey`;

-- DropIndex
DROP INDEX `ProductDetail_productId_key` ON `productdetail`;

-- AlterTable
ALTER TABLE `product` MODIFY `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `productdetail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `description` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`productId`);

-- AddForeignKey
ALTER TABLE `ProductDetail` ADD CONSTRAINT `ProductDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
