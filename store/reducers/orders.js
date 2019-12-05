import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initalState = {
  orders: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
  }

  return state;
};
