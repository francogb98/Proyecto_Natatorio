// import reactLogo from "./assets/react.svg";
// import Persons from "./Persons";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import PersonForm from "./PersonForm";
// import Notify from "./Notify";
// import { usePerson } from "./persons/customhooks";
// import { useState } from "react";
// import PhoneForm from "./PhoneForm";
import { useApolloClient } from "@apollo/client";
import LoginForm from "./loginForm/LoginForm";
import Confirm from "./loginForm/Confirm";
import Home from "./Home/Home";
import Inicio from "./Home/Inicio/Inicio";
import "bootstrap/dist/css/bootstrap.css";

import { Route, Routes } from "react-router-dom";
import SignIn from "./loginForm/SignIn";
import Inscripcion from "./HomeUserPublic/Inscripcion";
import Perfil from "./HomeUserPublic/Perfil/Perfil";

function App() {
  // const { data, error, loading } = usePerson();
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [token, setToken] = useState(() =>
  //   localStorage.getItem("phonenumbers-user-token")
  // );
  const client = useApolloClient();

  // const logout = () => {
  //   setToken(null);
  //   localStorage.clear();
  //   client.resetStore();
  // };

  return (
    <div className="container-fluid">
      <div
        className="row"
        style={{
          height: "100vh",
          backgroundColor: "rgb(250, 250, 250, 0.3)",
          fontSize: "16px",
          fontFamily: "Open Sans, sans-serif",
          padding: 0,
          boxSizing: " border-box",
        }}
      >
        <Routes>
          <Route path="/" element={<SignIn></SignIn>}></Route>
          <Route path="/login" element={<LoginForm></LoginForm>}></Route>
          <Route path="/verificar-cuenta" element={<Confirm />} />

          <Route path="/inscripcion" element={<Inscripcion />} />
          <Route path="/inscripcion/perfil" element={<Perfil />} />
          <Route path="/home" element={<Home />}>
            <Route path="inicio" element={<Inicio />} />
          </Route>
        </Routes>
      </div>

      {/* <Notify errorMessage={errorMessage} /> */}
      {/* <header>
        {token ? (
          <div style={{ width: "800px" }}>
            <button onClick={logout}>Cerrar Sesion</button>

            <div>
              {loading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <h1>GraphQL + React</h1>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Persons persons={data?.allPersons} />
                  </div>
                </>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <PhoneForm notifyError={notifyError} />
              <PersonForm notifyError={notifyError} />
            </div>
          </div>
        ) : (
          <>
            <h1>Iniciar Secion</h1>
            <LoginForm setToken={setToken} notifyError={notifyError} />
          </>
        )}
      </header> */}
    </div>
  );
}

export default App;
