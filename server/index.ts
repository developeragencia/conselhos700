// Clean server without migrations
process.env.DISABLE_DRIZZLE = 'true';
process.env.NO_MIGRATIONS = 'true'; 
console.log('Starting clean server...');
import('../clean-server.js');