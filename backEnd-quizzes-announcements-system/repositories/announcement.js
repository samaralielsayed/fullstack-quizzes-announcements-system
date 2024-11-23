const Announcement = require("../models/announcement");
const NotFoundError = require("../handleErrors/notFoundError");

class AnnouncementRepository {
  async getAnnouncements() {
    const announcements = await Announcement.find();
    if (!announcements.length) {
      throw new NotFoundError("No Announcements found");
    }
    return announcements;
  }
  async getAnnouncementById(id) {
    const announcement = await Announcement.findOne(id);
    if (!announcement) {
      throw new NotFoundError("The Announcement with this ID was not found");
    }
    return announcement;
  }

  async addAnnouncement(newAnnouncement) {
    return await Announcement.create(newAnnouncement);
  }

  async editAnnouncement(id, body) {
    await Announcement.updateOne({ _id: id }, body);
  }

  async deleteAnnouncement(id) {
    await Announcement.deleteOne({ _id: id });
  }
}

module.exports = AnnouncementRepository;
