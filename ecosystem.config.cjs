module.exports = {
  apps: [
    {
      name: 'conselhos-esotericos',
      script: 'clean-server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
