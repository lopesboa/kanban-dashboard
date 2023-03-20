import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Snackbar,
  Alert,
  Avatar,
  CardHeader,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useDeleteCard } from "../../hooks/useCards";
import { ICard, LIST_TYPE } from "../../interface";
import { Container, ColumnTitle } from "./styles";

import {
  ArrowBackIos,
  ArrowForwardIos,
  Edit,
  Clear,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { updateCard } from "../../api/cards";

interface IColumn {
  title: string;
  tasks?: ICard[];
  onEditTask: (task: ICard) => void;
}

export default function Column({ title, tasks, onEditTask }: IColumn) {
  const { mutate, status } = useDeleteCard();
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const handleOnDeleteTask = (id: string) => {
    mutate(id);
    setIsSnackOpen(true);
  };
  const handleClose = () => {
    setIsSnackOpen(false);
  };

  const handleOnNavigateToNext = async (card: ICard) => {
    switch (card.lista) {
      case LIST_TYPE.TO_DO:
        card.lista = LIST_TYPE.DOING;
        break;
      case LIST_TYPE.DOING:
        card.lista = LIST_TYPE.DONE;
        break;
      default:
        throw new Error("Lista invalida");
    }

    await updateCard(card);
  };

  const handleOnNavigateToPrevious = async (card: ICard) => {
    switch (card.lista) {
      case LIST_TYPE.DONE:
        card.lista = LIST_TYPE.DOING;
        break;
      case LIST_TYPE.DOING:
        card.lista = LIST_TYPE.TO_DO;
        break;
      default:
        throw new Error("Lista invalida");
    }

    await updateCard(card);
  };

  if (status === "loading") return <p>Deleting....</p>;
  return (
    <Container>
      <ColumnTitle>{title}</ColumnTitle>
      {tasks?.map((task) => {
        return (
          <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  L
                </Avatar>
              }
              title={task.titulo}
              subheader="20/03/2023"
            />
            <CardActionArea>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {task.conteudo}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <IconButton
                  aria-label="edit task"
                  onClick={() => onEditTask(task)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete task"
                  onClick={() => {
                    handleOnDeleteTask(task.id);
                  }}
                >
                  <Clear />
                </IconButton>
              </div>

              <div>
                <IconButton
                  aria-label="previews"
                  onClick={() => handleOnNavigateToPrevious(task)}
                  disabled={task.lista === "To do"}
                >
                  <ArrowBackIos />
                </IconButton>
                <IconButton
                  aria-label="forward"
                  onClick={() => handleOnNavigateToNext(task)}
                  disabled={task.lista === "Done"}
                >
                  <ArrowForwardIos />
                </IconButton>
              </div>
            </CardActions>
            <Snackbar
              open={isSnackOpen}
              autoHideDuration={1000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {`${task.titulo} removed successfully`}
              </Alert>
            </Snackbar>
          </Card>
        );
      })}
    </Container>
  );
}
