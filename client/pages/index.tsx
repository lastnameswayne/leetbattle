import { ChakraProvider, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import io from "socket.io-client";
import ConnectPage from "./_connect";
import Main from "./_main";

function Index(): JSX.Element {
  const [code, setCode] = useState("def two_sum(nums, target):"); //initial code for Two-Sum
  const [outputReceived, setOutputReceived] = useState(""); //sets output of the code ran
  const [error, setError] = useState(""); //sets any errors received
  const [errorStatus, setErrorStatus] = useState<Boolean>(null); //tracks if there is an error
  const [gameCode, setGameCode] = useState(""); //gamecode of the game
  const [gameCodeInput, setGameCodeInput] = useState(""); //gamecode input of connect
  const [showConnect, setShowConnect] = useState<boolean>(true); //checks whether to show the connect-screen
  let [playerNumber, setPlayerNumber] = useState(""); //player number of each player joined
  
  const toast = useToast(); //toast hook to display toasts

  const [created, setCreated] = useState(false); //handles whether you created the game
  const [joined, setJoined] = useState(false); //handles whether you joined the game 

  const [youLost, setYouLost] = useState(false); //handles when a player loses
  const [youWon, setYouWon] = useState(false); //handles when a player wins

  const [runIsLoading, setRunIsLoading] = useState(false); //handles loading animation for run button
  const [submitIsLoading, setSubmitIsLoading] = useState(false); //handles loading animation for the submit button

  const [seconds, setSeconds] = useState<number>(10); //sets the initial countdown
  let [isActive, setIsActive] = useState<Boolean>(true); //handles whether the timer should run or not
  const [currentTime, setCurrentTime] = useState(`00:00`); //handles the timer in the navbar

  const { isOpen, onOpen, onClose } = useDisclosure(); //handles closing an opening modals
  const [tabIndex, setTabIndex] = React.useState(1) //handles setting the index of the problem-tabmenu

  const [showOverLay, setShowOverLay] = useState<boolean>(true)

  const BACKEND_URL = "https://leetbattle.herokuapp.com"
  const socket = io.connect("https://leetbattle.herokuapp.com");

  //fires when a player types in the code-editor
  function onChangeCodeInput(newValue) {
    setCode(newValue);
  }

  //fires when gamecode is input in the connect-page
  const handleChange = (event) => {
    if (!event.target) {
      return;
    }
    setGameCodeInput(event.target.value);
  };

  //_________________________________
  //SENDING REQUESTS TO THE SERVER
  //_________________________________

  //runs when a player submits their code
  const onSubmit = async (code) => {
    setSubmitIsLoading(true);
    socket.emit("submit", gameCode, playerNumber);
    axios({
      method: "POST",
      url: BACKEND_URL+"/submit",
      data: { code },
    }).catch((error) => {
      console.log(error);
      setSubmitIsLoading(false);
    });
  };

  //runs when a player runs their code
  const onExecute = async (code) => {
    setRunIsLoading(true);
    socket.emit("run", gameCode, playerNumber);
    axios({
      method: "POST",
      url: BACKEND_URL+"/run",
      data: { code },
    }).catch((error) => {
      console.log(error);
      setRunIsLoading(false);
    });
  };

  //leaves a game
  const leaveGame = (roomName) => {
    socket.emit("disconnectClient", roomName);
  };

  //tells the server to start a new game
  const newGame = () => {
    socket.emit("newGame");
  };

  //tells the server to join a new game
  const joinGame = () => {
    socket.emit("joinGame", gameCodeInput);
  };

  //_________________________________
  //HANDLING RESPONSES FROM THE SERVER
  //_________________________________

  //fires when server creates a game
  const handleCreate = (number, roomName) => {
    playerNumber = number;
    setPlayerNumber(number);

    setCreated(true);
    setShowConnect(false);
    setGameCode(roomName);
    toast({
      title: "Created a game",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  //fires when the game code is unknown
  const handleUnknownGame = () => {
    toast({
      title: "Couldn't join",
      description: "Unknown game code",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  //fires when the game code is the empty string
  const handleNoCode = () => {

    toast({
      title: "Couldn't join",
      description: "No code inputted",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  //fires when the room has more than 2 players
  const handleTooManyPlayers = () => {
    toast({
      title: "Couldn't join",
      description: "Too many players in the session",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  //fires when the server let's a player join
  const handleJoin = (number, roomName) => {
    setPlayerNumber(number);
    playerNumber=number
    setJoined(true);
    setGameCode(roomName);
    setShowConnect(false);
    toast({
      title: `Joined game ${roomName}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  //initial countdown from 10s when both players join
  const handleCountDown10 = (timer) => {
    setSeconds(timer);
  };

  //actual timer running when the game starts
  const handleTimer = () => {
    setShowOverLay(false)
    setTabIndex(0)
    let time = 0;
    let interval;
      interval  = setInterval(() => {
        if (isActive) {
        time += 1;
        var minutes = ""+Math.floor(time / 60);
        var sec = ""+time%60
        if (time%60 < 10) {
          sec = "0"+sec
        }
        if ((time/60) < 10) {
          minutes = "0"+minutes
        }        
        setCurrentTime(`${minutes}:${sec}`);
      }}, 1000);
  };

  //fires when the server has code to send
  const handleReceiveCode = (output, playerNumberReceived: string) => {
    
    if (playerNumber === playerNumberReceived) {
    setRunIsLoading(false);
    setSubmitIsLoading(false);
    setOutputReceived(output.codeOutput);
    setError(output.errorOutput);
    if (output.errorOutput) {
      setErrorStatus(true);
    } else {
      setErrorStatus(false);
    }
  }
  };

  //fires if the server finds a winner
  const handleWinner = (playerNumberWinner: string) => {
    setIsActive(false);
    isActive=false;
    setRunIsLoading(false);
    setSubmitIsLoading(false);
    if (playerNumberWinner === playerNumber) {
      setYouWon(true);
    } else {
      setYouLost(true);
    }
    {leaveGame}
  };

  //user submitted wrong answer
  const handleWrongSubmit = (playerNumberReceived: string) => {
    if (playerNumber === playerNumberReceived) {
      setSubmitIsLoading(false);
      setRunIsLoading(false);
      toast({
        title: "Wrong answer!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleServerError = (playerNumberReceived: string) => {
    if (playerNumber === playerNumberReceived) {
      setSubmitIsLoading(false);
      setRunIsLoading(false);
      toast({
        title: "Wrong input error!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  socket.on("create", handleCreate);
  socket.on("join", handleJoin);
  socket.on("unknownGame", handleUnknownGame);
  socket.on("tooManyPlayers", handleTooManyPlayers);
  socket.on("noCode", handleNoCode);
  // socket.on("gameCode", handleGameCode);
  socket.on("countdown10", handleCountDown10);
  socket.on("timer", handleTimer);
  socket.on("code", handleReceiveCode);
  socket.on("gameOver", handleWinner);
  socket.on("wrongSubmit", handleWrongSubmit);
  socket.on("serverError", handleServerError);

  if (!showConnect) {
    return (
      <ChakraProvider>
        <Main
          //nav Bar
          onLeave={leaveGame}
          elapsedTime={currentTime}
          //won Module
          time={currentTime}
          isOpenWon={youWon}
          //lostModule
          isOpenLost={youLost}
          //confetti
          active={youWon}
          //tabMenu
          joined={joined}
          onChange={(index) => setTabIndex(index)}
          index = {tabIndex}
          created={created}
          seconds={seconds}
          gameCode={gameCode}
          //editoractions
          runIsLoading={runIsLoading}
          submitIsLoading={submitIsLoading}
          onExecute={() => {
            onExecute({ code });
          }}
          onSubmit={() => {
            onSubmit({ code });
          }}
          //editor
          isActive={showOverLay}
          secondsEditor={seconds}
          code={code}
          onChangeCodeInput={onChangeCodeInput}
          //TabMenuBelowEditor
          errorStatus={errorStatus}
          error={error}
          outputReceived={outputReceived}
        ></Main>
      </ChakraProvider>
    );
  } else {
    return (
      <ConnectPage
        newGame={newGame}
        isOpen={isOpen}
        onOpen={onOpen}
        handleChange={handleChange}
        joinGame={joinGame}
        onClose={onClose}
      ></ConnectPage>
    );
  }
}

export default Index;
