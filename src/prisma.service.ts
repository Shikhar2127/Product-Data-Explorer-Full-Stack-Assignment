import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  private _category: any;
  public get category(): any {
    return this._category;
  }
  public set category(value: any) {
    this._category = value;
  }
    private _product: any;
  public get product(): any {
    return this._product;
  }
  public set product(value: any) {
    this._product = value;
  }
    private _productDetail: any;
  public get productDetail(): any {
    return this._productDetail;
  }
  public set productDetail(value: any) {
    this._productDetail = value;
  }
  async onModuleInit() {
    await this.$connect();
  }
}