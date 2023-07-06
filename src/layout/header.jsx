/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUserdata } from "../redux/authSlice";

export default function Header() {
    const userData = useSelector(selectCurrentUserdata);
    const navigate = useNavigate();
    const logOut = () => {
        navigate("/login");
    };
    return (

        <div className="d-flex justify-content-between align-items-center w-100 mx-3 my-4 " style={{ zIndex: '100' }}>
            <div className="toggle">
                <GiHamburgerMenu size={30} />
            </div>

            <div className="d-flex justify-content-start ">
                <div className="mr-4">
                    <div className="input-group">
                        <div className="d-flex justify-content-start align-items-center">
                            <input id="search-input" type="search" className="form-control" />
                            <label className="form-label " htmlFor="form1">
                                Search
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="dropdown ">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {userData ? userData?.email : ""}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => logOut()}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
