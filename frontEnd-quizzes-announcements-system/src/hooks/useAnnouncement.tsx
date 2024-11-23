import { useEffect, useState } from "react";
import { AnnouncementProps } from "../interfaces/AnnouncementProps";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";

const useAnnouncement = () => {
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const [anouncementData, setAnouncementData] = useState<AnnouncementProps[]>(
    []
  );
  async function getAllAnouncements() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/announcements");
      if (response.status === 200) {
        setAnouncementData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching Anouncement data:");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllAnouncements();
  }, [render]);
  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("API Error:", error.response?.data || error.message);
    } else {
      toast.error("An unexpected error occurred.");
      console.error("Unexpected Error:", error);
    }
  };
  const handleDeleteAnnouncement = async (quizId: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/announcements/${quizId}`);
      toast.success("Announcement deleted successfully");
      setRender((prevRender) => !prevRender);
      setIsLoading(false);
      handleCloseDelete();
    } catch (error) {
      handleError(error);
    }
  };
  return {
    isLoading,
    anouncementData,
    setRender,
    handleDeleteAnnouncement,
    openDelete,
    handleCloseDelete,
    setOpenDelete,
  };
};

export default useAnnouncement;
