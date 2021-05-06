import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../../store/orders';

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      complete: false,
      date_of_purchase: '',
      purchased_items: {},
      userId: '',
      status: '',
      products: [],
      total: 0,
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getCurrOrder = this.getCurrOrder.bind(this);
    this.getOrderTotal = this.getOrderTotal.bind(this);
  }

  async componentDidMount() {
    await this.getCurrOrder();
    this.getOrderTotal();
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  //start here
  async onSave(ev) {
    const { history, update } = this.props;
    ev.preventDefault();
    const { id } = this.props.match.params;
    try {
      const {
        id,
        complete,
        date_of_purchase,
        purchased_items,
        userId,
        status,
        products,
        total,
      } = this.state;
      update({
        id,
        complete,
        date_of_purchase,
        purchased_items,
        userId,
        status,
        products,
        total,
      });

      history.push('/manage-orders');
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  async getCurrOrder() {
    const { id } = this.props.match.params;
    const currOrder = (await axios.get(`/api/order/orders/${id}`)).data;
    const {
      complete,
      date_of_purchase,
      purchased_items,
      userId,
      status,
      products,
      total,
    } = currOrder;
    this.setState({
      id,
      complete,
      date_of_purchase,
      purchased_items,
      userId,
      status,
      products,
      total,
    });
  }

  getOrderTotal() {
    console.log(this.props);
  }
  render() {
    const {
      id,
      complete,
      date_of_purchase,
      purchased_items,
      userId,
      status,
      products,
      total,
    } = this.state;
    console.log('products', products);
    const { onChange, onSave } = this;
    return (
      <div id="edit-order">
        <h3>Edit Order:</h3>
        <form onSubmit={onSave}>
          <label>Order ID: </label>
          <span>{id}</span>
          <br />
          <span>User ID: {userId}</span>
          <br />
          <label>Date:*</label>
          <input
            name="date_of_purchase"
            value={date_of_purchase || ''}
            type="date"
            onChange={onChange}
          />
          <br />
          <span>
            Order Total: $
            {products
              ? products.reduce((total, product) => {
                  return (total += product.price * 1);
                }, 0)
              : '0.00'}
          </span>
          <br />
          <label>Complete:</label>
          <input name="complete" onChange={onChange} type="checkbox" />
          <br />
          <ul>
            Items:{' '}
            {products.map((product, idx) => {
              return (
                <li key={`name-${idx}`}>
                  {product.brand} {product.title} ${product.price}
                </li>
              );
            })}
          </ul>
          <br />
          <label>Status:</label>
          <select name="status" value={status} onChange={onChange}>
            <option key="created" value="Created">
              Created
            </option>
            <option key="processing" value="Processing">
              Processing
            </option>
            <option key="complete" value="Complete">
              Complete
            </option>
            <option key="cancelled" value="Cancelled">
              Cancelled
            </option>
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
    update: (updatedOrder) => dispatch(updateOrder(updatedOrder, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
