import React, { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { selectLoading, setLoadingFalse, setLoadingTrue } from "../redux/loadingSlice";
import cars from "../asset/auth-img.png";
import Loading from "../components/loading";
import { selectMessage, selectStatusMessage, setMessage, setMessageClose } from "../redux/messageSlice";
import { selectCurrentUserdata, setToken, setUserData } from "../redux/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loading = useSelector(selectLoading);
  const userData = useSelector(selectCurrentUserdata);
  const msg = useSelector(selectMessage);
  const sts = useSelector(selectStatusMessage);

  const [authentication, setAuthentication] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(userData);
  }, []);

  const onChangeHandle = (e) => {
    setAuthentication({ ...authentication, [e.target.name]: e.target.value });
  };

  const fetchAPILogin = async () => {
    dispatch(setLoadingTrue());
    const data = {
      email: authentication.email,
      password: authentication.password,
    };
    const response = await axios.post(`https://api-car-rental.binaracademy.org/admin/auth/login`, data);
    console.log(response.status);
    if (response.status === 201) {
      dispatch(setLoadingFalse());
      dispatch(setMessage({ message: "Berhasil login", status: "success" }));
      dispatch(setUserData({ ...response.data }));
      dispatch(setToken(response.data.access_token));
      localStorage.setItem("token",response.data.access_token )
      navigate("/dashboard")
      setTimeout(() => {
        dispatch(setMessageClose());
      }, 3000);
    } else {
      dispatch(setLoadingFalse());
      dispatch(setMessage({ message: response.response.data.message, status: "error" }));
      setTimeout(() => {
        dispatch(setMessageClose());
      }, 3000);
    }
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(authentication, loading);
    fetchAPILogin();
    setAuthentication({ email: "", password: "" });
  };

  function GetClassName() {
    if (sts === "success") {
      return "bg-success";
    }
    if (sts === "error") {
      return "bg-danger";
    }
    return "";
  }

  return (
    <div className="overflow-hidden">
      {loading === true ? (
        <Loading />
      ) : (
        <div className="row">
          <div className="col">
            <img src={cars} alt={cars} className="vh-100" />
          </div>
          <div className="col d-flex  align-items-center vh-100">
            <Form onSubmit={onSubmitHandle}>
              <h3 className="pb-4">Welcome, admin BCR!</h3>
              {msg === "" ? null : (
                <div className="pb-4">
                  <Toast className={`${GetClassName(sts)} text-white`}>
                    <Toast.Body>{msg}</Toast.Body>
                  </Toast>
                </div>
              )}
              <Form.Group controlId="formEmail" className="mb-3 d-flex flex-column">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={authentication.email} onChange={onChangeHandle} />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={authentication.password} onChange={onChangeHandle} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
