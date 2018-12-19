import React, { Component } from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import PropTypes from "prop-types";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    };
  }

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate the localstorage:
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // add new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //set new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // take copy of current state
    const fishes = { ...this.state.fishes };
    // update the state
    fishes[key] = updatedFish;
    // set it to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // take copy of the current state
    const fishes = { ...this.state.fishes };
    // update state, set the fish to null if we want to delete, firebase will delete if it's null
    fishes[key] = null;
    // update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // take copy of the state
    const order = { ...this.state.order };
    // either add to the order, or update the number in the order
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updatedFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;
