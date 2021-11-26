exports.up = function (knex) {
  return knex.schema.createTable("role", (table) => {
    table.increments("id");
    table.string("code").notNullable().unique();
    table.string("description");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("role");
};
