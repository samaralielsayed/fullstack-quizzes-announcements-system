import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import { UseAddQuizDialogProps } from "../interfaces/UseAddQuizDialogProps";
import { useEffect } from "react";
import axiosInstance from "../axiosInstance";

const useAddQuizDialog = ({
  handleClose,
  setRender,
  ID,
}: UseAddQuizDialogProps & { ID?: string }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      course: "",
      topic: "",
      date: null as Dayjs | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      course: Yup.string().required("Course is required."),
      topic: Yup.string().required("Topic is required."),
      date: Yup.date().nullable().required("Date is required."),
    }),
    onSubmit: async (values) => {
      if (ID) {
        console.log("quizIdquizId", ID);
        await handleUpdateQuiz(values);
      } else {
        await handleAddQuiz(values);
      }
    },
  });

  useEffect(() => {
    if (ID) {
      const fetchQuizData = async () => {
        try {
          const response = await axiosInstance.get(
            `/quizzes/${ID}`
          );
          const quizData = response.data.data;
          formik.setValues({
            title: quizData.title,
            course: quizData.course,
            topic: quizData.topic,
            date: quizData.date ? dayjs(quizData.date) : null,
          });
        } catch (error) {
          handleError(error);
        }
      };
      fetchQuizData();
    }
  }, [ID]);

  const handleAddQuiz = async (values: typeof formik.values) => {
    try {
      await axiosInstance.post("/quizzes", values);
      toast.success("Quiz added successfully");
      setRender((prevRender) => !prevRender);
      handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdateQuiz = async (values: typeof formik.values) => {
    try {
      await axiosInstance.patch(`/quizzes/${ID}`, values);
      toast.success("Quiz updated successfully");
      setRender((prevRender) => !prevRender);
      handleClose();
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

  const inputs = [
    {
      label: "Title",
      name: "title",
      value: formik.values.title,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.title && Boolean(formik.errors.title),
      helperText: formik.touched.title && formik.errors.title,
    },
    {
      label: "Course",
      name: "course",
      value: formik.values.course,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.course && Boolean(formik.errors.course),
      helperText: formik.touched.course && formik.errors.course,
    },
    {
      label: "Topic",
      name: "topic",
      value: formik.values.topic,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.topic && Boolean(formik.errors.topic),
      helperText: formik.touched.topic && formik.errors.topic,
    },
  ];

  return {
    inputs,
    formik,
  };
};

export default useAddQuizDialog;
