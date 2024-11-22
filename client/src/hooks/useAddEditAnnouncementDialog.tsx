import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { UseAddQuizDialogProps } from "../interfaces/UseAddQuizDialogProps";
import { useEffect, useState } from "react";

const useAddEditAnnouncementDialog = ({
  handleClose,
  setRender,
  ID,
}: UseAddQuizDialogProps & { ID?: string }) => {
  const [imagePreview, setimagePreview] = useState(String || undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setimagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      image: null as File | null,
      description: "",
      title: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      userName: Yup.string().required("User Name is required."),
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
      image: Yup.mixed().nullable().required("Image is required."),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("userName", values.userName);
        formData.append("description", values.description);
        formData.append("title", values.title);
        if (values.image) {
          formData.append("image", values.image);
        }
        console.log(
          "FormData content before API call:",
          Array.from(formData.entries())
        );

        if (ID) {
          await handleUpdateAnnouncement(formData);
          console.log("Update announcement success");
        } else {
          await handleAddAnnouncement(formData);
          console.log("Add announcement success");
        }
      } catch (error) {
        console.error("Error during submission:", error);
      }
    },
  });
  useEffect(() => {
    if (ID) {
      const fetchAnnouncementData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/announcements/${ID}`
          );
          const announcementData = response.data.data;
          formik.setValues({
            name: announcementData.name,
            userName: announcementData.userName,
            description: announcementData.description,
            title: announcementData.title,
            image: announcementData.image, // File uploads cannot be pre-filled
          });
          setimagePreview(announcementData.image);
        } catch (error) {
          handleError(error);
        }
      };
      fetchAnnouncementData();
    }
  }, [ID]);

  const handleAddAnnouncement = async (formData: FormData) => {
    try {
      console.log("hhhh");
      await axios.post("http://localhost:3000/api/v1/announcements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Announcement added successfully");
      setRender((prevRender) => !prevRender);
      handleClose();
    } catch (error) {
      console.log("errore", error);
      handleError(error);
    }
  };

  const handleUpdateAnnouncement = async (formData: FormData) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/announcements/${ID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Announcement updated successfully");
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
      label: "Name",
      name: "name",
      value: formik.values.name,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.name && Boolean(formik.errors.name),
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      label: "User Name",
      name: "userName",
      value: formik.values.userName,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.userName && Boolean(formik.errors.userName),
      helperText: formik.touched.userName && formik.errors.userName,
    },
    {
      label: "Description",
      name: "description",
      value: formik.values.description,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.description && Boolean(formik.errors.description),
      helperText: formik.touched.description && formik.errors.description,
    },
    {
      label: "Title",
      name: "title",
      value: formik.values.title,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.touched.title && Boolean(formik.errors.title),
      helperText: formik.touched.title && formik.errors.title,
    },
  ];

  return {
    inputs,
    formik,
    imagePreview,
    handleFileChange,
  };
};

export default useAddEditAnnouncementDialog;
