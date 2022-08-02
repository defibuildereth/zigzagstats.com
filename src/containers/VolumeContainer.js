import React from 'react'
import DailyTransactionsChart from '../components/DailyTransactionsChart';

const VolumeContainer = ({transactions}) => {

    return (
        <>
            <DailyTransactionsChart transactions={transactions}></DailyTransactionsChart>
        </>
    )
}

export default VolumeContainer