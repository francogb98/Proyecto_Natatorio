import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { REGISTER } from "../persons/graphql-mutation";
import { verificPassword } from "./verificarDatos";

import style from "./form.module.css";

import Swal from "sweetalert";
import { barrios, barriosLaBanda, ciudades } from "./barrios";
import Index from "./CargaDeFotoYFichaMedica/Foto.jsx";

import emailjs from "@emailjs/browser";

function LoginForm({ setToken, notifyError }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [nombreTutor, setNombreTutor] = useState(undefined);
  const [dniTutor, setDniTutor] = useState(undefined);

  const [ciudad, setCiudad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [dni, setDni] = useState("");
  const [sexo, setSexo] = useState("");
  const [barrio, setBarrio] = useState("");

  const isDisabled = !password || !nombre || !email || !dni || !sexo || !ciudad;

  const [loading, setLoading] = useState(false);
  const [succes, setSuccess] = useState(false);
  const [error, setError] = useState({
    nombre: false,
    email: false,
    barrio: false,
    fichaMedica: false,
    password: false,
    repetirPassword: false,
  });

  //

  useEffect(() => {
    const patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;
    setError((prevError) => ({
      ...prevError,
      password: patron.test(password),
    }));
  }, [password]);

  useEffect(() => {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError((prevError) => ({
      ...prevError,
      email: patron.test(email),
    }));
  }, [email]);
  useEffect(() => {
    const patron = nombre.length > 3;
    setError((prevError) => ({
      ...prevError,
      nombre: patron,
    }));
  }, [nombre]);

  const [login, result] = useMutation(REGISTER, {
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

  useEffect(() => {
    if (result.data && loading) {
      setSuccess(true);
    }
  }, [result.data]);

  if (succes) {
    const form = {
      from_name: "Administracion Natatorio Olimpico",
      to_name: nombre.concat(" ", apellido),
      from_email: email,
      enlace: `https://proyecto-natatorio-t39g.vercel.app/verificar-cuenta?token=${result.data.createUser.emailVerificationToken}`,
      reply_to: "natatorio@correo.com",
    };
    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPALTE_ID;
    const publicKey = import.meta.env.VITE_PUBLIK_KEY;

    emailjs.send(serviceID, templateID, form, publicKey).then(
      (result) => {
        Swal({
          title: "¡Cuenta Creada correctamente!",
          text: "Te hemos enviado un correo para verificar tu cuenta",
          icon: "success",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: {
            confirm: "Ok",
          },
        }).then((value) => {
          if (value) {
            setLoading(false);
            setSuccess(false);
            setNombre("");
            setApellido("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");
            setDni("");
            setSexo("");
            setBarrio("");
          }
        });
      },
      (error) => {
        Swal({
          title: "¡¡Ups algo salio mal!!",
          text: error.text,
          icon: "error",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: {
            confirm: "Ok",
          },
        });
        setLoading(false);
      }
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!regex.test(password)) {
      Swal({
        title: "Las contraseñas no cumple con las condiciones",
        text: "Verifique que tenga al menos un numero, una letra mayuscula, y una minuscula",
        icon: "error",
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          confirm: "Ok",
        },
      });
      return;
    }

    if (password !== repetirPassword) {
      Swal({
        title: "Las contraseñas no coinciden",
        icon: "error",
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          confirm: "Ok",
        },
      });
      return;
    }
    const valorBarrio =
      ciudad === "Santiago del Estero" || ciudad === "La Banda"
        ? barrio
        : ciudad;

    login({
      variables: {
        nombre: nombre.concat(" ", apellido),
        edad,
        telefono,
        telefonoContacto,
        nombreTutor,
        dniTutor,
        barrio: valorBarrio,
        email,
        password,
        dni,
        sexo,
        foto: imageUrl,
      },
    });
    setLoading(true);
  };

  const [page, setPage] = useState(0);

  useEffect(() => {}, [page]);

  return (
    <>
      <div className={style.body__signin}>
        <div className={style.body__form__signin}>
          <h1>Registrate</h1>

          <form onSubmit={handleSubmit} className={style.body__formSignIn}>
            <div className="progress mt-1">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: `${page === 4 ? "100" : page * 25}%` }}
                aria-valuenow={`${page === 4 ? "100" : page * 25}%`}
                aria-valuemin="0"
                aria-valuemax={`${page === 4 ? "100" : page * 25}%`}
              ></div>
            </div>
            {/* nombre apellido edad dni */}
            {page === 0 && (
              <div>
                <label
                  htmlFor="nombre"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label
                  htmlFor="apellido"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <label
                  htmlFor="edad"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  Edad
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edad"
                  name="edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
                <label
                  htmlFor="dni"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  DNI
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={dni}
                  id="dni"
                  onChange={(e) => setDni(e.target.value)}
                />

                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-lg btn-primary "
                    onClick={() => setPage(1)}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
            {/* imagen */}
            {page === 1 && (
              <>
                <Index
                  setImageUrl={setImageUrl}
                  imageUrl={imageUrl}
                  setPage={setPage}
                />
              </>
            )}

            {/* telefono, telefono de contacto */}
            {page === 2 && (
              <>
                <label
                  htmlFor="dni"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  Sexo
                </label>
                <select
                  className="form-select"
                  value={sexo}
                  id="sexo"
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option value="null">--Sexo--</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                <label
                  htmlFor="telefono"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  id="telefono"
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <label
                  htmlFor="telefonoContacto"
                  className={`form-label  mt-2 ${style.label__Text}`}
                >
                  Telefono de Contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={telefonoContacto}
                  id="telefonoContacto"
                  onChange={(e) => setTelefonoContacto(e.target.value)}
                />

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-lg  btn-danger "
                    onClick={() => setPage(1)}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-primary "
                    onClick={() => setPage(3)}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}

            {/* barrios, ciudades, datos tutor */}
            {page === 3 && (
              <div className={style.select__ciudad}>
                {/* ciudades */}
                <>
                  {(edad < 18 || edad === null) && (
                    <>
                      <label
                        htmlFor="nombreTutor"
                        className={`form-label  mt-2 ${style.label__Text}`}
                      >
                        Nombre Del Tutor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={nombreTutor}
                        id="nombreTutor"
                        onChange={(e) => setNombreTutor(e.target.value)}
                      />

                      <label
                        htmlFor="dniTutor"
                        className={`form-label  mt-2 ${style.label__Text}`}
                      >
                        Dni Del Tutor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={dniTutor}
                        id="dniTutor"
                        onChange={(e) => setDniTutor(e.target.value)}
                      />
                    </>
                  )}
                  <label
                    htmlFor="barrio"
                    className={`form-label  mt-2 ${style.label__Text}`}
                  >
                    Ciudad
                  </label>
                  <select
                    className={`form-select ${style.select__ciudad}`}
                    value={ciudad}
                    id="ciudad"
                    onChange={(e) => setCiudad(e.target.value)}
                  >
                    <option value="null">--Ciudad--</option>
                    {ciudades &&
                      ciudades.map((ciudad, i) => (
                        <option key={i} value={ciudad}>
                          {ciudad}
                        </option>
                      ))}
                  </select>
                </>

                {ciudad === "Santiago del Estero" || ciudad === "La Banda" ? (
                  <>
                    <label
                      htmlFor="barrio"
                      className={`form-label  mt-2 ${style.label__Text}`}
                    >
                      Barrio
                    </label>
                    <select
                      className="form-select"
                      value={barrio}
                      id="barrio"
                      onChange={(e) => setBarrio(e.target.value)}
                    >
                      <option value="null">--Barrio--</option>
                      {ciudad === "Santiago del Estero"
                        ? barrios.map((barrio, i) => (
                            <option key={i} value={barrio}>
                              {barrio}
                            </option>
                          ))
                        : barriosLaBanda.map((barrio, i) => (
                            <option key={i} value={barrio}>
                              {barrio}
                            </option>
                          ))}
                    </select>
                  </>
                ) : null}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-lg  btn-danger "
                    onClick={() => setPage(2)}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-primary "
                    onClick={() => setPage(4)}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
            {/* eamil, password */}

            {page === 4 && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className={`form-label  mt-2 ${style.label__Text}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className={`form-label  mt-2 ${style.label__Text}`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label
                    htmlFor="repetirPassword"
                    className={`form-label  mt-2 ${style.label__Text}`}
                  >
                    Repetir Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={repetirPassword}
                    id="repetirPassword"
                    onChange={(e) => setRepetirPassword(e.target.value)}
                  />
                </div>

                <div className={style.buttons__group}>
                  <button
                    className="btn btn-lg btn-danger mt-3 "
                    onClick={() => setPage(3)}
                  >
                    Anterior
                  </button>
                  <div
                    style={
                      isDisabled
                        ? { cursor: "not-allowed", width: "fit-content" }
                        : { width: "fit-content" }
                    }
                  >
                    <button
                      className={`btn btn-lg ${
                        isDisabled ? "btn-secondary" : "btn-primary"
                      } mt-3`}
                      disabled={isDisabled}
                    >
                      Login
                    </button>
                  </div>
                  {loading && (
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </>
            )}
            <p className="mt-4">
              ¿Ya tienes cuenta? <Link to={"/"}>Iniciar Sesion</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
