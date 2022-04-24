import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Stock = () => {

  let email = localStorage.getItem("UserEmail");
  let image = localStorage.getItem("StockImage");
  let price = localStorage.getItem("StockPrice");
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
        <div class="row">
          <div class="col-8">
            <p class="h3 text-center mt-5">Stock Info</p>
            <div class="text-center mt-5">
            <img src="https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" height={400}  alt='stock image'></img>
            </div>
            
          </div>
          <div class="col-4">
            <div class="h3 text-start " style={{ position: "absolute", top: "50%" }}>
                <p> Stock Value : 10000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
