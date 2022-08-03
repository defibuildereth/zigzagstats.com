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
                backgroundColor: 'rgba(235, 99, 132, 0.8)',
            },
        ],
    };

    const tokenVolumeOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Token Trading Volume ($usd)',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                type: 'logarithmic'
            }
        }
    };

    return (
        <>
            <Chart options={tokenVolumeOptions} data={tokenVolumeData}></Chart>
        </>
    )
}

export default ZZTokenVolumeChart;