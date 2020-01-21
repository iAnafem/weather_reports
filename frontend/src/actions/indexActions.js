import indexActionsTypes from "../constants/indexActionsTypes";
import moment from "moment";


const types = indexActionsTypes;


export const fetchCities = () => {

  return (dispatch) => {
    let headers = {"Content-Type": "application/json"};

    return fetch(`/api/cities/`,
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

    return fetch(`/api/reports/?from=${
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