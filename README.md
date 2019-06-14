# shy-bi

## Synopsis

A dating app for shy bi-sexuals and bi-curious people. Uses React for fast performance and Neo4j for relational data storage.

## Motivation

Researchers say bi-sexuals are less likely to come out because they are afraid of being perceived as "confused." ShyBi hopes to provide a safe place for these individuals so they may explore their sexual identity without fear of judgment.


## Get Started

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


