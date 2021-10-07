import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Grid, Tabs, Tab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  console.log('children:', children);
  console.log('other:', other);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
