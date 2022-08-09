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

        for (let i = 0; i < transactionsArray.length; i++) {
            const date = Date.parse(transactionsArray[i].date.split('-').join(' '))
            const number = transactionsArray[i].feeArray.length
            array.push({ x: date, y: number })
        }
        return array
    }

    const makeDailyTxsCumulative = function (transactionsArray) {

        let array = []
        let cumulative = 0;

        if (transactionsArray.length > 0) {
            let ordered = transactionsArray.sort(function (a, b) {
                return (new Date(a.date.split('-').join(' '))).getTime() - (new Date(b.date.split('-').join(' '))).getTime();
            });
            for (let i = 0; i < ordered.length; i++) {
                const date = Date.parse(ordered[i].date.split('-').join(' '))
                const number = ordered[i].feeArray.length + cumulative;
                cumulative = number
                array.push({ x: date, y: number })
            }
        }
        return array
    }

    const dailyTransactions = makeDailyTxsValues(txs)
    const cumulativeTransactions = makeDailyTxsCumulative(txs)

    const dailyTxsData = {
        datasets: [{
            type: 'bar',
            label: 'Daily Transactions',
            data: dailyTransactions,
            backgroundColor: '#6debdc',

        }, {
            type: 'line',
            label: 'Cumulative',
            data: cumulativeTransactions,
            backgroundColor: '#55a9e8',
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