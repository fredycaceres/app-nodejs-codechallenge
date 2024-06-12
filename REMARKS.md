Mutation to create transaction

```
mutation {
  createTransaction(createTransactionInput: {
    accountExternalIdDebit: "ad262b93-742f-4d39-800c-6d609fc2ce28",
    accountExternalIdCredit: "ad262b93-742f-4d39-800c-6d609fc2ce45",
    transferTypeId: 6,
    value: 45
  }) {
    id
    status
  }
}
```

Query for all transactions 

```
{
  getTransaction {
    id
    status
    type
    value
    createdAt
  }
}
```

