import { BaseEntity } from '@COMMON/base/base-entity.mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Store } from '@STORE/domain';

@Schema({
  id: true,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class StoreEntity
  extends BaseEntity<Store.Id>
  implements Store.Property
{
  @Prop({ required: true })
  name!: string;

  @Prop(
    raw({
      id: String,
      username: String,
    }),
  )
  seller!: Store.SellerEntity;

  @Prop({ required: true })
  seller_id!: Store.SellerId;

  @Prop({ required: true })
  description!: string;
}

export const StoreSchemaName = 'stores';
export const StoreSchema = SchemaFactory.createForClass(StoreEntity);
