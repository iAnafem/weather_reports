import 'date-fns';
import React, {useState, useCallback, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {makeStyles} from "@material-ui/core/styles";
import * as indexActions from "../actions/indexActions";
import {useDispatch, useSelector} from "react-redux";


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
  const dateType = props.dateType;
  const initialDate = props.initialDate;
  const untilDate = useSelector(state => state.until);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const dispatch = useDispatch();
  const setDate = useCallback(
    (date, dateType) => dispatch(indexActions.setDate(date, dateType)), [dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date, dateType);
  };

  useEffect(
    () => {
      if (untilDate < selectedDate) {
        setSelectedDate(untilDate);
        setDate(untilDate, dateType);
      }
    }, [dateType, selectedDate, setDate, untilDate]
  );

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
          onChange={handleDateChange}
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