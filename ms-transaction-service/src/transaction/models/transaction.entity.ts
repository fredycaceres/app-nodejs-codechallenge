import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum TransactionStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;
  @Column()
  status: TransactionStatus;
  @Column()
  type: number;
  @Column()
  value: number;
  @Column()
  createdAt: Date;
}