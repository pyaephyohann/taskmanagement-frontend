import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  callBack: () => void;
}

const DeleteDialog = ({ open, setOpen, title, callBack }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ mt: "1rem", fontSize: "1.3rem", marginX: "auto" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ my: "0.5rem", paddingX: "6rem", opacity: 0.9 }}>
        This action cannot be undone
      </DialogContent>
      <DialogActions
        sx={{
          mb: "1.5rem",
          mx: "auto",
        }}
      >
        <Button
          sx={{ mr: "2rem" }}
          onClick={() => setOpen(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={() => {
            callBack();
            setOpen(false);
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
