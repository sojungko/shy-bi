const fs = require('fs');

// if .env exists, remove before re-building new one
if (fs.existsSync('.env')) {
  fs.unlinkSync('.env');
}

// large debug env var!!!
const debugVar = require('./debug').join(',');

const staticEnvVars = fs.readFileSync('.env.static');

fs.writeFileSync('.env', staticEnvVars);
fs.appendFileSync('.env', `\nDEBUG=${debugVar}`);

