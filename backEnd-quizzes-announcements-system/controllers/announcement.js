class AnnouncementController {
  constructor(AnnouncementRepository) {
    this.AnnouncementRepository = AnnouncementRepository;
  }
  async getAnnouncements() {
    return await this.AnnouncementRepository.getAnnouncements();
  }

  async getAnnouncementById(id) {
    return await this.AnnouncementRepository.getAnnouncementById(id);
  }
  async addAnnouncement(body) {
    return await this.AnnouncementRepository.addAnnouncement(body);
  }

  async editAnnouncement(id, body) {
    return await this.AnnouncementRepository.editAnnouncement(id, body);
  }

  async deleteAnnouncement(id) {
    return await this.AnnouncementRepository.deleteAnnouncement(id);
  }
}

module.exports = AnnouncementController;
