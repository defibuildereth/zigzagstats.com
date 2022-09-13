import React from 'react'

const Fee = ({ fee }) => {

    let feeNow = fee;

    return (
        <>
            <p>Fee now (zksync): {feeNow.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </>
    )
}

export default Fee