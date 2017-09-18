// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/raspberry'

  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl-true'
  }
};
