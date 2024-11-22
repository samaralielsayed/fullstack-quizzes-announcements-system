import { useEffect, useState } from "react";
import { QuizProps } from "../interfaces/QuizProps";
import axios from "axios";
import { toast } from "react-toastify";

const useQuiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizProps[]>([]);
  const [render, setRender] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  async function getAllQuizzes() {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/v1/quizzes");
      if (response.status === 200) {
        setQuizData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching Quiz data:");
    } finally {
      setIsLoading(false);
    }
  }
  const handleDeleteQuiz = async (quizId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/v1/quizzes/${quizId}`);
      toast.success("Quiz deleted successfully");
      setRender((prevRender) => !prevRender);
      setIsLoading(false);
      handleCloseDelete();
    } catch (error) {
      handleError(error);
    }
  };
  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("API Error:", error.response?.data || error.message);
    } else {
      toast.error("An unexpected error occurred.");
      console.error("Unexpected Error:", error);
    }
  };
  useEffect(() => {
    getAllQuizzes();
  }, [render]);
  return {
    isLoading,
    quizData,
    setRender,
    handleDeleteQuiz,
    openDelete,
    handleCloseDelete,
    handleOpenDelete,
    setOpenDelete,
  };
};

export default useQuiz;
