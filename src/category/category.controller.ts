import { Controller, Get, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ScraperService } from "../scraper/scraper.service";

@Controller("categories")
export class CategoryController {
  constructor(
    private prisma: PrismaService,
    private scraper: ScraperService
  ) {}

  @Get(":slug")
  async getCategories(@Param("slug") slug: string) {
    const navigation = await this.prisma.navigation.findUnique({
      where: { slug },
    });

    if (!navigation) {
      return [];
    }

    let categories = await this.prisma.category.findMany({
      where: { navigationId: navigation.id },
    });

    // If not scraped yet → scrape now
    if (categories.length === 0) {
      await this.scraper.scrapeCategories(navigation);
      categories = await this.prisma.category.findMany({
        where: { navigationId: navigation.id },
      });
    }

    return categories;
  }
}
