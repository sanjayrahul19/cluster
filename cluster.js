import express from "express";
import cluster from "cluster";
import os from "os";

const app = express();
const PORT = process.env.PORT || 8000;
const cpu = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid}`);
  cluster.fork();
  cluster.fork();
} else {
  console.log(`worker ${process.pid} started`);
  app.listen(PORT, () => {
    console.log(`server is up and running`);
  });
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/slow-page", (req, res) => {
  for (let i = 0; i < 6000000000; i++) {}
  res.send("Slow Page");
});

// app.get("/", (req, res) => {
//   res.send(`ok ${process.pid}`); //process identification number on a Linux or Unix-like operating system.
//   //   cluster.worker.kill();
// });

// // if (cluster.isMaster) {
// //   for (let i = 0; i < cpu; i++) {
// //     cluster.fork(); //collection of small child processes (" workers ") of a single parent process in Node
// //   }
// //   cluster.on("exit", (worker) => {
// //     console.log(`worker${worker.process.pid}died`);
// //     // cluster.fork();
// //   });
// // } else {

// // }
