
import {GET_ITEMS, DELETE_ITEM, ADD_ITEM,SET_LOADING} from '../actions/types.js'

const initState ={
  items:[],
  loading: false,
};

export default function itemReducer(state = initState , action){
  switch (action.type){
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
      case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter( item => item._id !== action.payload)
      };
      case ADD_ITEM:
      return{
        ...state,
        items:[action.payload ,...state.items]
      }
      case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
    return state;
  }
}