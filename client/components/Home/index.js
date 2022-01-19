import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Link,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  ArrowRightAlt,
  ArrowRightAltSharp,
  ArrowRight,
} from '@material-ui/icons';
import { loadProducts } from '../../store/products/products';
import Map from '../Map';
import HomeCard from './HomeCard';

const Home = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const theme = useTheme();
  const useStyles = makeStyles({
    button: {
      margin: '10px',
      textTransform: 'capitalize',
    },
    contain: {
      width: '90vw',
      height: '95vh',
      backgroundColor: theme.palette.background.default,
    },
    exploreButton: {
      borderRadius: 10,
      backgroundColor: 'black',
      color: 'white',
      textTransform: 'capitalize',
      fontWeight: 100,
      marginTop: 30,
      boxShadow: '0px 10px 10px #b3b3b3',
      height: 45,
      fontSize: 16,
    },
    home: {
      backgroundColor: theme.palette.background.default,
    },
    homeCardContain: {
      maxWidth: 650,
      [theme.breakpoints.down('lg')]: {
        maxWidth: 500,
      },
    },
    link: {
      fontSize: 'medium',
      fontFamily: theme.typography.fontFamily,
      margin: '3px 0px 3px 5px',
    },
    map: {
      [theme.breakpoints.down('lg')]: {
        height: 200,
      },
    },
    subTitle: {
      fontSize: 26,
      fontWeight: 100,
      margin: '30px 100px 0px 0px',
    },
    welcome: {
      fontSize: 50,
      fontWeight: 900,
      marginRight: 50,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <Box
      className={classes.home}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* <Box> */}
      <Grid className={classes.contain} container>
        <Grid
          item
          container
          xs={6}
          alignItems="flex-start"
          justifyContent="flex-start"
          direction="column"
        >
          <Grid item xs={1} />
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="h1" className={classes.welcome}>
                Delicious snacks from around the world
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2" className={classes.subTitle}>
                Connecting world travelers with the places they love through the
                snacks they love
              </Typography>
            </Grid>
            <Grid item>
              <form action="/#/products">
                <Button
                  className={classes.exploreButton}
                  variant="contained"
                  type="submit"
                >
                  Explore Our Snacks
                  <ArrowRightAltSharp />
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <Grid
            item
            container
            className={classes.homeCardContain}
            justifyContent="space-around"
            xs={4}
          >
            <Grid item>
              {products.products.length ? (
                <HomeCard product={products.products[0]} />
              ) : (
                ''
              )}
            </Grid>
            <Grid item>
              {products.products.length ? (
                <HomeCard product={products.products[1]} />
              ) : (
                ''
              )}
            </Grid>
            <Grid item>
              {products.products.length ? (
                <HomeCard product={products.products[2]} />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>
        {/*
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Czh5f_nGC5M_EHN4KYNnLVIok4mHvkE&map_ids=4deaa8c67ed436b3&callback=initMap" /> */}
        <Grid className={classes.map} item xs={6}>
          <Map />
        </Grid>
      </Grid>
      {/* </Box> */}
    </Box>
  );
};

export default Home;
