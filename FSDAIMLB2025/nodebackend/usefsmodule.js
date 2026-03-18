const fs = require("fs").promises;

// write file
async function writeData() {
  await fs.writeFile("demo.txt", "Hello from Node FS Module");
  return "File written successfully";
}

// read file
async function readData() {
  const data = await fs.readFile("demo.txt", "utf-8");
  return data;
}

// delete file
async function deleteFile() {
  await fs.unlink("demo.txt");
  return "File deleted successfully";
}

// async read example
async function fileReadAsync() {
  const data = await fs.readFile("demo.txt", "utf-8");
  return data;
}

module.exports = { writeData, readData, deleteFile, fileReadAsync };
