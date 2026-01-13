import { Controller, Get, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ScraperService } from "../scraper/scraper.service";

@Controller("products")
export class ProductController {
  constructor(
    private prisma: PrismaService,
    private scraper: ScraperService
  ) {}

  @Get(":slug")
  async getProducts(@Param("slug") slug: string) {
    const category = await this.prisma.category.findFirst({
      where: { slug },
    });

    if (!category) return [];

    await this.scraper.scrapeProducts(category);

    return this.prisma.product.findMany({
      where: { categoryId: category.id },
    });
  }

  @Get("detail/:id")
  async getProductDetail(@Param("id") id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) return null;

    await this.scraper.scrapeProductDetail(product);

    return this.prisma.productDetail.findUnique({
      where: { productId: product.id },
    });
  }
}
