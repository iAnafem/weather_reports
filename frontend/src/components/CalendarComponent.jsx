import 'date-fns';
import React, {useCallback, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {makeStyles} from "@material-ui/core/styles";
import * as indexActions from "../actions/indexActions";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '75%',
    font: 'small',
    '& .MuiInputBase-input': {
      font: 'small'
    },
    margin: theme.spacing(2)
  },
  resize: {
    fontSize: '0.875rem'
  }
}));

export const CalendarComponent = (props) => {
  const classes = useStyles();
  const label = props.label;
  const today = new Date();
  const currentFilter = props.filter;
  // const initialDate = props.initialDate;
  const untilDate = useSelector(state => state.until);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const dispatch = useDispatch();
  // const setFilter = useCallback(
  //   (currentFilter, fieldValue) => dispatch(indexActions.setFilter(currentFilter, fieldValue)), [dispatch]);
  //
  // const clearButton = useSelector(state => state.clearButton);
  // const disableClearButton = useCallback(
  //   () => dispatch(indexActions.disableClearButton()), [dispatch]);

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  //   setFilter(currentFilter, moment(date).format("YYYY-MM-DD"));
  // };

  // useEffect(
  //   () => {
  //     setSelectedDate(initialDate);
  //     disableClearButton();
  //   }, [clearButton, disableClearButton, initialDate],
  // );

  // useEffect(
  //   () => {
  //     if (untilDate < selectedDate) {
  //       setSelectedDate(untilDate);
  //       setFilter(currentFilter, moment(untilDate).format("YYYY-MM-DD"));
  //     }
  //   }, [currentFilter, selectedDate, setFilter, untilDate]
  // );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          className={classes.formControl}
          margin="normal"
          maxDate={today}
          label={label}
          format="dd-MM-yyyy"
          value={selectedDate}
          // onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};