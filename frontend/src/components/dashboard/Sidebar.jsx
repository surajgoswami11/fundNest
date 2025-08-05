"use client";

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import MenuItem from "../constant/MenuItem";

const Sidebar = () => {
  const { user } = useAuth();
  const [openItems, setOpenItems] = useState({});
  const handleClick = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const renderMenuItems = (items) => {
    return items
      .filter((item) => item.roles.includes(user.role))
      .map((item) => {
        const isOpen = openItems[item.id];
        return (
          <React.Fragment key={item.id}>
            <ListItem
              button
              onClick={() => item.children && handleClick(item.id)}
              component={item.children ? "div" : Link}
              href={item.children ? "#" : item.href}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {item.children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.children && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderMenuItems(item.children)}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      });
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1e3a8a",
          color: "white",
        },
      }}
    >
      <List>{renderMenuItems(MenuItem)}</List>
    </Drawer>
  );
};
export default Sidebar;
