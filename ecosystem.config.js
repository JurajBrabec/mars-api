module.exports = {
  apps: [
    {
      name: 'api',
	  cwd: './api',
      script: './api.js',
      time: true,
      watch: '.',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
