import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Store } from '@STORE/domain';

@Schema({
  id: true,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class StoreEntity implements Store.Property {
  id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop(
    raw({
      id: Number,
      username: String,
    }),
  )
  seller!: Store.SellerEntity;

  @Prop({ required: true })
  description!: string;

  created_at!: Date;

  updated_at!: Date;
}

export const StoreSchema = SchemaFactory.createForClass(StoreEntity);
