
exports.up = function (knex, Promise) {
    return knex.schema.createTable("local_users", (table) => {
        table.increments();
        table.string("firstname");
        table.string("lastname");
        table.string('email')
        table.string("password");
        table.timestamps(true, false);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("local_users");
};
