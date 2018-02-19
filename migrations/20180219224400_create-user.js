
exports.up = function (knex, Promise) {
    return knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("firstname");
        table.string("lastname");
        table.string("email");
        table.string("googleid");
        table.string("facebookid");

        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("users");
};
