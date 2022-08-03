import React from 'react'
import DailyTransactionsChart from '../components/DailyTransactionsChart';
import VolumeChart from '../components/VolumeChart';

const VolumeContainer = ({transactions, volume}) => {

    return (
        <>
            <h1>Volume</h1>
            <DailyTransactionsChart transactions={transactions}></DailyTransactionsChart>
            <VolumeChart volume={volume}></VolumeChart>
            <p>More Volume Information on <a href='https://www.coingecko.com/en/exchanges/zigzag'>CoinGecko</a></p>
        </>
    )
}

export default VolumeContainer