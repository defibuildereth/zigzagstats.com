import React, { useState, useEffect } from 'react'
import { Chart } from 'react-chartjs-2';
import "chartjs-adapter-moment";

import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    CategoryScale,
} from 'chart.js';

const VolumeChart = ({volume}) => {

    ChartJS.register(
        TimeScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        CategoryScale,
        Title,
        Tooltip,
        Legend
    );

    const makeVolumeInfo = function (array) {
        let newArray = []
        for (let i = 0; i < array.length; i++) {
            let date = array[i][0]
            let value = Number(array[i][1])
            newArray.push({ x: date, y: value })
        }
        console.log(newArray)
        return newArray
    }

    let volumeChart = makeVolumeInfo(volume)
    
    const volumeChartData = {
        datasets: [{
            type: 'bar',
            label: 'Daily Volume',
            data: volumeChart,
            backgroundColor: 'rgba(235, 99, 132, 0.8)',
        }],
    };

    const volumeChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Exchange Volume (BTC)',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    };


    return (
        <>
            <Chart options={volumeChartOptions} data={volumeChartData}></Chart>
        </>
    )
}

export default VolumeChart;