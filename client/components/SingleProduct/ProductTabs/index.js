import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import TabPanel from './TabPanel';
import { getSingleProduct } from '../../../store/products/singleProduct';
import timeAgo from 'node-time-ago';
import StarRatings from 'react-star-ratings';

const ProductTabs = (props) => {
  const { product, match } = props;
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    contain: { marginTop: 60 },
    reviewInfo: { marginLeft: 10 },
    text: {
      marginTop: 10,
    },
    timeAgo: {
      marginLeft: 10,
      fontWeight: 200,
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.contain}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Description" />
        <Tab label="Reviews" />
      </Tabs>
      <Divider />
      <TabPanel value={value} index={0}>
        <Typography>{product.description}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {product.id
          ? product.reviews.map((review) => {
              return (
                <div key={review.id}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar />
                    </Grid>
                    <Grid item className={classes.reviewInfo}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Typography>{`${review.user.firstName} ${review.user.lastName}.`}</Typography>
                        <Typography className={classes.timeAgo} variant="body2">
                          {timeAgo(review.createdAt)}
                        </Typography>
                      </Box>
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#FFBF00"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="0px"
                        name="rating"
                      />
                    </Grid>
                  </Grid>
                  <Typography className={classes.text}>
                    {review.text}
                  </Typography>
                </div>
              );
            })
          : ''}
      </TabPanel>
    </div>
  );
};

export default ProductTabs;
