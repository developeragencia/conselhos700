// SIMPLE DEPLOYMENT CONFIGURATION
// Prevents any database detection during deployment

module.exports = {
  deployment: {
    type: 'static',
    database: false,
    migrations: false,
    build: false
  },
  server: {
    entry: 'clean-server.js',
    port: process.env.PORT || 5000
  }
};