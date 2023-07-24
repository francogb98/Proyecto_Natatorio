import React from "react";
import SideBar from "./sidebar/SideBar";
import style from "./estilos.module.css";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white">
      <div className="row">
        <div
          className="col-12 col-sm-auto p-0"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SideBar />
        </div>

        <main className={`${style.main} col`}>
          <div className="row">
            <div className="columna col-12 col-lg-7">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
