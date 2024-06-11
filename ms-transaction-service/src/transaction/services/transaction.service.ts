import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateTransactionDTO } from '../models/dto/create-transaction.dto';
import { Transaction, TransactionStatus } from '../models/transaction.entity';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionCreatedEvent } from '../models/event/transaction-created.event';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('KAFKA')
    private readonly eventBus: ClientKafka,
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  async create(data: CreateTransactionDTO): Promise<void> {
    const transaction = new Transaction();
    transaction.id = randomUUID();
    transaction.createdAt = new Date();
    transaction.status = TransactionStatus.PENDING;
    transaction.type = data.transferTypeId;
    transaction.value = data.value;
    await this.repository.save(transaction);
    this.eventBus.emit(
      TransactionCreatedEvent.getName(),
      TransactionCreatedEvent.toEvent(transaction),
    );
  }

  async approveTransaction(id: string): Promise<void> {
    Logger.debug(`Transaction with id ${id} approved`)
    await this.repository.update(
      { id },
      { status: TransactionStatus.APPROVED },
    );
  }

  async rejectTransaction(id: string): Promise<void> {
    Logger.debug(`Transaction with id ${id} rejected`)
    await this.repository.update(
      { id },
      { status: TransactionStatus.REJECTED },
    );
  }

  async find(): Promise<Transaction[]> {
    return this.repository.find();
  }
}