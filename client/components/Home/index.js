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
  console.log('products.products[0]:', products.products[0]);
  const theme = useTheme();
  const useStyles = makeStyles({
    button: {
      margin: '10px',
      textTransform: 'capitalize',
    },
    contain: { width: '90vw', height: '95vh' },
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
      marginTop: 150,
    },
    link: {
      fontSize: 'medium',
      fontFamily: theme.typography.fontFamily,
      margin: '3px 0px 3px 5px',
    },
    secondTitle: {
      fontSize: 35,
      fontWeight: 800,
      margin: '0px 0px 25px 0px',
    },
    subTitle: {
      fontSize: 26,
      fontWeight: 100,
    },
    welcome: {
      fontSize: 50,
      fontWeight: 900,
      margin: '150px 0px 25px 0px',
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
      <Box className={classes.contain}>
        <Grid container>
          <Grid item container xs={6}>
            <Grid>
              <Typography variant="h1" className={classes.welcome}>
                Delicious snacks from around the world
              </Typography>
              <Typography variant="h2" className={classes.subTitle}>
                Connecting world travellers with the places they love through
                the snacks they love
              </Typography>
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
            <Grid item container className={classes.homeCardContain}>
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

          {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Czh5f_nGC5M_EHN4KYNnLVIok4mHvkE&map_ids=4deaa8c67ed436b3&callback=initMap" /> */}
          <Grid item xs={6}>
            <img
              // className={classes.image}
              src="./assets/popcorn.jpg"
              alt="popcorn"
              width="500"
              height="500"
            ></img>
          </Grid>
        </Grid>

        {/* <Grid container direction="column" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Don't have an account yet?</Typography>
            <Link className={classes.link} href="/#/createaccount">
              Sign up now!
            </Link>
          </Box>
        </Grid> */}
      </Box>
      {/* <Map id="map"></Map> */}
    </Box>
  );
};

export default Home;
