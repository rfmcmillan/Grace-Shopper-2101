/*eslint-disable*/

import React from 'react';
import axios from 'axios';

class NewReview extends React.Component {
  constructor({ productId, userId }) {
    super();
    this.state = {
      text: '',
      rating: 1,
      userId,
      productId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(ev) {
    const form = ev.target;
    ev.preventDefault();
    const newReview = { ...this.state };
    await axios.post('/api/reviews', newReview);
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
    console.log(this.state);
  }
  render() {
    return (
      <div className="form">
        <h4>Add A Review</h4>
        <form className="newReview" onSubmit={this.handleSubmit}>
          <label htmlFor="review">Rating</label>
          <input
            name="text"
            type="text"
            placeholder="Review"
            onChange={this.handleChange}
          />

          <label htmlFor="rating">Rating</label>
          <input
            name="rating"
            type="number"
            placeholder="Rating"
            min="1"
            max="5"
            defaultValue="1"
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NewReview;
