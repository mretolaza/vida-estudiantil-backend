exports.up = async function up(knex) {
  await knex.schema.createTable('persona', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['user_job_pkey']);
    table.integer('horas_beca');
    table.string('carrera', 150);
    table.string('genero', 1);
    table.integer('carne');
    table.string('facultad', 100);
    table
      .string('email', 60)
      .references('email')
      .inTable('users');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('persona');
};
