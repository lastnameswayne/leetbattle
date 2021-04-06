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
  isLoading: boolean;
  h: string | number;
  w: string | number;
  fontSize?: string;
  onClick: () => void;
  text: string;
}
