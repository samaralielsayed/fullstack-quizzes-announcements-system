const express = require("express");
const BadRequestError = require("../handleErrors/badRequestError");
const {
  validateNewAnnouncement,
  validateUpdateAnnouncement,
} = require("../validations/announcement");
const { uploadImage } = require("../middlewares/firebase");
const { upload } = require("../middlewares/multer");
const router = express.Router();

const announcementRouter = (announcementController) => {
  router.get("/", async (req, res) => {
    try {
      const getAllAnnouncements =
        await announcementController.getAnnouncements();
      res.status(200).json({ status: "success", data: getAllAnnouncements });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  router.post("/", upload, uploadImage, async (req, res) => {
    try {
      const { error } = validateNewAnnouncement(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const announcement = await announcementController.addAnnouncement(
        req.body
      );
      res.status(201).json({
        status: "success",
        message: "Announcement created successfully",
        data: announcement,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });
  router.patch("/:id", upload, uploadImage, async (req, res) => {
    try {
      const { id } = req.params;
      const announcement = await announcementController.getAnnouncementById({
        _id: id,
      });
      const { error } = validateUpdateAnnouncement(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      await announcementController.editAnnouncement(req.params.id, req.body);
      const updateAnnouncement =
        await announcementController.getAnnouncementById({
          _id: id,
        });
      res.status(200).json({
        status: "success",
        message: " Announcement updated successfully",
        data: updateAnnouncement,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await announcementController.getAnnouncementById({ _id: id });
      await announcementController.deleteAnnouncement(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Announcement deleted successfully",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const announcement = await announcementController.getAnnouncementById({
        _id: id,
      });
      res.status(200).json({
        status: "success",
        message: "Announcement founded",
        data: announcement,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  return router;
};

module.exports = announcementRouter;
