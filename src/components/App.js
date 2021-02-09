import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
  };

  addBurger = (burger) => {
    //1. Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    //2. Добавить новый бургер в объект burgers
    burgers[`burger${Date.now()}`] = burger;
    //3. Записать новый объект burgers в state
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
        />
      </div>
    );
  }
}
export default App;
