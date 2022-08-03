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
} from 'chart.js';

const TokenChart = ({tokenPriceInfo}) => {

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

    const tokenChartData = {
        datasets: [
            {
                type: 'line',
                label: 'Token Price',
                yAxisID: 'A',
                data: tokenPriceInfo,
                backgroundColor: 'rgba(235, 99, 132, 0.8)',
            },
        ],
    };

    const tokenChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Token Price ($usd)',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
        }
    };

    return (
        <>
            <Chart options={tokenChartOptions} data={tokenChartData}></Chart>
        </>
    )
}

export default TokenChart;

