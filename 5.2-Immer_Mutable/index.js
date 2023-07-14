const redux = require("redux");
const produce = require('immer').produce;

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
        // return {
        //   ...state,
        //   street: {
        //     ...state.address,  
        //     street: action.payload,
        //   }
        // };
        return produce(state,(draft)=>{
          draft.address.street=action.payload //TODO Directly mutate state
        })
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

