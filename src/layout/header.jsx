/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, {useEffect} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUserdata } from "../redux/authSlice";

export default function Header() {
    const userData = useSelector(selectCurrentUserdata);
    const navigate = useNavigate();
    const logOut = () => {
        console.log("ee");
        localStorage.setItem("token", "");
        navigate("/");
    };
    useEffect(() => {
      console.log(userData)
    }, [])
    
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center w-100 mx-3 my-4 " style={{ zIndex: "100" }}>
                <div className="toggle">
                    <GiHamburgerMenu size={30} />
                </div>

                <div className="d-flex justify-content-start" style={{ gap: "20px" }}>
                    <div className="mr-4">
                        <div className="input-group">
                            <div className="d-flex justify-content-start align-items-center">
                                <input id="search-input" type="search" className="form-control" />
                                <div
                                    style={{
                                        border: "2px solid #0d28a6",
                                        marginLeft: "3px",
                                        width: "71px",
                                        height: "36px",
                                    }}
                                    className="d-flex justify-content-center"
                                >
                                    <div>
                                        <label className="form-label" htmlFor="form1">
                                            <h6 style={{ fontSize: "14px" }}>Search</h6>
                                        </label>
                                    </div>
                                </div>
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
                                onClick={() => logOut()}
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
        </Container>
    );
}
