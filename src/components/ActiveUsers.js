import React from 'react'

const ActiveUsers = ({activeUsers}) => {

    let activeUsersNow = activeUsers;

    return (
        <>
                <p>Active Users</p>
                <p>Hourly: {activeUsersNow[0]}</p>
                <p>Daily: {activeUsersNow[1]}</p>
                <p>Weekly: {activeUsersNow[2]}</p>
                <p>Monthly: {activeUsersNow[3]}</p>
                <p>Total: {activeUsersNow[4]}</p>
        </>
    )
}

export default ActiveUsers