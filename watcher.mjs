import chokidar from "chokidar";
import { exec } from "child_process";

let isRunning = false;

const watcher = chokidar.watch(["*.html", "*.css", "*.js"], {
  ignored: "node_modules",
  persistent: true
});

watcher.on("change", (path) => {
  if (isRunning) return;

  isRunning = true;
  console.log(`Changed: ${path}`);

  exec(
    'git add . && git diff --cached --quiet || git commit -m "auto commit on save" && git push origin main',
    (error, stdout, stderr) => {
      if (error) console.log(error.message);
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      isRunning = false;
    }
  );
});

console.log("Watching files..ffff.");