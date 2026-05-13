const fs = require("node:fs");
const path = require("node:path");

function readDotenv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return env;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        return env;
      }

      let key = trimmedLine.slice(0, separatorIndex).trim();
      if (/^export\s+/i.test(key)) {
        key = key.replace(/^export\s+/i, "").trim();
      }
      const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

      if (key) {
        env[key] = value;
      }

      return env;
    }, {});
}

const dotenv = readDotenv(path.join(__dirname, ".env"));

module.exports = {
  apps: [
    {
      name: "maritrack",
      script: "server.js",
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      env: {
        ...dotenv,
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: process.env.PORT || dotenv.PORT || 3000,
      },
    },
  ],
};
