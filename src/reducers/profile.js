export default function(state = {}, action) {
  console.log('reducers/profile action.payload : ', action.payload);
  switch(action.type) {
    case 'GET_USER':
      return Object.assign({}, ...state, {
        name: action.payload.name,
        sex: action.payload.sex,
        age: action.payload.age,
        city: action.payload.city
      });
    default:
      return state;
  }
}
