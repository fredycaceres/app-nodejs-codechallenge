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

Query to get a transaction by id 

```
{
  getTransactionById(id: "8959c4b2-54f5-4839-98a7-1c4bfc906236") {
    id
    status
    type
    value
    createdAt
  }
}
```

I also modified the Dockerfile to fix some Kafka errors (The images were not optimized for Apple arm64)

# To run the project:

```
docker compose up
```

```
cd ms-transaction-service
yarn install
yarn start:dev
```

```
cd ms-antifraud-service
yarn install
yarn start:dev
```

Open the graphql playground to make graphql requests

# Load testing

Install k6
On MacOS
```
brew install k6
```
Run this command on the base directory
```
k6 run k6.js
```
