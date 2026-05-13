module.exports = {
  apps: [
    {
      name: "maritrack",
      script: "server.js",
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: process.env.PORT || 3000,
      },
    },
  ],
};
