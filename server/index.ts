// Clean server without migrations
process.env.DISABLE_DRIZZLE = 'true';
process.env.NO_MIGRATIONS = 'true'; 
console.log('Starting clean server...');
// @ts-ignore - Dynamic import of JS file
import('../clean-server.js');
