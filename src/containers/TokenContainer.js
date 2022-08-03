import React from 'react'
import TokenChart from '../components/TokenChart';
import ZZTokenVolumeChart from '../components/ZZTokenVolumeChart';

const TokenContainer = ({token}) => {

    const makeTokenPriceInfo = function (obj) {
        let prices = Object.values(obj)[0]
        let marketCaps = Object.values(obj)[1]
        let volumes = Object.values(obj)[2]
        let priceArray = []
        for (let i = 0; i < prices.length; i++) {
            let date = prices[i][0]
            let value = prices[i][1]
            priceArray.push({ x: date, y: value })
        }
        let volumeArray = []
        for (let i = 0; i < volumes.length; i++) {
            let date = volumes[i][0]
            let value = volumes[i][1]
            volumeArray.push({ x: date, y: value })
        }
        return ({ priceArray: priceArray, volumeArray: volumeArray });
    }

    let tokenChart = makeTokenPriceInfo(token)

    return (
    <>
        <h2>Token</h2>
        <TokenChart tokenPriceInfo={tokenChart.priceArray}></TokenChart>
        <ZZTokenVolumeChart tokenVolumeInfo={tokenChart.volumeArray}></ZZTokenVolumeChart>
    </>
    )
}

export default TokenContainer;