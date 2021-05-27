import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "./TableStyles";
import { Category, Topic, Related } from "../../interfaces/Interfaces";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getFormattedDate } from "../../utils/utils";

interface TableTopicsProps {
  topics: Topic[];
  searchText: string;
  onEdit: (categ: Topic) => void;
  onDelete: (categ: Topic) => void;
}

export default function TableTopics({
  searchText,
  topics,
  onDelete,
  onEdit,
}: TableTopicsProps) {
  const classes = useStyles();

  const renderRows = (topics: Topic[]) => {
    return topics.map((topic: Topic, index: number) => {
      if (topic.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow
            key={index}
            style={{
              backgroundColor:
                topic.related.length === 0 || topic.categories.length === 0
                  ? "red"
                  : "",
            }}
          >
            <StyledTableCell> {topic.title}</StyledTableCell>
            <StyledTableCell>{topic.source}</StyledTableCell>
            <StyledTableCell>
              {getFormattedDate(topic.timestamp)}
            </StyledTableCell>
            <StyledEditCell>
              {topic.related.map((r: Related) => r.title + " ")}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(topic);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(topic);
                  }}
                  className={classes.deleteIcon}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };

  return (
    <CustomTable
      columns={["15%", "20%", "20%", "45%"]}
      columnNames={["title", "source", "last update", "related"]}
      body={renderRows(topics)}
    />
  );
}