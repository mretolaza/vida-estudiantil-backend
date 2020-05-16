const knex = require('../../db');

async function getUser(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('email', 'name');
  return user;
}

async function getPersona(id) {
  const [user] = await knex('users')
    .where('id', id)
    .select('email');
  const [persona] = await knex('persona')
    .where('email', user)
    .select('horas_beca', 'carrera', 'carne', 'genero', 'facultad', 'email');
  return persona;
}

async function updateUserInfo({
  name,
  username: email,
  id,
  horas_beca,
  carrera,
  carne,
  genero,
  facultad,
}) {
  const [user] = await knex('users')
    .where({ id })
    .update({
      name,
      email,
      updated_at: new Date(),
    })
    .returning(['email', 'name']);
  await knex('persona')
    .where({ email })
    .update({
      email,
      horas_beca,
      carrera,
      carne,
      genero,
      facultad,
    });
  return user;
}

module.exports = {
  getUser,
  updateUserInfo,
  getPersona,
};
