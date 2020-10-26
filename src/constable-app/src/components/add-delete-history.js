import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function AddDeleteHistory(additionDeletionData) {
    const additionData = []
    const deletionData = []
    additionDeletionData['additionDeletionData'].forEach(week => {
        const currentDate = new Date(week[0] * 1000);
        additionData.push({
            x: Date.UTC(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ),
            y: week[1]
        });
        deletionData.push({
            x: Date.UTC(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ),
            y: week[2]
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
            title: {
                text: 'Number of lines of code'
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
            name: 'Additions',
            data: additionData,
            color: '#009688'
        },
        {
            name: 'Deletions',
            data: deletionData,
            color: '#c62828'
        },
        ]
    };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    )
}

export default AddDeleteHistory;
