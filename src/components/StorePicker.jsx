import React, { Component, Fragment } from "react";
import { getFunName } from "../helpers"; // generate a random fun store name

class StorePicker extends Component {
  myInput = React.createRef();

  goToStore = event => {
    event.preventDefault(); // stop the form from submitting
    const storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store →</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
