import Grid from "@mui/material/Grid/Grid";
import List from "@mui/material/List/List";
import Typography from "@mui/material/Typography/Typography";
import Announcement from "../../components/announcement/Announcement";
import useAnnouncement from "../../hooks/useAnnouncement";
import { useState } from "react";
import AddEditAnnouncementDialog from "../../components/announcement/AddEditAnnouncementDialog";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import cyan from "@mui/material/colors/cyan";
import DeleteDialog from "../../components/share/DeleteDialog";
const AnnouncementPage = () => {
  const {
    isLoading,
    anouncementData,
    setRender,
    handleDeleteAnnouncement,
    openDelete,
    handleCloseDelete,
    setOpenDelete,
  } = useAnnouncement();
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [announcementId, setAnnouncementId] = useState("");

  return (
    <>
      <Grid item xs={12} lg={8}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: { xs: 2, md: 0 },
            mb: 5,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Announcements
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: cyan[900] }}
            startIcon={<ControlPointIcon />}
            onClick={handleOpen}
          >
            Add New Announcement
          </Button>
        </Box>

        <List>
          {anouncementData.map((anouncement) => (
            <Announcement
              key={anouncement._id}
              _id={anouncement._id}
              name={anouncement.name}
              userName={anouncement.userName}
              image={anouncement.image}
              title={anouncement.title}
              description={anouncement.description}
              setAnnouncementId={setAnnouncementId}
              setOpen={setOpenEdit}
              setOpenDelete={setOpenDelete}
            />
          ))}
        </List>
      </Grid>
      {announcementId && openEdit && (
        <AddEditAnnouncementDialog
          open={openEdit}
          handleClose={() => {
            setOpenEdit(false);
            setAnnouncementId("");
          }}
          setRender={setRender}
          ID={announcementId}
        />
      )}
      {open && (
        <AddEditAnnouncementDialog
          open={open}
          handleClose={handleClose}
          setRender={setRender}
        />
      )}

      {openDelete && announcementId && (
        <DeleteDialog
          open={openDelete}
          title="Delete  Announcement"
          message="Are you sure you want to delete this Aannouncement?"
          handleClose={handleCloseDelete}
          handleDelete={() => handleDeleteAnnouncement(announcementId)}
          handledelte={isLoading}
        />
      )}
    </>
  );
};

export default AnnouncementPage;
