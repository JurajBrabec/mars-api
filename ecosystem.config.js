module.exports = {
  apps: [
    {
      name: 'api',
	  cwd: './api',
      script: './api.js',
      time: true,
      watch: './api',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
