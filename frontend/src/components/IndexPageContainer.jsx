import React, {useCallback, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import * as indexActions from '../actions/indexActions'
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {CalendarComponent} from "./CalendarComponent";
import {CitiesListComponent} from "./CitiesListComponent";
import reportTypes from "../constants/reportTypes";
import {ChartComponent} from "./ChartComponent";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  headers: {
    margin: 'auto',
    padding: theme.spacing(5),
  },
  mainPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  citiesList: {
    textAlign: 'center',
    display: 'inline-grid',
    alignContent: 'space-around',
  },
  labelText: {
    display: 'inline-grid',
    alignContent: 'space-around',
  },
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
          <Typography variant='h5' align='center' className={classes.headers}>
            Welcome to the Weather Reporter web service!
          </Typography>
        </Grid>
        {state.isTempLoading &&
        <Grid container direction={'row'}>
          <Typography variant='subtitle2' align='center' className={classes.headers}>
            To see weather reports choose a city and dates, please
          </Typography>
        </Grid>
        }
        <Grid container direction={'row'}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={2} className={classes.citiesList}>
            <CitiesListComponent/>
          </Grid>
          <Grid item xs={2}>
            <CalendarComponent label={'From'} initialDate={state.from} dateType={'from'}/>
          </Grid>
          <Grid item xs={2}>
            <CalendarComponent label={'Until'} initialDate={state.until} dateType={'until'}/>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
        <Grid container direction={'row'}>
          <ChartComponent
            data={state.temperature}
            loading={state.isTempLoading}
            report={reportTypes.TEMPERATURE}
          />
          <ChartComponent
            data={state.pressure}
            loading={state.isPressLoading}
            report={reportTypes.PRESSURE}
          />
          <ChartComponent
            data={state.humidity}
            loading={state.isHumidLoading}
            report={reportTypes.HUMIDITY}
          />
        </Grid>
      </Grid>
    </Paper>
  )
};

export default IndexPageContainer