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
        return newArray
    }

    let volumeChart = makeVolumeInfo(volume)
    
    const volumeChartData = {
        datasets: [{
            type: 'bar',
            label: 'Daily Volume',
            data: volumeChart,
            backgroundColor: '#6debdc',
        }],
    };

    const volumeChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                color: '#FFFFFF',
                labels: {
                    color: '#FFFFFF'
                }
            },
            title: {
                display: true,
                text: 'ZigZag Exchange Volume (BTC)',
                color: '#FFFFFF'
            },
        },
        scales: {
            yAxes:{
                grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white',
                }
            },
            xAxes: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                grid: {
                    drawBorder: true,
                    color: '#FFFFFF',
                },
                ticks:{
                    beginAtZero: true,
                    color: 'white',
                }
            },
        }
    };


    return (
        <>
            <Chart options={volumeChartOptions} data={volumeChartData}></Chart>
        </>
    )
}

export default VolumeChart;