import indexActionsTypes from "../constants/indexActionsTypes";
import moment from "moment";
import API_URL from "../constants/apiUrl";

const types = indexActionsTypes;

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


export const fetchReportData = (reportType, fromDate, untilDate, city) => {

  return (dispatch) => {
    let headers = {"Content-Type": "application/json"};

    return fetch(`${API_URL}/api/${reportType}-report?from=${
        moment(fromDate).format("YYYY-MM-DD HH:mm:ss")
      }&until=${
        moment(untilDate).format("YYYY-MM-DD HH:mm:ss")
      }&city=${city}`, {headers,}
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
            type: types.FETCH_REPORT_DATA,
            payload: result.data,
            filter: reportType
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
