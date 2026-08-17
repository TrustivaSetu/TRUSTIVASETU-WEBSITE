module.exports = {
  apps: [{
    name: 'trustivasetu-website',
    script: 'npm',
    args: 'start -- -p 3001',
    cwd: '/home/ubuntu/trustivasetu-website',
    max_memory_restart: '400M',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
