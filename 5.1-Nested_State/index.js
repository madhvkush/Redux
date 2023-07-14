const redux = require("redux");

//#region  Initial State
initialState = {
    name:'Madhvendra',
    email: 'madhv.net@gmail.com',
    address: {
        street: 'R-32',
        City: 'Ghaziabad',
        State : 'UP'
    }
}
//#endregion

//#region  Action Types
UPDATE_ADDRESS = 'UPDATE_ADDRESS';
//#endregion

//#region Action Creator
function updateStreet (street){
    return {
        type: UPDATE_ADDRESS,
        payload: street,
    }
}
//#endregion

//#region  Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ADDRESS:
        return {
          ...state,
          street: {
            ...state.address,  //TODO Make a copy of adress using spread operator then change street
            street: action.payload,
          }
        };
      default:
        return state;
    }
  };
//#endregion


const store=redux.createStore(reducer);
console.log('Inital State', store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated Store", store.getState())
);
store.dispatch(updateStreet('R-25'));
unsubscribe();

