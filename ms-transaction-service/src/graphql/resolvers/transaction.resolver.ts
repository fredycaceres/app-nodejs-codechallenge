import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  TransactionInput,
  TransactionModel,
} from '../models/transaction.model';
import { TransactionService } from '../../transaction/services/transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private readonly service: TransactionService) {}

  @Query(() => [TransactionModel])
  async getTransaction() {
    return this.service.find();
  }

  @Mutation(() => TransactionModel, { nullable: true })
  async createTransaction(
    @Args('createTransactionInput')
      transactionInput: TransactionInput,
  ) {
    await this.service.create(transactionInput);
  }
}