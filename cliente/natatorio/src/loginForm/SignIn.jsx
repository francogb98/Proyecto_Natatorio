import React, { useState, useEffect } from "react";
import style from "./form.module.css";

import { Link, Navigate } from "react-router-dom";

import { LOGIN } from "../persons/graphql-mutation";
import { useApolloClient, useMutation } from "@apollo/client";

import Swal from "sweetalert";

import emailjs from "@emailjs/browser";

function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [succes, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [lookPassword, setLookPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      Swal({
        title: "¡¡Ups algo salio mal!!",
        text: error.graphQLErrors[0].message,
        icon: "error",
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          confirm: "Ok",
        },
      });
      setLoading(false);
    },
  });
  const isDisabled = !email && !password;
  useEffect(() => {
    setEmail("");
    setPassword("");
    setSuccess(false);
  }, []);

  useEffect(() => {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorEmail(patron.test(email) ? "isValid" : "isInvalid");
  }, [email]);

  useEffect(() => {
    if (result.data && loading) {
      const token = result.data.login.value;
      localStorage.setItem("token-user", token);
      client.resetStore();

      setSuccess(true);
      setLoading(false);
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      variables: {
        email,
        password,
      },
    });
    setLoading(true);
  };

  return (
    <>
      {succes &&
        (result.data.login.role === "admin" ? (
          <Navigate to="/home/inicio" replace={true} />
        ) : (
          <Navigate to="/inscripcion" replace={true} />
        ))}
      <div className={style.body__signin}>
        {loading && (
          <div className="alert alert-success" role="alert">
            <div className={style.loading}>
              <p>Accediendo</p>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        <div className={style.body__form__signin}>
          <h1 className="text-danger">Iniciar Sesion</h1>
          <form
            action=""
            id="contact-form"
            onSubmit={handleSubmit}
            className={`${style.body__formSignIn}`}
          >
            {/* email */}
            <div>
              <label htmlFor="" className="form-label mt-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className={`form-control `}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@correo.com..."
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="" className="form-label mt-2">
                Password
              </label>
              <div className="d-flex">
                <input
                  type={`${lookPassword ? "text" : "password"}`}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="checkbox"
                  defaultChecked={lookPassword}
                  onClick={() => setLookPassword(!lookPassword)}
                  style={{ width: "30px", marginLeft: "5px" }}
                />
              </div>
            </div>

            <div className={style.buttons__groupSignin}>
              <button
                className="btn btn-lg btn-primary mt-3"
                disabled={isDisabled}
              >
                SignIn
              </button>

              <p className="mt-2">
                ¿Aun no tienes cuenta, <Link to={"/login"}>registrate</Link>?
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
