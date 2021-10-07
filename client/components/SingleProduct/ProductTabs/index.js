import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Grid, Tabs, Tab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import TabPanel from './TabPanel';
import { getSingleProduct } from '../../../store/products/singleProduct';

const ProductTabs = (props) => {
  const { product, match } = props;
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // let reviewDisplays;
  // if (product.id) {
  //   reviewDisplays = product.reviews.map((review) => {
  //     return <div key={review.id}>{review.text}</div>;
  //   });
  //   console.log(reviewDisplays);
  // }
  if (product.id) {
    console.log(product.reviews);
  }
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Description" />
        <Tab label="Reviews" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>{product.description}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {product.id
          ? product.reviews.map((review) => {
              return (
                <div key={review.id}>
                  <Typography>{`${review.user.firstName} ${review.user.lastName}`}</Typography>
                  <Typography>{review.text}</Typography>
                </div>
              );
            })
          : ''}
      </TabPanel>
    </div>
  );
};

export default ProductTabs;
