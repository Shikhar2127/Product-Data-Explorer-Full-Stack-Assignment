-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `navigationId` INTEGER NOT NULL,
    `lastScrapedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Category_slug_navigationId_key`(`slug`, `navigationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_navigationId_fkey` FOREIGN KEY (`navigationId`) REFERENCES `Navigation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
