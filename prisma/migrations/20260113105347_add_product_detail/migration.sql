-- CreateTable
CREATE TABLE `ProductDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `ratingsAvg` DOUBLE NULL,
    `reviewsCount` INTEGER NULL,

    UNIQUE INDEX `ProductDetail_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductDetail` ADD CONSTRAINT `ProductDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
