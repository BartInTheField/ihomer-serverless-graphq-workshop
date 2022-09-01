# crypto-exchange-serverless-workshop

## Prerequisites

### Node

Make sure you have installed a version of Node 16. Node can be installed via: https://nodejs.org/en/download/

### Serverless

After installing Node we should install the serverless framework. This can be done by
running `npm install -g serverless`. You can check if the installation was successful by running `sls -v`. Any version
above `3.0.0` should be fine.

### Docker

Make sure to install Docker Desktop. We will use this to run a local instance of DynamoDb. DynamoDb is a NoSQL database
service in AWS.

The Docker website has some great resources: https://www.docker.com/getByWalletId-started.

_NOTE: To use Docker on Windows, you need to enable Hyper-V in BIOS. Every BIOS has its own way to do this. It is also
known as virtualization._

### Useful for the excercises

- [Serverless framework documentation](https://www.serverless.com/framework/docs/)

### Create a `.env` file in the `sls` directory

```dotenv
DYNAMO_URL='http://localhost:8000'
REGION='eu-central-1'
AWS_ACCESS_KEY_ID='fake-id'
AWS_SECRET_ACCESS_KEY='fake-key'
```

Because we are developing locally, real AWS credentials are not needed.

## Setup

We will start by creating a local "cryptocurrency wallet". This wallet will run in a local DynamoDb instance. The
instance will be used by the locally run serverless application to store your personal wallet information. The
serverless application will also use an online API to validate requests to the "cryptocurrency exchange".

### Setting up dynamo

The DynamoDb instance can be started by running `docker-compose up` inside the `sls` directory. This will run both the
instance and an admin GUI on:

```
dynamodb-local: http://localhost:8000
dynamodb-admin: http://localhost:8001
```

_TIP: You can use `docker-compose up -d` to run the Docker container detached. This way, you won't have to open a new terminal
for other command line commands._

With the DynamoDb instance started we should create three tables.

* Navigate to the admin GUI on http://localhost:8001.
* Hit the 'Create table' button.

#### Wallet table
* Fill in the form
    * Table Name = wallets
    * Hash Attribute Name = pk
    * Hash Attribute Type = String

#### Coin table
* Fill in the form
    * Table Name = coins
    * Hash Attribute Name = pk
    * Hash Attribute Type = String

#### Profile table
* Fill in the form
    * Table Name = profiles
    * Hash Attribute Name = pk
    * Hash Attribute Type = String

### Running the serverless backend

To run the serverless application, install all project dependencies with the `npm install` command, from inside the `sls` directory. Then, run `sls offline start`. This will start the serverless backend locally and it will mock the AWS services we are using. You will notice that the program will emit logs. Why this is happening, will become clear in the next step.

_NOTE: If you are using Powershell, the `sls` command might not work. Use `serverless` instead._

#### GraphQl playground

We are running an offline version of serverless, this exposes a locally ran GraphQl playground. To access it navigate to http://localhost:20002.

### Filling the database 

Before we start we need to fill the database, a mutation is available to reset the database with some data. In the GraphQl playground execute the mutation `resetDatabase()`.

## Exercise 1 - Profile

Try to implement a new query `listProfiles`, return all profiles in our database.

Return 
- pk 
- firstName
- lastName 

_TIP: Look at other Query's and the setup done in `serverless.yml`_

## Exercise 2 - Wallet profile relation

Add the profile relation to the wallet queries.

listWallet
- profile

getWallet
- profile 

## Exercise 3 - Add all relations to profile 

Make sure you can query the wallet of the profile, the coin and the market price.


_TIP: Watch out for relation inception_
