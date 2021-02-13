import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import PropTypes from "prop-types";

class MenuAdmin extends React.Component {
  static propTypes = {
    burgers: PropTypes.object,
    loadSampleBurgers: PropTypes.func,
    addBurger: PropTypes.func,
    updateBurger: PropTypes.func,
    deleteBurger: PropTypes.func,
  };

  render() {
    const { burgers } = this.props;

    const burgerForms = Object.keys(burgers).map((key) => (
      <EditBurgerForm
        key={key}
        index={key}
        burger={burgers[key]}
        updateBurger={this.props.updateBurger}
        deleteBurger={this.props.deleteBurger}
      />
    ));

    return (
      <div className="menu-admin">
        <h2>Управление меню</h2>
        {burgerForms}
        <AddBurgerForm addBurger={this.props.addBurger} />
        <button onClick={this.props.loadSampleBurgers}>
          Загрузить бургеры
        </button>
      </div>
    );
  }
}
export default MenuAdmin;
