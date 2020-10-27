import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function CommitHistory(commitActivityData) {
    const chartdata = []
    commitActivityData['commitActivityData'].forEach(week => {
        const currentDate = new Date(week['week'] * 1000);
        chartdata.push({
            x: Date.UTC(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ),
            y: week['total']
        });
    });
    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
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
            data: chartdata,
            color: '#4C00A4'
        }]
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    )
}

export default CommitHistory;
