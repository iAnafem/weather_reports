import indexActionsTypes from "../constants/indexActionsTypes";
import moment from "moment";


const types = indexActionsTypes;

const API_URL = 'http://127.0.0.1:8000';

export const fetchCities = () => {

  return (dispatch) => {
    let headers = {"Content-Type": "application/json"};

    return fetch(`${API_URL}/api/cities`,
      {headers,}
    )
      .then(result => {
        if (result.status < 500) {
          return result.json().then(data => {
            return {status: result.status, data};
          })
        } else {
          console.log("Server Error!");
          throw result;
        }
      })
      .then(result => {
        if (result.status === 200) {
          return dispatch({type: types.FETCH_CITIES, payload: result.data});
        }
      })
  }
};


export const fetchReportsData = (state) => {
  const from = state.from;
  const until = state.until;
  const city = state.city;
  const filter = state.filter;

  return (dispatch) => {
    let headers = {"Content-Type": "application/json"};

    return fetch(`${API_URL}/api/reports/?from=${
        moment(from).format("YYYY-MM-DD HH:mm:ss")
      }&until=${
        moment(until).format("YYYY-MM-DD HH:mm:ss")
      }&city=${city}&filter=${filter}`, {headers,}
    )
      .then(result => {
        if (result.status < 500) {
          return result.json().then(data => {
            return {status: result.status, data};
          })
        } else {
          console.log("Server Error!");
          throw result;
        }
      })
      .then(result => {
        if (result.status === 200) {
          return dispatch({
            type: types.FETCH_REPORTS_DATA,
            payload: result.data,
            filter: filter
          });
        }
      })
  }
};

export const setCurrentCity = (city) => {

  return (dispatch) => {
    return dispatch({
      type: types.SET_CURRENT_CITY,
      payload: city
    })
  }
};

export const setDate = (date, dateType) => {
  let actionType = types.SET_FROM_DATE;
  if (dateType === "until") {
    actionType = types.SET_UNTIL_DATE
  }
  return (dispatch) => {
    return dispatch({
      type: actionType,
      payload: date
    })
  }
};
