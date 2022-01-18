import type { NextPage } from "next";
import React from 'react';
import Head from "next/head";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import PageAppBar from './AppBar/PageAppBar';
import SideBar from './AppBar/SideBar';
import MainPanel from './AppBar/MainPanel';

const drawerWidth = 240;

const Home: NextPage = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PageAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}

      />
      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainPanel
        drawerWidth={drawerWidth}
      />
    </Box >
  );
};

export default Home;
