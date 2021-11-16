/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  postCountry,
  loadCountries,
  deleteCountry,
} from '../../store/countries';

import {
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

class CreateCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      flag: '',
      latitude: '',
      longitude: '',
      err: '',
    };
    this.originalState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.load();
  }

  onChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  async onSave(ev) {
    const { create, history } = this.props;
    ev.preventDefault();
    try {
      const { name, flag, latitude, longitude } = this.state;
      await create({
        name,
        flag,
        latitude,
        longitude,
      });
      this.setState(this.originalState);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { name, flag, latitude, longitude } = this.state;
    const { onChange, onSave } = this;
    return (
      <div id="create-country">
        <h3>Add A Country:</h3>
        <form onSubmit={onSave} action="/">
          <TextField
            label="Name"
            required
            variant="outlined"
            name="name"
            value={name}
            onChange={onChange}
          />
          <br />

          <TextField
            label="Flag"
            required
            variant="outlined"
            name="flag"
            value={flag}
            onChange={onChange}
          />
          <br />

          <TextField
            label="Latitude"
            required
            variant="outlined"
            type="number"
            name="latitude"
            value={latitude}
            onChange={onChange}
          />
          <br />

          <TextField
            label="Longitude"
            required
            variant="outlined"
            type="number"
            name="longitude"
            value={longitude}
            onChange={onChange}
          />
          <br />
          <Button variant="outlined" id="quick-add" onClick={onSave}>
            Save
          </Button>
          <Button variant="outlined" id="quick-add">
            <Link to="/">Cancel</Link>
          </Button>
        </form>
        <div id="country list">
          <ul key="key">
            {this.props.countries.map((e) => {
              return (
                <div>
                  <ul id="country-manage" key={`${e.id}`}>
                    <li id="name">
                      {e.name}
                      <i className={`em ${e.flag}`} />
                    </li>
                    <li id="latitude">
                      Latitude: {e.latitude}, Longitude: {e.longitude}
                    </li>
                    <Button
                      variant="outlined"
                      id="quick-add"
                      onClick={() => {
                        this.props.delete(e.id);
                      }}
                    >
                      Delete
                    </Button>
                    <br />
                    <br />
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ countries }) => {
  return { countries };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (newCountry) => {
      return dispatch(postCountry(newCountry, history));
    },
    load: () => {
      return dispatch(loadCountries());
    },
    delete: (id) => {
      return dispatch(deleteCountry(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCountry);
