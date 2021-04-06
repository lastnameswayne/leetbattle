import dedent from "dedent";
import express from "express";
import "reflect-metadata";
import makeId from "./const/makeId";
import "dotenv/config";
import compareStrings from "./const/util/compareStrings";
import data from "../src/const/dataObject";
import { Request, output } from "../src/types";
import { Socket } from "socket.io";
//import { buildSchema } from "type-graphql";
//import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
//import { ApolloServer } from "apollo-server-express";

const cors = require("cors");

(async () => {
  const clientRooms: { [name: string]: string } = {};
  let playerNumberRun = "";
  let playerNumberSubmit = "";
  const codeOutput = "";
  const errorOutput = "";
  let roomNameRun = "";
  let roomNameSubmit = "";
  let roomNameJoin = "";
  let timerRunning = true;

  const app = express();
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      headers: ["Origin", "Content-Type", "X-Auth-Token"],
    })
  );
  app.use(express.json());
  const server = require("http").createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET, POST"],
      transports: ["websocket", "polling"],
      credentials: true,
    },
    forceNew: true,
    reconnection: false,
    perMessageDeflate: false,
    allowEIO3: true,
  });

  const axios = require("axios");

  const testcasesTwoSum = new Map<string, string>([
    ["testcase1arr", "[2,7,11,15]"],
    ["testcase1target", "9"],
    ["testcase2arr", "[-3,4,3,90]"],
    ["testcase2target", "0"],
    ["testcase3arr", "[100,4,657,999,1,5,10,8,5,4,10]"],
    ["testcase3target", "1656"],
    ["testcase4arr", "[-500,4,3,60,40,0]"],
    ["testcase4target", "100"],
    ["testcase5arr", "[-500,4,3,60,40,0]"],
    ["testcase5target", "-496"],
  ]);

  const testcaseAnswersTwoSum: string[] = [
    "[0, 1]",
    "[0, 2]",
    "[2, 3]",
    "[4, 3]",
    "[0, 1]",
  ];

  const output: output = {
    codeOutput: codeOutput,
    errorOutput: errorOutput,
  };

  io.on("connection", async (client: Socket) => {
    client.removeAllListeners();

    const handleNewGame = () => {
      const roomName = makeId(5);
      clientRooms[client.id] = roomName;
      client.emit("gameCode", roomName);
      client.join(roomName);
      client.emit("create", 1, roomName);
      console.log(roomName);
    };

    const handleJoinGame = async (roomName: string) => {
      console.log(client.id);
      roomName.trim;
      roomName.toString;
      roomNameJoin = roomName;
      const room = await io.in(roomNameJoin).allSockets();
      console.log(roomNameJoin);

      console.log(room);
      let numClients = 0;
      if (room) {
        numClients = room.size;
        console.log(numClients);
      }
      if (!roomNameJoin) {
        client.emit("noCode");
        return;
      }

      if (numClients === 0) {
        client.emit("unknownGame");
        return;
      } else if (numClients > 1) {
        console.log("too many players");
        client.emit("tooManyPlayers");
        return;
      }

      clientRooms[client.id] = roomNameJoin;

      client.join(roomNameJoin);
      client.emit("join", 2, roomNameJoin);
      //now we can start the game!!
      startCountDownFrom10(roomNameJoin);
    };

    const startCountDownFrom10 = (roomName: string) => {
      let time = 10;
      const interval = setInterval(() => {
        time = time - 1;
        io.to(roomName).emit("countdown10", time);
        if (time === 0) {
          clearInterval(interval);
          startGameInterval(roomName);
          return;
        }
      }, 1000);
    };

    const startGameInterval = async (roomName: string) => {
      console.log("both players joined in", roomName);
      timerRunning = true;
      let time = 0;
      setInterval(() => {
        if (timerRunning) {
          time = time + 1;
          io.to(roomName).emit("timer", time);
        } else {
          return;
        }
      }, 1000);
    };

    const handleRun = async (
      roomName: string,
      playerNumber: string,
      code: string
    ) => {
      console.log(code);
      console.log(process.env.VM_URL);
      playerNumberRun = playerNumber;
      roomNameRun = roomName;
      data.source_code = code;
      axios({
        url: process.env.VM_URL,
        method: "POST",
        data: data,
      })
        .then(async (req: Request) => {
          //first call generates a token
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec
          //after waiting, use the token to get the res.data.stdout which is
          //what I want to send to frontend using res.send()
          axios
            .get(process.env.VM_URL + "/" + req.data.token)
            .then((req: Request) => {
              if (!req) {
                console.log("no output");
              }
              output.codeOutput = req.data.stdout;
              output.errorOutput = req.data.stderr;
              sendCode(roomNameRun, output, playerNumberRun);
            });
        })
        .catch((err: Error) => {
          io.to(roomNameRun).emit("serverError", playerNumberRun);
          console.log(err);
        });
    };

    const sendCode = async (
      roomName: string,
      output: output,
      playerNumber: string
    ) => {
      console.log("player number in send code", playerNumber);

      console.log("sent code");
      console.log(output);
      console.log(roomName);
      io.to(roomName).emit("code", output, playerNumber);
    };

    const handleSubmit = (
      roomName: string,
      playerNumber: string,
      code: string
    ) => {
      roomNameSubmit = roomName;
      playerNumberSubmit = playerNumber;

      //adding all testcases and printing them to check the solution
      const input = `${code}       
      

        ${dedent(
          `''
        a1 = ${testcasesTwoSum.get("testcase1arr")} 
        t1 = ${testcasesTwoSum.get("testcase1target")}
        a2 = ${testcasesTwoSum.get("testcase2arr")}  
        t2 = ${testcasesTwoSum.get("testcase2target")}
        a3 = ${testcasesTwoSum.get("testcase3arr")} 
        t3 = ${testcasesTwoSum.get("testcase3target")}
        a4 = ${testcasesTwoSum.get("testcase4arr")} 
        t4 = ${testcasesTwoSum.get("testcase4target")}
        a5 = ${testcasesTwoSum.get("testcase5arr")} 
        t5 = ${testcasesTwoSum.get("testcase5target")}
        print(two_sum(a1,t1))
        print(two_sum(a2,t2))
        print(two_sum(a3,t3))
        print(two_sum(a4,t4))
        print(two_sum(a5,t5))
        `
        )}
       `;

      //run the code
      data.source_code = input;
      console.log(data.source_code);

      axios({
        url: process.env.VM_URL,
        method: "POST",
        data: data,
      })
        .then(async (req: Request) => {
          //first call generates a token
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 3 sec
          //after waiting, use the token to get the res.data.stdout which is
          //what I want to send to frontend using res.send()
          axios
            .get(process.env.VM_URL + "/" + req.data.token)
            .then((req: Request) => {
              if (!req) {
                console.log("no output");
              }
              output.codeOutput = req.data.stdout;
              output.errorOutput = req.data.stderr;
              if (!output.codeOutput) {
                console.log("no code output");
                io.to(roomNameSubmit).emit("wrongSubmit", playerNumberSubmit);
                return;
              }
              const outputArray = output.codeOutput.split("\n");
              validateAnswer(outputArray, roomNameSubmit, playerNumberSubmit);
            });
        })
        .catch((err: Error) => {
          io.to(roomNameSubmit).emit("serverError", playerNumberSubmit);
          console.log(err);
        });
    };

    const validateAnswer = (
      output: Array<string>,
      roomName: string,
      playerNumber: string
    ) => {
      if (!output) {
        io.to(roomName).emit("serverError", playerNumber);
        return;
      }
      const USERSUBMIT: Array<string> = output;
      USERSUBMIT.pop(); //remove last element which is empty because of the output

      //run through every test case
      console.log(USERSUBMIT);
      console.log(testcaseAnswersTwoSum);

      USERSUBMIT.every((element, index) => {
        if (compareStrings(element, testcaseAnswersTwoSum[index])) {
          //winner
          console.log("game over, winner found");
          io.to(roomName).emit("gameOver", playerNumber);
          timerRunning = false;
          return;
        } else {
          //wrong answer
          console.log("wrong answer");
          io.to(roomName).emit("wrongSubmit", playerNumber);
        }
      });
      return;
    };

    const leaveRoom = (roomName: string) => {
      client.leave(roomName);
    };

    client.on("newGame", handleNewGame);
    client.on("joinGame", handleJoinGame);
    client.on("run", handleRun);
    client.on("submit", handleSubmit);
    client.on("disconnectClient", leaveRoom);
  });

  // const options = await getConnectionOptions(
  //   process.env.NODE_ENV || "development"
  // );
  // await createConnection({ ...options, name: "default" });

  //graphQL support
  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [HelloWorldResolver],
  //     validate: true,
  //   }),
  //   context: ({ req, res }) => ({ req, res }),
  // });

  //apolloServer.applyMiddleware({ app, cors: false });
  const port: number | string = process.env.PORT || 4000;
  server.listen(port, () => {
    console.log(`server started at http:/localhost:${port}/graphql`);
  });
})();
