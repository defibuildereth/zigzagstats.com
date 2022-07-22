import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import "chartjs-adapter-moment";


import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const OverviewContainer = () => {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/transactions/`)
        .then(res => res.json())
        .then(r => {
            setTransactions(r)
            makeValues(transactions)
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
        Title,
        Tooltip,
        Legend
    );

    const makeValues = function (transactionsArray) {
        let array = []

        for (let i = 0; i < transactionsArray.length; i++) {
            const date = Date.parse(transactionsArray[i].date.split('-').join(' '))
            const number = transactionsArray[i].feeArray.length
            array.push({x: date, y: number})
        }
        return array
    }

    const values = makeValues(transactions)

    const data = {
        datasets: [
            {
                label: 'Transactions',
                data: values,
                backgroundColor: 'rgba(235, 99, 132, 0.8)',
            },
        ],
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
                // time : {
                //     unit: 'hour'
                // }
            }
        }
    };

    return (
        <>
        {transactions ? <Bar options={options} data={data} /> : <p>Loading</p>  }
        </>
    )
}
export default OverviewContainer