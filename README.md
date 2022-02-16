# Layla's Birthday Spectacular

### React Setup

Ya know the drill ;)

\*\*\* Make sure you are using Node 14 to work with amplify. Use `NVM` to switch versions

1. `git clone git@github.com:nstranquist/laylasbirthday.git`
2. `yarn install`
3. `yarn start` will not work until you have configured amplify

### Configuring Amplify

1. `amplify configure --appId d1s4mgfbl9l4c5 --envName staging` will connect your aws profile and region correctly
2. `amplify pull --appId d1s4mgfbl9l4c5 --envName staging` to sync up your changes
   - `amplify pull` will work after your first time configuring. Do this before working, like a `git pull`
3. `amplify push` to push your changes up to the cloud. We have `staging` and `production` environments so don't worry about pushing broken code, just try not to :p

### Authentication

Auth is handled by AWS Cognito and additonal user data is stored in AWS DynamoDB.
It will all be handled by a separate set of apis and lambdas, called `AdminQueries`, to take care of new account signup and authentication.

### API

We are going to be using a service called `APIGateway` to set up our apis, and they will be `GraphQL` APIs because that shit is hot these days and is conveniently flexible for us to make `queries`, `mutations`, and `subscriptions` with graphql that interface with AWS services

### Database(s): DynamoDB

will update when more information is ready

### Lambdas

will fill more in here when appropriate
