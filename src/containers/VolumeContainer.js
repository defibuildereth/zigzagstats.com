import React from 'react'
import DailyTransactionsChart from '../components/DailyTransactionsChart';
import VolumeChart from '../components/VolumeChart';

const VolumeContainer = ({transactions, volume}) => {

    return (
        <>
            <DailyTransactionsChart transactions={transactions}></DailyTransactionsChart>
            <VolumeChart volume={volume}></VolumeChart>
            <br></br>
            <p>More Volume Information on <a className='text-zzGreen' href='https://www.coingecko.com/en/exchanges/zigzag'>CoinGecko</a></p>
        </>
    )
}

export default VolumeContainer