import { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import { ICard } from "../../interface";
import { useCards } from "../../hooks/useCards";
import { UpdateTaskModal, Column, CreateTask } from "../../components";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ICard>({} as ICard);
  const { data, isLoading } = useCards(selectedTask);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleOpen = (task: ICard) => {
    setSelectedTask(task);
    setOpen((prev) => !prev);
  };

  const handleOnOpenCreateTaskModal = () => {
    setIsCreateTaskModalOpen((prev) => !prev);
  };

  const handleOnCreateTask = () => {
    setIsCreateTaskModalOpen((prev) => !prev);
  };
  const handleClose = () => setOpen((prev) => !prev);

  const order = ["To do", "Doing", "Done"];

  if (isLoading) return <p>loading...</p>;

  const orderedCards = order.map((list) => {
    const cardsInList = data?.filter((card) => card.lista === list);
    return (
      <Column
        onEditTask={handleOpen}
        key={list}
        title={list}
        tasks={cardsInList}
      />
    );
  });
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ada Dashboard
            </Typography>
            <Button color="inherit" onClick={handleOnOpenCreateTaskModal}>
              Adicionar Task
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {orderedCards}
      </div>
      <UpdateTaskModal
        task={selectedTask}
        open={open}
        handleClose={handleClose}
      />
      <CreateTask
        handleClose={handleOnCreateTask}
        isModalOpen={isCreateTaskModalOpen}
      />
    </>
  );
}
