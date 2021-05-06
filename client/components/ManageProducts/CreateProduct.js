import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postProduct } from '../../store/products/products.js';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      brand: '',
      description: '',
      price: '',
      inventory: '',
      imageUrl: '',
      // location didn't work because location already references the current url
      countryId: '',
      categories: [],
    };
    this.originalState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    let { categories } = this.state;
    if (ev.target.name === 'categories') {
      categories = [...ev.target.selectedOptions].map((selected) => {
        return selected.value;
      });
    }
    change[ev.target.name] = ev.target.value;
    change.categories = categories;
    this.setState(change);
  }

  async onSave(ev) {
    const { create, history } = this.props;
    ev.preventDefault();
    try {
      const {
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
        categories,
      } = this.state;
      await create({
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
        categories,
      });

      this.setState(this.originalState);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
    } = this.state;
    const { onChange, onSave } = this;
    const { countries, categories } = this.props;

    return (
      <div id="create-product">
        <h3>Add A Product:</h3>
        <form onSubmit={onSave}>
          <label htmlFor="title">Title*:</label>
          <input name="title" value={title} onChange={onChange} />
          <br />

          <label htmlFor="brand">Brand*:</label>
          <input name="brand" value={brand} onChange={onChange} />
          <br />

          <label htmlFor="description">Description*:</label>
          <input name="description" value={description} onChange={onChange} />
          <br />

          <label htmlFor="price">Price:*</label>
          <input
            name="price"
            value={price}
            type="number"
            min="0"
            onChange={onChange}
          />
          <br />

          <label htmlFor="inventory">Inventory*:</label>
          <input
            name="inventory"
            value={inventory}
            type="number"
            min="1"
            onChange={onChange}
          />
          <br />

          <label htmlFor="imageUrl">Image Url*:</label>
          <input name="imageUrl" value={imageUrl} onChange={onChange} />
          <br />

          <label htmlFor="countryId">Country*:</label>
          <select defaultValue="default" name="countryId" onChange={onChange}>
            <option value="default">--Select Country--</option>
            {countries.map((country) => {
              return (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <br />

          <label htmlFor="categories">Pick the categories:</label>
          <select name="categories" onChange={onChange} multiple>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <br />
          <button type="submit">Create Product</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (newProduct) => {
      return dispatch(postProduct(newProduct, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
