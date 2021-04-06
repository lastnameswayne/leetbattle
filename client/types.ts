import { FormEventHandler } from "react";

export interface output {
  codeOutput: string;
  errorOutput: string;
}

export interface modalTypes {
  isOpen?: boolean;
  onClose?: () => void;
  text?: string;
  handleCreate?: () => void;
}

export interface buttonType {
  isLoading?: boolean;
  h: string | number;
  w: string | number;
  fontSize?: string;
  onClick: () => void;
  text: string;
}

export interface NavBarTypes {
  onLeave?: (roomName: string) => void;
  elapsedTime?: string;
}

export interface MainProps extends NavBarTypes {
  isOpenWon: boolean;
  onOpen?: () => void;
  isOpenLost: boolean;
  joined: boolean;
  index: number;
  time: string;
  active: boolean;
  onChange: (index: number) => void | FormEventHandler<HTMLButtonElement>;
  created: boolean;
  seconds: number;
  gameCode: string;
  runIsLoading: boolean;
  submitIsLoading: boolean;
  code: string;
  onExecute: (code: string) => void;
  onSubmit: (code: string) => void;
  isActive: boolean;
  secondsEditor: number;
  onChangeCodeInput;
  errorStatus;
  error;
  outputReceived;
}

export interface _connectProps extends modalTypes {
  isOpen;
  onClose;
  newGame;
  onOpen;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  joinGame: () => void;
}

export interface TextType {
  text: string;
}
