// npm init --yes   {initialize npm}
// npm install redux
//node index   {for showing output}
console.log("Index Page");
const redux = require("redux"); // importing redux library
//Action Type
const BUY_CAKE = "BUY_CAKE";
//Action Creator
function buyCake(numOfCake) {
  return {
    type: BUY_CAKE,
    numOfBuying: numOfCake
  };
}

//Initial State
const initialState = {
  numOfCake: 10
};

const reducer = (state = initialState, action) => {
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
const store = redux.createStore(reducer); //create a single store
console.log("Initial CaKe Number:", store.getState().numOfCake);
const unsubscribe = store.subscribe(() =>
  console.log("Remaining Cake Number", store.getState().numOfCake)
);
store.dispatch(buyCake(2)); // buy 2-cake
store.dispatch(buyCake(5)); // buy 5-cake
unsubscribe();
