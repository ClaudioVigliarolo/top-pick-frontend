import { TextField } from "@material-ui/core";
import React from "react";
import { CustomDialog } from "./DialogStyles";

interface MessageDialogProps {
  open: boolean;
  onSend: (message: string) => void;
  onRefuse: any;
  headerText: string;
}
export default function MessageDialog(props: MessageDialogProps) {
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  const onSubmit = async (newCategory: string) => {
    setError(false);
    setMessage("");
    if (newCategory == "") {
      setError(true);
      return;
    }
    props.onSend(newCategory);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={"Write to:   " + props.headerText}
        minWidth={600}
        confirmButtonText="Send"
        refuseButtonText="Close"
        minHeigth={300}
        onConfirm={() => onSubmit(message)}
        onRefuse={props.onRefuse}
        children={
          <TextField
            error={error}
            autoFocus
            multiline
            rows={10}
            rowsMax={10}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="text"
            id="standard-helperText"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            fullWidth
          />
        }
      />
    </>
  );
}
