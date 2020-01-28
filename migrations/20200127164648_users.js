
exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
      tbl.increments("id")
      tbl.string("name").notNullable()
      tbl.string("email").notNullable().unique()
      tbl.string("username").notNullable().unique()
      tbl.string("password").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
