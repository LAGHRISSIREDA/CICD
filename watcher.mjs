import chokidar from "chokidar";
import { exec } from "child_process";

let running = false;

const watcher = chokidar.watch(".", {
  ignored: ["node_modules", ".git"],
  persistent: true
});

watcher.on("all", (event, path) => {
  console.log(event, path);

  if (!["change", "add"].includes(event)) return;
  if (running) return;

  running = true;

  exec(
    'git add . && git diff --cached --quiet || (git commit -m "auto commit on save" && git push origin main)',
    (error, stdout, stderr) => {
      if (error) console.log(error.message);
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      running = false;
    }
  );
});

console.log("Watching files...");