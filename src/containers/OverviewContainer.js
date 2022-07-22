import React, { useState, useEffect } from 'react'
import { Chart } from 'react-chartjs-2';
import "chartjs-adapter-moment";
import axios from 'axios';

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

const OverviewContainer = () => {

    const [transactions, setTransactions] = useState([])
    const [fee, setFee] = useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/transactions/`)
            .then(res => res.json())
            .then(r => {
                setTransactions(r)
            })
        getFee()
            .then(r => {
                setFee(r)
            })
        // fetch(`${process.env.REACT_APP_API}/addresses/`)
        // .then(res => res.json())
        // .then(r => {
        //     setTransactions(r)
        //     makeValues(transactions)
        // })
    }, []);

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

    const getFee = async function () {
        let fee;
        let payload = {
            "txType": "Transfer",
            "address": "0xf33A2D61DD09541A8C9897D7236aDcCCC14Cf769",
            "tokenLike": 2
        }
        await axios
            .post(`https://api.zksync.io/api/v0.2/fee`, payload)
            .then(res => {
                fee = (res.data.result.totalFee * 10 ** -6)
            })
            .catch(err => {
                console.log(err);
            });

        return fee
    }

    const makeValues = function (transactionsArray) {
        let array = []

        for (let i = 0; i < transactionsArray.length; i++) {
            const date = Date.parse(transactionsArray[i].date.split('-').join(' '))
            const number = transactionsArray[i].feeArray.length
            array.push({ x: date, y: number })
        }
        return array
    }

    const makeCumulative = function (transactionsArray) {
        let array = []
        let cumulative = 0;

        for (let i = 0; i < transactionsArray.length; i++) {
            const date = Date.parse(transactionsArray[i].date.split('-').join(' '))
            const number = transactionsArray[i].feeArray.length + cumulative;
            cumulative = cumulative + number
            array.push({ x: date, y: number })
        }
        return array
    }

    const dailyTransactions = makeValues(transactions)
    const cumulativeTransactions = makeCumulative(transactions)

    const data = {
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

    const options = {
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
        {fee ? <p>Current Fee: {fee.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p> : null}
            {transactions ? <Chart options={options} data={data} /> : <p>Loading</p>}
        </>
    )
}
export default OverviewContainer