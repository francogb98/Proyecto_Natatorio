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
  const client = useApolloClient();

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
    </div>
  );
}

export default App;
