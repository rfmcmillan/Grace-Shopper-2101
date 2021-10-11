import React from 'react';
import { Box, Button, Typography, Grid, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import Map from '../Map';

const Home = () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    welcome: {
      fontSize: 26,
      fontWeight: 700,
      marginBottom: 40,
    },
    button: {
      margin: '10px',
    },
    home: {
      backgroundColor: theme.palette.background.default,
    },
    link: {
      // color: theme.palette.text.primary,
      fontSize: 'medium',
      fontFamily: theme.typography.fontFamily,
      margin: '3px 0px 3px 5px',
    },
  });

  const classes = useStyles();

  return (
    <div id="test" className={classes.home}>
      <div id="home">
        <Typography variant="h1" className={classes.welcome}>
          Welcome to the Global Snacker
        </Typography>
        <Map id="map"></Map>
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Czh5f_nGC5M_EHN4KYNnLVIok4mHvkE&map_ids=4deaa8c67ed436b3&callback=initMap" /> */}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <form action="/#/products">
              <Button
                className={classes.button}
                variant="contained"
                color="default"
                type="submit"
              >
                All Snacks
              </Button>
            </form>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Link className={classes.link} href="/#/login">
                Log In
              </Link>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Don't have an account yet?</Typography>
                <Link className={classes.link} href="/#/createaccount">
                  Sign up now!
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
