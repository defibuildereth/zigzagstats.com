import React from 'react'

const ActiveUsers = ({activeUsers}) => {

    let activeUsersNow = activeUsers;

    return (
        <>
                <p>Active Users</p>
                <p>Hourly: {activeUsersNow[0].toLocaleString()}</p>
                <p>Daily: {activeUsersNow[1].toLocaleString()}</p>
                <p>Weekly: {activeUsersNow[2].toLocaleString()}</p>
                <p>Monthly: {activeUsersNow[3].toLocaleString()}</p>
        </>
    )
}

export default ActiveUsers