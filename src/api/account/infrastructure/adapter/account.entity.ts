import { Account } from '@ACCOUNT/domain';
import { BaseEntity } from '@COMMON/base/base-entity.mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export const AccountErrorMessage = {
  email_unique: '이미 사용중인 이메일입니다.',
  password_regex: '비밀번호는 숫자와 문자로 이루어진 6~12자리 문자열입니다.',
};

@Schema({
  id: true,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class AccountEntity
  extends BaseEntity<Account.Id>
  implements Account.Property
{
  @Prop({ unique: true, required: true })
  email!: string;

  @Prop({ default: false })
  verified!: boolean;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'Normal' })
  role!: Account.Permission;

  @Prop(
    raw({
      id: String,
      name: String,
    }),
  )
  store?: Account.StoreEntity;
}

export const AccountSchemaName = 'accounts';
export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
