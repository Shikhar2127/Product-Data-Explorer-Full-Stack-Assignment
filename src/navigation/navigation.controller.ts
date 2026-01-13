import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ScraperService } from "../scraper/scraper.service";

@Controller("navigation")
export class NavigationController {
  constructor(
    private prisma: PrismaService,
    private scraper: ScraperService
  ) {}

  @Get()
  async getNavigation() {
    const existing = await this.prisma.navigation.findMany();

    if (existing.length === 0) {
      await this.scraper.scrapeNavigation();
      return this.prisma.navigation.findMany();
    }

    return existing;
  }
}
