exports.up = function (knex) {
  return knex.schema.createTable("rel", (table) => {
    table.uuid("user_id");
    table.integer("role_id");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rel");
};
