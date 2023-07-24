import React, { useEffect, useState } from "react";
import MenuUsuario from "../MenuUsuario";
import style from "./stylePerfil.module.css";
import { GET_USER_INFO } from "../../persons/graphql-queries";
import { useQuery } from "@apollo/client";

import img from "./asdasd.jpg";
import { Link } from "react-router-dom";

function Perfil() {
  const [user, setUser] = useState();
  const { data, error, loading } = useQuery(GET_USER_INFO);

  useEffect(() => {}, [loading]);

  return (
    <>
      <MenuUsuario></MenuUsuario>

      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <Link
            to={"/"}
            className="btn btn-lg btn-warning"
            style={{ width: "fit-content", height: "fit-content" }}
          >
            Salir
          </Link>
          <div className={`${style.body}`}>
            <div class="card mb-3" style={{ maxWidth: "700px" }}>
              <div class="row g-0 align-items-center">
                <div class=" col-4">
                  <img
                    src={data.me.foto}
                    className="card-img-top p-3"
                    alt="..."
                  />
                </div>
                <div class="col-4">
                  <div className="card-body">
                    <h5 className="card-title">{data.me.nombre}</h5>
                    {data.me.activity[0] && (
                      <>
                        <p className="card-text">
                          Actividad:{data.me.activity[0].name}
                        </p>
                        <p className="card-text">
                          {" "}
                          Horario:
                          {data.me.activity[0].hourStart} -{" "}
                          {data.me.activity[0].hourFinish}
                        </p>
                        <p className="card-text">
                          Dias:{data.me.activity[0].date.join(" - ")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div class="col-4">
                  <img
                    src={data.me.qr}
                    alt="QR Code"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <h1
            className={`alert ${
              data.me.status ? "alert-success" : "alert-danger"
            } text-center ${style.alert}`}
          >
            Estado:
            <span
              className={`${
                data.me.status ? "  text-success" : " text-danger"
              } `}
            >
              {data.me.status ? "Aprobado" : "Pendiente"}
            </span>
          </h1>
        </>
      )}
    </>
  );
}

export default Perfil;
