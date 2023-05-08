import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  ListItemIcon,
  ListItemButton,
  Divider,
  ListItem,
} from "@mui/material";
import { BarChartRounded, TextFields } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiDrawer-paper": {
    marginTop: "40px",
    backgroundColor: "#08050b",
  },

  "& .MuiSvgIcon-root": {
    color: "#ff7272",
  },
}));

export const SidePanel = function () {
  const nav = useNavigate();
  return (
    <Drawer variant="permanent">
      <List>
        {["Inbox", "Starred"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? (
                  <BarChartRounded onClick={() => nav("/admin/one-view")} />
                ) : (
                  <TextFields onClick={() => nav("/admin/hello-world")} />
                )}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};
