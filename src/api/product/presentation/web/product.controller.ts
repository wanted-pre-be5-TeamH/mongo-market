import { Account } from '@ACCOUNT/domain';
import { AccountPublic } from '@ACCOUNT/provider/decorator/account.decorator';
import { Public } from '@ACCOUNT/provider/decorator/public.decorator';
import { Role } from '@ACCOUNT/provider/decorator/role.decorator';
import {
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductUsecase } from '@PRODUCT/application/adapter/product.usecase';
import { IProductUsecase } from '@PRODUCT/application/port/product.usecase.port';
import helper from 'nestia-helper';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(ProductUsecase)
    private readonly productUsecase: IProductUsecase,
  ) {}

  @Public()
  @Get()
  findMany(
    @Query('store_id') store_id?: string,
    @Query('category') category?: string,
    @Query('country') country?: string,
    @Query('order') order?: string,
  ) {
    return this.productUsecase.findMany(
      {
        store_id,
        category,
        country,
      },
      { order },
    );
  }

  @Public()
  @Get(':product_id')
  findOne(@helper.TypedParam('product_id', 'string') id: string) {
    return this.productUsecase.findOne({ id });
  }

  @Role('Seller')
  @Post()
  create(
    @AccountPublic() account: Account.Public,
    @helper.TypedBody() body: IProductUsecase.Create,
  ) {
    const { name, description, category, country, price } = body;
    return this.productUsecase.create(account, {
      name,
      description,
      category,
      country,
      price,
    });
  }

  @Role('Seller')
  @Patch(':product_id')
  update(
    @AccountPublic() account: Account.Public,
    @helper.TypedParam('product_id', 'string') id: string,
    @helper.TypedBody() body: IProductUsecase.Update,
  ) {
    const { name, description, price, country } = body;
    return this.productUsecase.update(
      account,
      { id },
      { name, description, price, country },
    );
  }

  @Role('Seller')
  @Delete(':product_id')
  remove(
    @AccountPublic() account: Account.Public,
    @helper.TypedParam('product_id', 'string') id: string,
  ) {
    return this.productUsecase.remove(account, { id });
  }
}
