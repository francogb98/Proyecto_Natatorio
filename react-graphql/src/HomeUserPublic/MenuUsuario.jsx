import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuUsuario() {
  const location = useLocation();
  return (
    <div style={{ height: "fit-content" }}>
      <div className="col mt-3 mb-3">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/inscripcion" ? "active" : null
              }`}
              aria-current="page"
              to={"/inscripcion"}
            >
              Inscripcion{"   "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-calendar-check-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
              </svg>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/inscripcion/perfil" ? "active" : null
              }`}
              aria-current="page"
              to={"/inscripcion/perfil"}
            >
              Perfil{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuUsuario;
