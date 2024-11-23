import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import { cyan, red } from "@mui/material/colors";
import grey from "@mui/material/colors/grey";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Delete } from "@mui/icons-material";
import { AnnouncementProps } from "../../interfaces/AnnouncementProps";

const Announcement: React.FC<AnnouncementProps> = ({
  _id,
  name,
  userName,
  title,
  image,
  description,
  setAnnouncementId,
  setOpen,
  setOpenDelete,
}) => (
  <ListItem>
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={2}
      flexWrap="wrap"
      sx={{ mb: 4, position: "relative" }}
    >
      <Avatar sx={{ marginRight: 2 }} src={image}></Avatar>
      <ListItemText
        primary={name}
        secondary={userName}
        sx={{
          flex: 1,
          minWidth: 150,
          borderRight: { md: 2 },
          borderColor: cyan[200],
        }}
      />
      <Box sx={{ flex: 3, minWidth: 150 }}>
        <Typography sx={{ color: grey[600] }}>
          <Box component="span" sx={{ color: cyan[900], fontWeight: "bold" }}>
            Title:
          </Box>{" "}
          {title}
        </Typography>
        <Typography sx={{ color: grey[600] }}>
          <Box component="span" sx={{ color: cyan[900], fontWeight: "bold" }}>
            Description:
          </Box>{" "}
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          position: "absolute",
          right: "0px",
          top: "-20px",
        }}
      >
        <BorderColorIcon
          sx={{
            color: cyan[900],
            cursor: "pointer",
            title: "Edit Announcement",
          }}
          onClick={() => {
            setAnnouncementId(_id);
            setOpen(true);
          }}
        />

        <Delete
          sx={{
            color: red[900],
            cursor: "pointer",
            title: "Delete Announcement",
          }}
          onClick={() => {
            setAnnouncementId(_id);
            setOpenDelete(true);
          }}
        />
      </Box>
    </Stack>
  </ListItem>
);
export default Announcement;
