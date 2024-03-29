import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StockSlider from "./StockSlider";
import { SliderData } from "./SliderData";

const Home = () => {
  let email = localStorage.getItem("UserEmail");
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("UserEmail");
    setTimeout(() => {
      navigate("/");
    }, 250);
  }

  useEffect(() => {
    if (email) {
      getUser();
    }
  }, []);

  const [user, setUser] = useState([]);

  const getUser = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    console.log(email);
    fetch("http://localhost:5000/api/user/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getStock = (id) => {
    navigate(`stock/${id}`);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand text-dark">10 Stocks</p>
          <div class="text-center">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="45"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span class="ms-2">{user.email}</span>
            </p>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-lg bg-danger text-light" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </nav>
      <div class="container-flex">
        <div class="conatainer mt-3 mb-3 ms-3">
          <p class="fs-3">Welcome, {user.name} </p>
          <div style={{ textAlign: "center" }}>
            <h2>List Of Stocks</h2>
            <p >Click on the stock to view the data.</p>
          </div>
        </div>
      </div>
      <div class="mt-3 mb-3">
        <br></br>
        <StockSlider slides={SliderData} />;
        {/* <p class="fw-bold text-center mt-2 fs-3">Stock : </p> */}
      </div>
    </div>
  );
};

export default Home;
