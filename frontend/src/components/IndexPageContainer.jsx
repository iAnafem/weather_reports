import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import * as indexActions from '../actions/indexActions'
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {CalendarComponent} from "./CalendarComponent";
import {CitiesListComponent} from "./CitiesListComponent";

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
  // const fetchVisitedPages = (state) => dispatch(indexActions.fetchVisitedPages(state));
  // const clearState = () => dispatch(indexActions.clearState());
  // const state = useSelector(state => state);
  //
  // const filters = filtersAndGroupsNames;
  //
  // const handleGoClick = (state) => {
  //   fetchVisitedPages(state)
  // };
  //
  // const handleClearClick = () => {
  //   clearState();
  // };

  return (
    <Paper className={classes.mainPaper}>
      <Grid container className={classes.root}>
        <Grid container direction={'row'}>
          <Grid item xs={1} className={classes.checkbox}>
            <CitiesListComponent/>
          </Grid>
          <Grid item xs={1} className={classes.labelText}>
            <Typography>
              Date filter
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {/*<CalendarComponent label={'From'} initialDate={state.from} filter={new Date()} maxDate={state.until}/>*/}
            <CalendarComponent label={'From'}/>
          </Grid>
          <Grid item xs={2}>
            {/*<CalendarComponent label={'Until'} initialDate={state.until} filter={filters.untilDate}/>*/}
            <CalendarComponent label={'Until'}/>
          </Grid>
          <Grid item xs={1} className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              // onClick={() => handleGoClick(state)}
            >
              Go!
            </Button>
          </Grid>
          <Grid item xs={1} className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              // onClick={() => handleClearClick()}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default IndexPageContainer