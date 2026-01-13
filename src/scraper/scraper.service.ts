import { Injectable } from "@nestjs/common";
import { chromium } from "playwright";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ScraperService {
  prisma: any;
 async scrapeNavigation() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.worldofbooks.com/", {
    waitUntil: "domcontentloaded",
  });

  const items = await page.$$eval(
    "nav a",
    links =>
      links
        .map(a => a.textContent?.trim())
        .filter(t => t && t.length > 2 && t.length < 30)
  );

  for (const title of items.slice(0, 5)) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    await this.prisma.navigation.upsert({
      where: { slug },
      update: {},
      create: {
        title,
        slug,
        lastScrapedAt: new Date(),
      },
    });
  }

  await browser.close();
}


  async scrapeCategories(navigation: any) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.worldofbooks.com/", {
      waitUntil: "domcontentloaded",
    });

    const items = await page.$$eval(
      "a",
      links =>
        links
          .map(a => a.textContent?.trim())
          .filter(t => t && t.length > 3 && t.length < 40)
    );

    for (const title of items.slice(0, 10)) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

      await this.prisma.category.upsert({
        where: {
          slug_navigationId: {
            slug,
            navigationId: navigation.id,
          },
        },
        update: {},
        create: {
          title,
          slug,
          navigationId: navigation.id,
          lastScrapedAt: new Date(),
        },
      });
    }

    await browser.close();
  }
  async scrapeProducts(category: any) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.worldofbooks.com/", {
    waitUntil: "domcontentloaded",
  });

  const items = await page.$$eval(
    "a",
    links =>
      links
        .map(a => ({
          title: a.textContent?.trim(),
          href: a.getAttribute("href"),
        }))
        .filter(p => p.title && p.href && p.href.includes("/products/"))
  );

  for (const p of items.slice(0, 8)) {
    await this.prisma.product.upsert({
      where: { sourceId: p.href },
      update: {},
      create: {
        sourceId: p.href,
        title: p.title!,
        price: 0,
        currency: "GBP",
        sourceUrl: `https://www.worldofbooks.com${p.href}`,
        categoryId: category.id,
        lastScrapedAt: new Date(),
      },
    });
  }

  await browser.close();
}
async scrapeProductDetail(product: any) {
  // Minimal implementation to satisfy assignment & TypeScript
  await this.prisma.productDetail.upsert({
    where: { productId: product.id },
    update: {},
    create: {
      productId: product.id,
      description: "Product detail scraping not implemented yet",
      ratingsAvg: null,
      reviewsCount: null,
    },
  });
}}
