import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './application/adapter/product.service';
import { ProductUsecase } from './application/adapter/product.usecase';
import {
  ProductSchema,
  ProductSchemaName,
} from './infrastructure/adapter/product.entity';
import { ProductEntityMapper } from './infrastructure/adapter/product.mapper';
import { ProductRepository } from './infrastructure/adapter/product.repository';
import { ProductController } from './presentation/web/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSchemaName, schema: ProductSchema },
    ]),
  ],
  providers: [
    ProductEntityMapper,
    ProductRepository,
    ProductService,
    ProductUsecase,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
