import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton selected={category === selectedCategory} onClick={() => onCategorySelect(category)}>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default Sidebar;
