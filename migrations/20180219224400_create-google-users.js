
exports.up = function (knex, Promise) {
    return knex.schema.createTable("google_users", (table) => {
        table.increments();
        table.string("firstname");
        table.string("lastname");
        table.string("gmail");
        table.string("googleid");
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("google_users");
};
