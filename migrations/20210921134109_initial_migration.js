exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema.createTable("user", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").unique();
    table.string("work_email").unique();
    table.string("position");
    table.string("date_of_birth");
    table.string("phone").unique();
    table.string("social_card_no");
    table.string("password");
    table.string("photo");
    table.string("salary");
    table.string("hashingVerify").unique();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
