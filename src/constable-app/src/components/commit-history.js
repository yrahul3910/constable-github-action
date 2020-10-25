import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function CommitHistory(commitActivityData) {
    const timestampData = [];
    const commitTotalData = [];
    commitActivityData['commitActivityData'].forEach(week => {
        timestampData.push(week['week']);
        commitTotalData.push(week['total']);
    });
    console.log(timestampData)
    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Code Commit Trend'
        },
        subtitle: {
            text: 'Number of commits by week'
        },
        xAxis: {
            categories: commitActivityData,
            crosshair: true,
            type: 'datetime'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of commits'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Commits',
            data: commitTotalData
        }]
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    )
}

export default CommitHistory;
