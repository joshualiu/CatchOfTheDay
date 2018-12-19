import React, { Component } from "react";
import PropTypes from "prop-types";

class AddFishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imgRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  };

  createFish = e => {
    e.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      img: this.imgRef.value.value
    };
    this.props.addFish(fish);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="available">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input name="image" ref={this.imgRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
