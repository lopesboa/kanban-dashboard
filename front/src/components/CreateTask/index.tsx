import { Backdrop, Button, CardActions, Fade, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useCreateCards } from "../../hooks/useCards";
import { IDefaultCardProps } from "../../interface";

interface IFormFields {
  handleClose: () => void;
  isModalOpen: boolean;
}

export default function CreateTaskForm({
  handleClose,
  isModalOpen,
}: IFormFields) {
  const { mutate, isLoading } = useCreateCards();
  const [fieldsData, setFieldsData] = useState<
    Omit<IDefaultCardProps, "lista">
  >({} as Omit<IDefaultCardProps, "lista">);

  const handleOnCreateCard = () => {
    const task = { ...fieldsData, lista: "To do" } as IDefaultCardProps;
    mutate(task);
    handleClose();
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
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  if (isLoading) return <p>updating...</p>;

  const disableCreateTask =
    !fieldsData?.conteudo?.length || !fieldsData?.titulo?.length;

  return (
    <Modal
      open={isModalOpen}
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
      <Fade in={isModalOpen}>
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
                required
                id="outlined-required"
                label="Titulo"
                onChange={(event) => {
                  handleDescriptionChange(event, "titulo");
                }}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Descrição"
                onChange={(event) => {
                  handleDescriptionChange(event, "conteudo");
                }}
                multiline
                rows={4}
              />
            </div>
          </Box>
          <CardActions style={{ justifyContent: "center" }}>
            <Button
              size="small"
              color="primary"
              onClick={handleOnCreateCard}
              disabled={disableCreateTask}
            >
              Criar task
            </Button>
            <Button size="small" color="primary" onClick={handleClose}>
              Cancelar
            </Button>
          </CardActions>
        </Box>
      </Fade>
    </Modal>
  );
}
