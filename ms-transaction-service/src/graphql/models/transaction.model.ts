import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionModel {
  @Field()
  id: string;
  @Field(() => Int)
  status: number;
  @Field(() => Int)
  type: number;
  @Field(() => Int)
  value: number;
  @Field()
  createdAt: Date;
}

@InputType()
export class TransactionInput {
  @Field()
  accountExternalIdDebit: string;
  @Field()
  accountExternalIdCredit: string;
  @Field(() => Int)
  transferTypeId: number;
  @Field(() => Int)
  value: number;
}