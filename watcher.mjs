import chokidar from "chokidar";
import { exec } from "child_process";
import readline from "readline";

let running = false;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const watcher = chokidar.watch(".", {
  ignored: ["node_modules", ".git"],
  persistent: true
});

watcher.on("change", (path) => {
  if (running) return;

  running = true;
  console.log(`\nFile changed: ${path}`);

  rl.question("Enter commit message: ", (message) => {
    const command = `git add . && git commit -m "${message}" && git push origin main`;

    exec(command, (error, stdout, stderr) => {
      if (error) console.log(error.message);
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);

      running = false;
    });
  });
});

console.log("Watching files...");