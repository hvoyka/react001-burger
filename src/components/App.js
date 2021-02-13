import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "./../base";

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    //get orders from localStorage

    const localStorageRef = localStorage.getItem(params.restaurantId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: "burgers",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBurger = (burger) => {
    const burgers = { ...this.state.burgers };
    burgers[`burger${Date.now()}`] = burger;
    this.setState({ burgers });
  };

  updateBurger = (key, updatedBurger) => {
    const burgers = { ...this.state.burgers };
    burgers[key] = updatedBurger;
    this.setState({ burgers });
  };

  loadSampleBurgers = () => {
    const burgers = { ...this.state.burgers, ...sampleBurgers };
    this.setState({ burgers });
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = (order[key] || 0) + 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Very Hot Burger" />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  details={this.state.burgers[key]}
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>
        <Order burgers={this.state.burgers} order={this.state.order} />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          updateBurger={this.updateBurger}
          burgers={this.state.burgers}
        />
      </div>
    );
  }
}
export default App;
