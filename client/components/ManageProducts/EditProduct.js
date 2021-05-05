import axios from 'axios';
import React, { Component } from 'react';

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
      reqCountry: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getCurrProduct = this.getCurrProduct.bind(this);
  }

  componentDidMount() {
    this.getCurrProduct();
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    const { history } = this.props;
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
        reqCountry,
      } = this.state;

      const currProduct = (
        await axios.put(`/api/products/${id}`, {
          title,
          brand,
          description,
          price,
          inventory,
          imageUrl,
          reqCountry,
        })
      ).data;
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
      reqCountry,
    } = currProduct;
    this.setState({
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      reqCountry,
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
          <input name="price" value={price} onChange={onChange} />
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
          <input name="reqCountry" value={reqCountry} onChange={onChange} />
          <br />
          <button>Submit Changes</button>
        </form>
      </div>
    );
  }
}

export default EditProduct;
