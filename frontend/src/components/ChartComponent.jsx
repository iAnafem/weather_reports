import React from "react";
import ReactEcharts from 'echarts-for-react';
import {useSelector} from "react-redux";
import moment from "moment";

export const ChartComponent = (props) => {
  const data = props.data;
  const loading = props.loading;
  const report = props.report;
  const currentCity = useSelector(state => state.currentCity);
  const fromDate = useSelector(state => state.from);
  const untilDate = useSelector(state => state.until);
  let xAxis = data.map(entry => moment(entry.date_of_report).format("DD.MM.YYYY"));
  let yAxis = data.map(entry => entry[report]);


  if (!loading) {
    return (
      <ReactEcharts
        style={{height: "40vh", left: 50, top: 50, width: "90vw"}}
        opts={{renderer: 'svg'}}
        option={
          {
            title: {
              text:
                `The readings of ${report} in ${currentCity} from ${
                  moment(fromDate).format("DD.MM.YYYY")
                } to ${
                  moment(untilDate).format("DD.MM.YYYY")
                }`,
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: ["React", "Angular", "Vue"]
            },
            showLoading: true,
            xAxis: {
              type: 'category',
              data: xAxis,
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              data: yAxis,
              type: 'line',
              smooth: true,
            }],
            grid: [{
              bottom: '20%'
            }, {
              top: '20%'
            }],
          }}
      />
    );
  } else {
    return (
      <div>

      </div>
    )
  }
};