import axios from 'axios';
import React, { Component } from 'react';
import { updateProduct } from '../../store/products/products.js';
import { loadCountries } from '../../store/countries';
import { connect } from 'react-redux';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      title: '',
      brand: '',
      description: '',
      price: 0,
      inventory: 0,
      imageUrl: '',
      countryId: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getCurrProduct = this.getCurrProduct.bind(this);
  }

  componentDidMount() {
    this.getCurrProduct();
    this.props.loadCountries();
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    const { history, update } = this.props;
    ev.preventDefault();
    const { id } = this.props.match.params;
    try {
      const {
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
      } = this.state;
      update({
        id,
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
      });

      history.push('/manage-products');
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  async getCurrProduct() {
    const { id } = this.props.match.params;
    const currProduct = (await axios.get(`/api/products/${id}`)).data;
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
    } = currProduct;
    this.setState({
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
    });
  }

  render() {
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      reqCountry,
    } = this.state;
    const { onChange, onSave } = this;
    const { countries } = this.props;
    return (
      <div id="edit-product">
        <h3>Edit Product:</h3>
        <img src={imageUrl} alt="snack" width="100" />
        <form onSubmit={onSave}>
          <label>Title*:</label>
          <input name="title" value={title} onChange={onChange} />
          <br />
          <label>Brand*:</label>
          <input name="brand" value={brand} onChange={onChange} />
          <br />
          <label>Description*:</label>
          <input name="description" value={description} onChange={onChange} />
          <br />
          <label>Price:*</label>
          <input name="price" type="number" value={price} onChange={onChange} />
          <br />
          <label>Inventory*:</label>
          <input
            name="inventory"
            value={inventory}
            type="number"
            onChange={onChange}
          />
          <br />
          <label>Image Url*:</label>
          <input name="imageUrl" value={imageUrl} onChange={onChange} />
          <br />
          <label>Country*:</label>
          <select name="countryId" onChange={onChange}>
            {countries.map((country, idx) => {
              return (
                <option key={idx} value={country.id}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <br />
          <button>Submit Changes</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (updatedProduct) =>
      dispatch(updateProduct(updatedProduct, history)),
    loadCountries: () => dispatch(loadCountries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
