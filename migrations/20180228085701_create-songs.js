
exports.up = function (knex, Promise) {
    return knex.schema.createTable("songs", (table) => {
        table.increments();
        table.integer('google-users_id').unsigned();
        table.foreign('google-users_id').references('google_users.id');
        table.string("title");
        table.string("duration");
        table.string("path");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("songs");
};
