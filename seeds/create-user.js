
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('local_users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('local_users').insert(
        [{
          "password":"testp",
          "account": "test"
        }]

      );
    });
};
