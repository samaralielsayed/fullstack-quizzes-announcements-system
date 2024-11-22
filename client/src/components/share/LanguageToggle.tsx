import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageContext } from "../../providers/LanguageContext";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const LanguageToggle: React.FC = () => {
  const { toggleLanguage, t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    toggleLanguage(lang);
    const newPathname = `/${lang}${location.pathname.replace(
      /^\/(en|ar)/,
      ""
    )}`;
    navigate(newPathname);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="primary"
        sx={{
          borderRadius: "50%",
          padding: "10px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleLanguageChange("en")}>
          {t("english")}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ar")}>
          {t("arabic")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageToggle;
