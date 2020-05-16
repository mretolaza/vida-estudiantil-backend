const knex = require('../../db');
const bcrypt = require('bcrypt');

async function updateUserPassword({
    id,
    newPassword
  }) {
    const hashedPass = await bcrypt.hash(newPassword, 5);
    const [user] = await knex('users')
      .where({ id })
      .update({
        password: hashedPass,
        updated_at: new Date(),
      })
      .returning(['email', 'name']);
    return user;
  }
  
  module.exports = {
    updateUserPassword,
    
  };