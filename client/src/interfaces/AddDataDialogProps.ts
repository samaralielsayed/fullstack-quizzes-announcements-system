export interface AddDataDialogProps {
  open: boolean;
  handleClose: () => void;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  ID?: string;
}
