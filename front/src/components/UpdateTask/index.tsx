import { Modal, Backdrop, Fade, Box, TextField, CardActions, Button } from "@mui/material";
import { useState } from "react";
import { useUpdateCard } from "../../hooks/useCards";
import { ICard } from "../../interface";

type IRenderModalProps = {
  open: boolean;
  handleClose: () => void;
  task: ICard;
};

export default function UpdateTaskModal({ open, handleClose, task }: IRenderModalProps) {
  const [fieldsData, setFieldsData] = useState<ICard>(task);

  const { mutate } = useUpdateCard({ ...task, ...fieldsData });

  const handleOnUpdateTask = () => {
    handleClose();
    mutate();
  };
  const handleDescriptionChange = (event: any, field: string) => {
    setFieldsData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-required"
                label="Titulo"
                defaultValue={task.titulo}
                onChange={(value) => {
                  handleDescriptionChange(value, "titulo");
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                label="Descrição"
                defaultValue={task.conteudo}
                onChange={(value) => {
                  handleDescriptionChange(value, "conteudo");
                }}
                multiline
                rows={4}
              />
            </div>
          </Box>

          <CardActions style={{ justifyContent: "center" }}>
            <Button size="small" color="primary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button size="small" color="primary" onClick={handleOnUpdateTask}>
              Atualizar
            </Button>
          </CardActions>
        </Box>
      </Fade>
    </Modal>
  );
}
