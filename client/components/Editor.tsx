import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import LoadingOverlay from "react-loading-overlay";

const Ace = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("ace-builds");
    require("ace-builds/src-noconflict/mode-javascript");
    require("ace-builds/src-noconflict/mode-python");
    require("ace-builds/src-noconflict/mode-java");
    require("ace-builds/src-noconflict/theme-xcode");
    require("ace-builds/src-noconflict/theme-dracula.js");
    return ace;
  },
  {
    loading: () => <Spinner></Spinner>,
    ssr: false,
  }
);

const Editor = (props) => {
  if (typeof window !== 'undefined') {
  return(
  <div>
    <Box w ="100%" zIndex={1}>
      <LoadingOverlay active={props.isActive} text={props.secondsEditor}>
        <Ace
          mode={props.language ? props.language : 'python'}
          width="100%"
          theme="xcode"
          onChange={props.onChangeCodeInput}
          name="UNIQUE_ID_OF_DIV"
          value={props.code ? props.code : ""}
          editorProps={{ $blockScrolling: true }}
          highlightActiveLine
          focus
          showPrintMargin
          showGutter
        />
      </LoadingOverlay>
    </Box>
  </div>
)
  } else {return null}
  };

export default Editor;
