module.exports = {
  apps: [
    {
      name: 'api',
	  cwd: './api',
      script: './index.js',
      time: true,
      watch: './api',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
