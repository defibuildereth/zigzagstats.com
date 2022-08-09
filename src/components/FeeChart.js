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

const FeeChart = ({ transactions }) => {

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

    const makeDailyFeeValues = function (transactionsArray) {
        let array = []

        if (transactionsArray.length > 0) {
            let ordered = transactionsArray.sort(function (a, b) {
                return (new Date(a.date.split('-').join(' '))).getTime() - (new Date(b.date.split('-').join(' '))).getTime();
            });
            for (let i = 0; i < ordered.length; i++) {
                let orderedFilteredFeeArray = ordered[i].feeArray.filter(value => typeof (value) === 'number')
                const date = Date.parse(ordered[i].date.split('-').join(' '))
                if (orderedFilteredFeeArray.length > 0) {
                    let sum = orderedFilteredFeeArray.reduce((previousValue, currentValue) => previousValue + currentValue)
                    const number = sum / orderedFilteredFeeArray.length;
                    array.push({ x: date, y: number })
                } else {
                    array.push({x:date, y: null})
                }
            }
        }
        return array
    }

    const dailyFees = makeDailyFeeValues(txs)

    const dailyFeeData = {
        datasets: [{
            type: 'bar',
            label: 'Daily Fees',
            data: dailyFees,
            backgroundColor: '#6debdc',
        }],
    };

    const dailyFeeOptions = {
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
                text: 'ZigZag Daily Average Fees',
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
            <Chart options={dailyFeeOptions} data={dailyFeeData} />
        </>
    )
}

export default FeeChart