// PRODUCTION DEPLOYMENT ENTRY POINT
// Uses clean-server.js directly without any database dependencies

const { exec } = require('child_process');

console.log('🚀 STARTING PRODUCTION DEPLOYMENT');
console.log('📦 Clean server mode - No migrations needed');

// Force clean deployment mode
process.env.NODE_ENV = 'production';
process.env.DEPLOYMENT_MODE = 'clean';

// Start the clean server
exec('node clean-server.js', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Production start error:', error);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});