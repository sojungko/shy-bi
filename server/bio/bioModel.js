const db = require('../database/config');

module.exports = {
  postBio({ name, email, username, city, age, sex }, callback) {
    console.log(`2) [bioModel.js/postBio] Accessing user database with username: ${username}`);
    return db
      .run(
        `MATCH (user:User {username: {username}})
        SET user.name = {name}, user.email = {email}
        WITH user
        MATCH (user)-[cityRel:LIVES_IN]->(city:City) WHERE NOT city.name = {city}
        MERGE (user)-[:LIVES_IN]->(newCity:City {name: {city}})
        DETACH DELETE cityRel
        WITH user
        MATCH (user)-[ageRel:YEARS_OLD]->(age:Age) WHERE NOT age.age = {age}
        MERGE (user)-[:YEARS_OLD]->(newAge:Age {age: {age}})
        DETACH DELETE ageRel
        WITH user
        MATCH (user)-[sexRel:MEMBER_OF]->(sex:Sex) WHERE NOT sex.sex = 'Chicago'
        MERGE (user)-[:MEMBER_OF]->(newSex:Sex {sex: {sex}})
        DETACH DELETE sexRel`,
        { name, email, username, city, age, sex }
      )
      .then(() => {
        console.log('3) [bioModel.js/postBio] Editing user info in database:');
        db.close();
        return callback();
      })
      .catch((error) => {
        console.log('3) [bioModel.js/postBio] Could not edit user in database : ', error);
        throw error;
      });
  },

  postImage(username, url, callback) {
    console.log(`2) [bioModel.js/postImage] Accessing user database with url: ${url}`);
    return db
     .run(
      `MATCH (user:User{ username: {username} })
      SET user.image_url = {url}
      RETURN user`,
      { username, url }
     )
     .then(({ records }) => {
       db.close();
       console.log('3) [bioModel.js/postImage] Saving image to database:');
       return callback(records);
     })
     .catch((error) => {
       console.error('3) [bioModel.js/postImage] Could not save image to database');
       throw error;
     });
  },
};
