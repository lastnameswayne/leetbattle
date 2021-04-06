"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const makeId_1 = __importDefault(require("./const/makeId"));
require("dotenv/config");
const compareStrings_1 = __importDefault(require("./const/util/compareStrings"));
const dataObject_1 = __importDefault(require("../src/const/dataObject"));
const cors = require("cors");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const clientRooms = {};
    let playerNumberRun = "";
    let playerNumberSubmit = "";
    const code = "";
    const codeOutput = "";
    const errorOutput = "";
    let roomNameRun = "";
    let roomNameSubmit = "";
    let roomNameJoin = "";
    let timerRunning = true;
    const app = express_1.default();
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        headers: ["Origin", "Content-Type", "X-Auth-Token"],
    }));
    app.use(express_1.default.json());
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
    const testcasesTwoSum = new Map([
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
    const testcaseAnswersTwoSum = [
        "[0, 1]",
        "[0, 2]",
        "[2, 3]",
        "[4, 3]",
        "[0, 1]",
    ];
    const output = {
        codeOutput: codeOutput,
        errorOutput: errorOutput,
    };
    io.on("connection", (client) => __awaiter(void 0, void 0, void 0, function* () {
        client.removeAllListeners();
        const handleNewGame = () => {
            const roomName = makeId_1.default(5);
            clientRooms[client.id] = roomName;
            client.emit("gameCode", roomName);
            client.join(roomName);
            client.number = 1;
            client.emit("create", 1, roomName);
            console.log(roomName);
        };
        const handleJoinGame = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(client.id);
            roomName.trim;
            roomName.toString;
            roomNameJoin = roomName;
            const room = yield io.in(roomNameJoin).allSockets();
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
            }
            else if (numClients > 1) {
                console.log("too many players");
                client.emit("tooManyPlayers");
                return;
            }
            clientRooms[client.id] = roomNameJoin;
            client.join(roomNameJoin);
            client.number = 2;
            client.emit("join", 2, roomNameJoin);
            startCountDownFrom10(roomNameJoin);
        });
        const startCountDownFrom10 = (roomName) => {
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
        const startGameInterval = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("both players joined in", roomName);
            timerRunning = true;
            let time = 0;
            setInterval(() => {
                if (timerRunning) {
                    time = time + 1;
                    io.to(roomName).emit("timer", time);
                }
                else {
                    return;
                }
            }, 1000);
        });
        const handleRun = (roomName, playerNumber, code) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(code);
            console.log(process.env.VM_URL);
            playerNumberRun = playerNumber;
            roomNameRun = roomName;
            dataObject_1.default.source_code = code;
            axios({
                url: process.env.VM_URL,
                method: "POST",
                data: dataObject_1.default,
            })
                .then((req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                axios
                    .get(process.env.VM_URL + "/" + req.data.token)
                    .then((req, res) => {
                    if (!req) {
                        console.log("no output");
                    }
                    output.codeOutput = req.data.stdout;
                    output.errorOutput = req.data.stderr;
                    sendCode(roomNameRun, output, playerNumberRun);
                });
            }))
                .catch((err) => {
                io.to(roomNameRun).emit("serverError", playerNumberRun);
                console.log(err);
            });
        });
        const sendCode = (roomName, output, playerNumber) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("player number in send code", playerNumber);
            console.log("sent code");
            console.log(output);
            console.log(roomName);
            io.to(roomName).emit("code", output, playerNumber);
        });
        const handleSubmit = (roomName, playerNumber, code) => {
            roomNameSubmit = roomName;
            playerNumberSubmit = playerNumber;
            const input = `code        
      

        ${dedent_1.default(`''
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
        `)}
       `;
            dataObject_1.default.source_code = input;
            console.log(dataObject_1.default.source_code);
            axios({
                url: process.env.VM_URL,
                method: "POST",
                data: dataObject_1.default,
            })
                .then((req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                axios
                    .get(process.env.VM_URL + "/" + req.data.token)
                    .then((req) => {
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
            }))
                .catch((err) => {
                io.to(roomNameSubmit).emit("serverError", playerNumberSubmit);
                console.log(err);
            });
        };
        const validateAnswer = (output, roomName, playerNumber) => {
            if (!output) {
                io.to(roomName).emit("serverError", playerNumber);
                return;
            }
            const USERSUBMIT = output;
            USERSUBMIT.pop();
            console.log(USERSUBMIT);
            console.log(testcaseAnswersTwoSum);
            USERSUBMIT.every((element, index) => {
                if (compareStrings_1.default(element, testcaseAnswersTwoSum[index])) {
                    console.log("game over, winner found");
                    io.to(roomName).emit("gameOver", playerNumber);
                    timerRunning = false;
                    return;
                }
                else {
                    console.log("wrong answer");
                    io.to(roomName).emit("wrongSubmit", playerNumber);
                }
            });
            return;
        };
        const leaveRoom = (roomName) => {
            client.leave(roomName);
        };
        client.on("newGame", handleNewGame);
        client.on("joinGame", handleJoinGame);
        client.on("run", handleRun);
        client.on("submit", handleSubmit);
        client.on("disconnectClient", leaveRoom);
    }));
    app.get("/", (req, res) => {
        res.send("hello world");
    });
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
        console.log(`server started at http:/localhost:${port}/graphql`);
    });
}))();
//# sourceMappingURL=index.js.map