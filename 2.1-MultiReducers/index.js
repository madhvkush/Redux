const redux = require("redux");

//#region Action Types
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";
//#endregion

//#region Action Creators
function buyCake(numOfCake) {
  return {
    type: BUY_CAKE,
    numOfBuying: numOfCake
  };
}
function reStockCake(numOfCake){
  return {
    type: RESTOCK_CAKE,
    numOfReStock: numOfCake
  };
}
function buyIceCream(numOfIceCream) {
  return {
    type: BUY_ICECREAM,
    numOfBuying: numOfIceCream
  };
}
function reStockIceCream(numOfIceCream){
  return {
    type: RESTOCK_ICECREAM,
    numOfReStock: numOfIceCream
  };
}
//#endregion

//#region  Initial States of Cake and IceCreams
const initialCake = {
  numOfCake: 10
};
const initialIceCream = {
  numOfIceCream: 10
};
//#endregion

//#region Reducers
const cakeReducer = (state = initialCake, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - action.numOfBuying
      };
    case RESTOCK_CAKE:
      return{
        ...state,
        numOfCake: state.numOfCake + action.numOfReStock
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCream, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - action.numOfBuying
      };
    case RESTOCK_ICECREAM:
      return{
        ...state,
        numOfIceCream: state.numOfIceCream + action.numOfReStock
      };
    default:
      return state;
  }
};
//#endregion

//#region  Compbine multiple Reducers as Root Reducer
const rootReducer = redux.combineReducers({
  Cake: cakeReducer,
  IceCream: iceCreamReducer
});
//#endregion

//#region  Create Store
const store = redux.createStore(rootReducer); // single object store
//#endregion

console.log("Initial Store", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated Store", store.getState())
);
store.dispatch(buyCake(2));
store.dispatch(buyIceCream(3));
store.dispatch(reStockCake(1));
store.dispatch(reStockIceCream(1));
unsubscribe();
