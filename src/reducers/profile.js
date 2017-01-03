export default function(state = {}, action) {
  switch(action.type) {
    case 'GET_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
