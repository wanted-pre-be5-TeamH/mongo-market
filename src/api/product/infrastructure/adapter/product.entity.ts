import { BaseEntity } from '@COMMON/base/base-entity.mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '@PRODUCT/domain';

@Schema({
  id: true,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class ProductEntity
  extends BaseEntity<Product.Id>
  implements Product.Property
{
  @Prop({ required: true })
  category!: Product.Category;

  @Prop({ required: true })
  country!: Product.Country;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  name!: string;

  @Prop(
    raw({
      id: String,
      name: String,
    }),
  )
  store!: Product.StoreEntity;

  @Prop({ required: true })
  store_id!: Product.StoreEntityId;

  @Prop({ required: true })
  description!: string;
}

export const ProductSchemaName = 'products';
export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
