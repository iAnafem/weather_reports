import React, {useCallback, useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as indexActions from "../actions/indexActions";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const CitiesListComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fetchCities = useCallback(
    () => dispatch(indexActions.fetchCities()), [dispatch]
  );
  const currentCity = useSelector(state => state.currentCity);

  const [city, setCity] = useState(currentCity);

  const setCurrentCity = (city) => dispatch(indexActions.setCurrentCity(city));

  const handleChange = event => {
    setCity(event.target.value);
    setCurrentCity(event.target.value);
  };

  const cities = useSelector(state => state.cities);

  useEffect(() =>{
      fetchCities()
    }, [fetchCities]
  );


  if (!cities.isCitiesLoading) {
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            City
          </InputLabel>
          <Select
            MenuProps={{
              getContentAnchorEl: null,
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              }
            }}
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={city}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" >
              <Typography variant='body2'>
                <em>Choose a city</em>
              </Typography>
            </MenuItem>
            {cities.map((city, id) => (
              <MenuItem
                key={`city_${id}`}
                value={city.name}
              >
                <Typography variant='body2'>
                  {city.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
  return <div> </div>
};