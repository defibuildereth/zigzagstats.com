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
        console.log(transactionsArray)

        let array = []
        let cumulative = 0;

        if (transactionsArray.length > 0) {
            // for (let i = 0; i < transactionsArray.length; i++) {
            //     let date = (transactionsArray[i].date.split('-').join(' '))
            //     let dateObject = new Date (date)
            //     console.log(dateObject.getTime())
            // }
            let ordered = transactionsArray.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return (new Date(a.date.split('-').join(' '))).getTime() - (new Date(b.date.split('-').join(' '))).getTime();
            });
            console.log(ordered)
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
            backgroundColor: 'rgba(235, 99, 132, 0.8)',

        }, {
            type: 'line',
            label: 'Cumulative',
            data: cumulativeTransactions,
            backgroundColor: 'blue',
        }],
    };

    const dailyTxsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'ZigZag Daily Transactions',
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
            <Chart options={dailyTxsOptions} data={dailyTxsData} />
        </>
    )
}

export default DailyTransactionsChart