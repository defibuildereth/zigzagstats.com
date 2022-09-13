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

const DailyTransactionsChart = ({ transactions }) => {

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

    let txs = transactions;

    const makeDailyTxsValues = function (transactionsArray) {
        let array = []

        let ordered = transactionsArray.summary.sort(function (a, b) {
            return (a.date - b.date);
        });

        for (let i = 0; i < ordered.length; i++) {
            const date = new Date(ordered[i].date)
            const number = ordered[i].totalTxs
            array.push({ x: date, y: number })
        }
        return array
    }

    const dailyTransactions = makeDailyTxsValues(txs)

    const dailyTxsData = {
        datasets: [{
            type: 'bar',
            label: 'Daily Transactions',
            data: dailyTransactions,
            backgroundColor: '#6debdc',

        }],
    };

    const dailyTxsOptions = {
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
                text: 'ZigZag Daily Transactions',
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
            <Chart options={dailyTxsOptions} data={dailyTxsData} />
        </>
    )
}

export default DailyTransactionsChart