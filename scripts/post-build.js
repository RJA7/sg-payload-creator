const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "../build/index.html");
const fileData = fs.readFileSync(filePath, "utf-8");

fs.writeFileSync(filePath, fileData.replaceAll("/static", "static"));
