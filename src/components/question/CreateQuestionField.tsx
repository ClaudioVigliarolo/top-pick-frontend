import React from "react";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionCreated } from "@toppick/common/build/interfaces";

interface QuestionTextFieldProps {
  index: number;
  onChange: (index: number, question: QuestionCreated) => void;
  onCreate: (index: number) => void;
  onDelete: (index: number) => void;
  question: QuestionCreated;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: "white",
      padding: 30,
      paddingTop: 20,
      paddingBottom: 50,
      margin: 30,
      borderRadius: 5,
      position: "relative",
    },
    AddIconContainer: {
      display: "flex",
      bottom: -15,
      right: "50%",
      left: "50%",
      transform: "translate(-50%, 0)",
      position: "absolute",
      width: 100,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },

    DeleteIconContainer: {
      right: 5,
      top: 5,
      position: "absolute",
      width: 100,
      height: 30,
      backgroundColor: "transparent",
      paddingLeft: 60,
    },
    deleteIcon: {
      cursor: "pointer",
      color: "red",
    },
    addIcon: {
      color: "white",
      cursor: "pointer",
    },
    textField: {
      width: "50vw",
    },
  })
);

export default function QuestionTextField({
  onChange,
  question,
  onDelete,
  onCreate,
  index,
}: QuestionTextFieldProps) {
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const [showDelete, setShowDelete] = React.useState<boolean>(false);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        id="outlined-multiline-flexible"
        label={"Question " + (index + 1)}
        className={classes.textField}
        maxRows={4}
        multiline
        value={question.title}
        onChange={(e) =>
          onChange(index, { ...question, title: e.target.value })
        }
      />
      <div
        className={classes.AddIconContainer}
        style={{ backgroundColor: showAdd ? "orangered" : "transparent" }}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        {showAdd && (
          <AddIcon
            className={classes.addIcon}
            onClick={() => onCreate(index)}
          />
        )}
      </div>

      <div
        className={classes.DeleteIconContainer}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        {showDelete && (
          <div>
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={() => {
                onDelete(index);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
