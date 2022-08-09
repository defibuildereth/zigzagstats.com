import React from 'react'
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
    LogarithmicScale
} from 'chart.js';

const ZZTokenVolumeChart = ({ tokenVolumeInfo }) => {

    ChartJS.register(
        TimeScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        CategoryScale,
        LogarithmicScale,
        Title,
        Tooltip,
        Legend
    );

    const tokenVolumeData = {
        datasets: [
            {
                type: 'line',
                label: 'Trading Volume',
                data: tokenVolumeInfo,
                backgroundColor: '#6debdc',
            },
        ],
    };

    const tokenVolumeOptions = {
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
                },
                type: 'logarithmic'
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
            <Chart options={tokenVolumeOptions} data={tokenVolumeData}></Chart>
        </>
    )
}

export default ZZTokenVolumeChart;