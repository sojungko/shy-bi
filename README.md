# shy-bi

## Synopsis

A dating app for shy bi-sexuals and bi-curious people. Uses React for fast performance and Neo4j for relational data storage.

## Motivation

Researchers say bi-sexuals are less likely to come out because they are afraid of being perceived as "confused." ShyBi hopes to provide a safe place for these individuals so they may explore their sexual identity without fear of judgment.


## Get Started

### Neo4j

If you don't have `neo4j` installed locally, make sure to install it. On MacOS, you can run `brew install neo4j`. If brew throws an error concerning an unmet requirement, install that one, too (brew will let you know which ones).

```shell
brew services start neo4j
```

Head on over to `http://localhost:7474/browser/` from your browser. The initial password for the username `neo4j` is `neo4j`. Enter that password and change the password when prompted. Store these information in your `.env`

```
# .env
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neo4j
```

### Dependencies

```shell
# if using npm
npm i

# if using yarn
yarn
```

### Start Server

```shell
# if using npm
npm run dev

# if using yarn
yarn dev
```

## What Works Currently

- Signing up
- Logging in
- Editing profile
- Searching and filtering users by age and sex

This app has been significantly revamped from its previous state in the following ways

1. Introduced `nextjs` to enable server-side rendering. Previously, everything was being client-side-rendered.
2. Tore out almost all `material-ui` styling and replaced it with custom `scss`.
3. Fixed the backend that was storing user properties as relationship data

```
// previously
MERGE (userCity: City {name: {city}})
MERGE (userAge: Age {age: {age}})
MERGE (userSex: Sex {sex: {sex}})

MERGE (newUser)-[:LIVES_IN]->(userCity)
MERGE (newUser)-[:YEARS_OLD]->(userAge)
MERGE (newUser)-[:MEMBER_OF]->(userSex)

// now
MATCH (user:User {username: {username}})
SET
user.name = {name},
user.email = {email},
user.birthday = date({birthday}),
user.edLevel = {edLevel},
user.aboutMe = {aboutMe},
user.sex = {sex}
```
4. Enables reading cookies to render authenticated pages server-side.
5. Reconcile data type discrepancies between neo4j and JavaScript using a custom function (See [this Github issue](https://github.com/neo4j/neo4j-javascript-driver/issues/225) for details). Essentially, JS was not able to parse 64-bit integer data being stored in neo4j.
```js
// server/utils/convert.js

function intsToNumbers(object) {
  const newObj = {};
  for (const key in object) {
    const value = object[key];
    if (neo4j.isInt(value)) {
      const newVal = value.toNumber();
      newObj[key] = newVal;
    }
  }
  return newObj;
}
```
6. Removed a lot of dead code and no-longer-used reducers and actions.


## Roadmap

This app is obviously still in bad shape! The following will need to be fixed.

1. Routing to user profile pages
2. Liking, unliking
3. Matching
4. Messaging
5. Recommending --> this is the coolest feature about this app!
