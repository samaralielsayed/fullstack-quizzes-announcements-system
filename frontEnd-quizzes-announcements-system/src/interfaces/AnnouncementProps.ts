export interface AnnouncementProps {
  _id: string;
  name: string;
  userName: string;
  image: string;
  description: string;
  title: string;
  setAnnouncementId: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
