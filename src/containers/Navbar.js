import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {

    let activeStyle = "underline"

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <nav>
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                        >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                    to="/">Users</NavLink>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                    to="/fees">Fees</NavLink>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                    to="/volume">Volume</NavLink>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <NavLink className={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                    to="/token">Token</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;