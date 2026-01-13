import { Module } from "@nestjs/common";
import { CategoryController } from "./category/category.controller";
import { NavigationController } from "./navigation/navigation.controller";
import { ScraperService } from "./scraper/scraper.service";
import { PrismaService } from "./prisma.service";

@Module({
  controllers: [
    NavigationController,
    CategoryController,
  ],
  providers: [ScraperService, PrismaService],
})
export class AppModule {}
