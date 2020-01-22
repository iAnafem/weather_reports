import React, {useCallback, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import * as indexActions from '../actions/indexActions'
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {CalendarComponent} from "./CalendarComponent";
import {CitiesListComponent} from "./CitiesListComponent";
import reportTypes from "../constants/reportTypes";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  mainPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },

  checkbox: {
    textAlign: 'right',
    display: 'inline-grid',
    alignContent: 'space-around',
  },
  labelText: {
    display: 'inline-grid',
    alignContent: 'space-around',
  },
  buttons: {
    alignContent: 'space-around',
    display: 'inline-grid',
  }


}));


const IndexPageContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const currentCity = state.currentCity;
  const fromDate = state.from;
  const untilDate = state.until;
  const fetchReportData = useCallback(
    (reportType) => dispatch(indexActions.fetchReportData(
      reportType, 
      fromDate,
      untilDate,
      currentCity,
    )), [currentCity, dispatch, fromDate, untilDate]);

  useEffect(
    () => {
      if (currentCity !== '') {
        fetchReportData(reportTypes.TEMPERATURE);
        fetchReportData(reportTypes.PRESSURE);
        fetchReportData(reportTypes.HUMIDITY);
      }
    }, [currentCity, fetchReportData]
  );

  return (
    <Paper className={classes.mainPaper}>
      <Grid container className={classes.root}>
        <Grid container direction={'row'}>
          <Grid item xs={1} className={classes.checkbox}>
            <CitiesListComponent/>
          </Grid>
          <Grid item xs={1} className={classes.labelText}>
          </Grid>
          <Grid item xs={2}>
            <CalendarComponent label={'From'} initialDate={state.from} dateType={'from'}/>
          </Grid>
          <Grid item xs={2}>
            <CalendarComponent label={'Until'} initialDate={state.until} dateType={'until'}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default IndexPageContainer