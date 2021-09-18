const redux = require("redux");
const reduxLogger = require("redux-logger"); // logger middleware
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware // this method allow to bind middleware with store

//Action Type
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake(numOfCake) {
  return {
    type: BUY_CAKE,
    numOfBuying: numOfCake
  };
}

function buyIceCream(numOfIceCream) {
  return {
    type: BUY_ICECREAM,
    numOfBuying: numOfIceCream
  };
}

const initialCake = {
  numOfCake: 10
};
const initialIceCream = {
  numOfIceCream: 10
};

const cakeReducer = (state = initialCake, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - action.numOfBuying
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
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  Cake: cakeReducer,
  IceCream: iceCreamReducer
});
const store = redux.createStore(rootReducer, applyMiddleware(logger)); // single object store

const unsubscribe = store.subscribe(() => { });
store.dispatch(buyCake(2));
store.dispatch(buyIceCream(3));
unsubscribe();
