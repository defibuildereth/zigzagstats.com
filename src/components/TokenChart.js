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
                data: tokenPriceInfo,
                backgroundColor: '#6debdc',
            },
        ],
    };

    const tokenChartOptions = {
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
                text: 'ZigZag Token Price ($usd)',
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
                    beginAtZero: false,
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
                    color: 'white',
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

