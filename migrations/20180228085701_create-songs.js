
exports.up = function (knex, Promise) {
    return knex.schema.createTable("songs", (table) => {
        table.increments();
        table.string("title");
        table.string("duration");
        table.string("path");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("songs");
};
