import React from "react";
import { useNavigate } from "react-router-dom";
import undraw_stocks from "../Assets/undraw_stocks1.svg";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };
    fetch("http://localhost:5000/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
            
          localStorage.setItem("UserEmail", data.value.email);
          console.log(data.value.email)
          setTimeout(() => {
            navigate("/home");
          }, 750);
        
        } else {
          alert("Login Failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 mt-5">
          <img src={undraw_stocks} height={450} alt="welcome" />
        </div>
        <div class="col-6" style={{ position: "absolute", marginLeft: "45%" }}>
          <div class="mt-5 ">
            <div className="App__form">
              <h1 class="fw-bolder mt-5 mb-4" style={{ color: "#6C63FF" }}>
                User SignIn
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="mt-4">
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    name="email"
                    {...register("email", {
                      required: "E-mail Address is required.",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "This is not a valid email",
                      },
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </div>

                <div class="mt-4">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 4,
                        message: "Password must be more than 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message:
                          "Password cannot exceed more than 10 characters",
                      },
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </div>

                <div class="mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btns"
                  >
                    Sign In
                  </Button>
                </div>

                <div class="mt-4">
                  <Divider />
                </div>
                <div class="mt-4 text-center">
                  <Link
                    href="/register"
                    underline="none"
                    variant="secondary"
                    style={{ color: "#6C63FF" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
