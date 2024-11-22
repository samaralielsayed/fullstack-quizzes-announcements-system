export interface QuizProps {
  _id: string;
  title: string;
  course: string;
  topic: string;
  date: string;
  setQuizId: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
