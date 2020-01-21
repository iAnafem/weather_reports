import indexActionsTypes from "../constants/indexActionsTypes";
import reportTypes from "../constants/reportTypes";

const types = indexActionsTypes;
const report = reportTypes;

const initialState = {
  cities : [],
  isCitiesLoading: true,
  from: new Date('01-01-2020'),
  until: new Date('01-20-2020'),
  temperature: [],
  isTempLoading: true,
  pressure: [],
  isPressLoading: true,
  humidity: [],
  isHumidLoading: true,
  currentCity: '',
};

const indexReducer = (state=initialState, action) => {

  switch(action.type) {

    case types.FETCH_CITIES:
      return {...state, cities: [...action.payload]};

    case types.FETCH_REPORTS_DATA:
      if (action.filter === report.TEMPERATURE) {
        return {...state, temperature: [...action.payload], isTempLoading: false};
      } else if (action.filter === report.PRESSURE) {
        return {...state, pressure: [...action.payload], isPressLoading: false};
      } else if (action.filter === report.HUMIDITY) {
        return {...state, humidity: [...action.payload], isHumidLoading: false};
      }
      break;

    case types.SET_FROM_DATE:
      return {...state, from: action.payload};

    case types.SET_UNTIL_DATE:
      return {...state, until: action.payload};

    case types.SET_CURRENT_CITY:
      return {...state, currentCity: action.payload};

    default:
      return state
  }
};

export default indexReducer;