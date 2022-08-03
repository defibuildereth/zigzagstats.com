import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Users</Link>
                    </li>
                    <li>
                        <Link to="/fees">Fees</Link>
                    </li>
                    <li>
                        <Link to="/volume">Volume</Link>
                    </li>
                    <li>
                        <Link to="/token">Token</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;