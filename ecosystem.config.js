const fs = require('fs');
const path = require('path');

// Load this app's own env files explicitly, so `pm2 restart --update-env`
// is deterministic no matter what's exported in the invoking shell (root
// fix for cross-app env leakage — see trustiva-lms memory
// infra-env-pollution-pm2-shells). Mirrors Next.js's own precedence:
// .env is the base, .env.production overrides it.
function loadEnvFiles(...filenames) {
  const out = {};
  for (const filename of filenames) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) continue;
    for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      out[key] = value;
    }
  }
  return out;
}

const fileEnv = loadEnvFiles('.env', '.env.production');

module.exports = {
  apps: [{
    name: 'trustivasetu-website',
    script: 'node_modules/.bin/next',
    args: 'start -p 3001',
    cwd: '/home/ubuntu/trustivasetu-website',
    max_memory_restart: '400M',
    env: {
      ...fileEnv,
      NODE_ENV: 'production'
    }
  }]
};
