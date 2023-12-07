const express = require("express");
const { NodeSSH } = require("node-ssh");
require("dotenv").config();
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const sshConfig = {
  host: process.env.SERVER_HOST,
  port: parseInt(process.env.SERVER_PORT),
  username: process.env.SERVER_USERNAME,
  password: process.env.SERVER_PASSWORD,
};

app.get("/api/execute-command", (req, res) => {
  const ssh = new NodeSSH();
  ssh
    .connect(sshConfig)
    .then(() => {
      ssh
        .putFiles([
          {
            local: `${process.env.LOCAL_FILE_PUT_PATH}/test_11_28.txt`,
            remote: `${process.env.SERVER_TEXT_FILE_PUT_PATH}/test_11_28.txt`,
          },
          {
            local: `${process.env.LOCAL_FILE_PUT_PATH}/bg.wav`,
            remote: `${process.env.SERVER_AUDIO_FILE_PUT_PATH}/bg.wav`,
          },
        ])
        .then(
          () => {
            console.log("파일 옮기기 성공");
            const commandToExecute1 = "./test_propocessing.sh";
            ssh
              .execCommand(commandToExecute1, {
                cwd: process.env.SERVER_TEXT_FILE_PUT_PATH,
              })
              .then((result) => {
                console.log(`${commandToExecute1} 명령어 실행 성공`);
                const commandToExecute2 = "./run.sh";
                ssh
                  .execCommand(commandToExecute2, {
                    cwd: process.env.SERVER_TEXT_FILE_PUT_PATH,
                  })
                  .then((result) => {
                    console.log(result.stdout);
                    console.log(`${commandToExecute2} 명령어 실행 성공`);
                    ssh
                      .getFile(
                        process.env.LOCAL_FILE_GET_PATH,
                        process.env.SERVER_FILE_GET_PATH
                      )
                      .then(
                        (Contents) => {
                          console.log("파일 가져오기 성공");

                          res.json({ contents: Contents });
                        },
                        (error) => {
                          console.log("파일 가져오기 실패");
                          console.log(error);
                          res
                            .status(500)
                            .json({ error: "Failed to fetch file contents" });
                        }
                      );
                  });
              })
              .catch((error) => {
                console.log("./test_propocessing.sh 명령어 실행 실패");
                console.log(error);
                res.status(500).json({ error: "Failed to execute command" });
              });
          },
          (error) => {
            console.log("파일 옮기기 실패");
            console.log(error);
            res.status(500).json({ error: "Failed to transfer files" });
          }
        );
    })
    .catch((error) => {
      console.error("SSH connection failed:", error);
      res.status(500).json({ error: "Failed to connect to the server" });
    });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
