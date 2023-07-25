import React, { useEffect, useState } from "react";
import {
  ALL_HOURS,
  GET_ACTIVITY,
  GET_ACTIVITY_FROM_HOUR,
} from "../persons/graphql-queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import style from "./styles.module.css";
import { Link } from "react-router-dom";
import { REGISTER_FROM_ACTIVITY } from "../persons/graphql-mutation";
import Swal from "sweetalert";
import MenuUsuario from "./MenuUsuario";

function Inscripcion() {
  const [days, setDays] = useState(["Lunes"]);
  const [hours, setHours] = useState("");
  const [activities, setActivities] = useState([]);
  const { data, error, loading } = useQuery(ALL_HOURS);
  const {
    data: activityData,
    error: activityError,
    loading: activityLoading,
  } = useQuery(GET_ACTIVITY);

  const [cargando, setLoading] = useState(false);
  const [succes, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [register, result] = useMutation(REGISTER_FROM_ACTIVITY, {
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
    },
  });

  const handleRegister = (id, name, date, hourStart) => {
    Swal({
      title: "¿Seguro que deseas inscrbirte en esta actividad?",
      text: `
      Actividad: ${name}
      Dias: ${date}
      Hora de ingreso: ${hourStart}
      `,
      icon: "info",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        confirm: "Ok",
        cancel: "Cancelar",
      },
    }).then((value) => {
      if (value) {
        register({
          variables: {
            addUserFromActivityId: id,
          },
        });
        setLoading(true);
      } else {
      }
    });
  };

  useEffect(() => {
    if (result.data && cargando) {
      setSuccess(true);
      setLoading(false);
    }
  }, [result.loading]);

  useEffect(() => {
    if (refresh) {
      setActivities(activityData.getActivities);
      setRefresh(false);
    }
  }, [refresh]);

  if (succes) {
    Swal({
      title: "¡Te has registrado correctamente!",

      icon: "success",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        confirm: "Ok",
      },
    }).then((value) => {
      if (value) {
        setRefresh(true);
        setSuccess(false);
      }
    });
  }

  useEffect(() => {
    if (!loading) {
      setActivities(activityData.getActivities);
    }
  }, [activityLoading]);

  useEffect(() => {
    if (!loading) {
      setHours(data.getHours);
    }
  }, [loading]);

  useEffect(() => {}, [succes]);

  return (
    <div>
      <MenuUsuario></MenuUsuario>
      <Link to={"/"} className="btn btn-lg btn-warning">
        Salir
      </Link>
      <h1 className={style.title}>Elije tu actividad</h1>
      {activityLoading ? (
        <div>cargnado</div>
      ) : (
        <>
          <table className="table table-light table-striped-columns">
            <thead>
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Actividad</th>
                {/* {days.map((e, i) => (
                  <th scope="col" key={i}>
                    {e}
                  </th>
                ))} */}
              </tr>
            </thead>
            <tbody>
              {hours &&
                hours.map((e, i) => (
                  <tr key={i}>
                    <th scope="row">{e.hourStart + "-" + e.hourFinish}</th>
                    {days.map((day, dayIndex) => {
                      const dayActivities = activities.filter(
                        (a) => a.hourStart === e.hourStart
                      );
                      return (
                        <td key={day}>
                          {dayActivities.length > 0
                            ? dayActivities.map((activity, i) => (
                                <>
                                  <div
                                    key={activity.id}
                                    className={style.td__bg}
                                    style={
                                      activity.userRegister >= 50
                                        ? {
                                            background: "rgb(250,0,0,0.2)",
                                          }
                                        : null
                                    }
                                  >
                                    <div>
                                      <p>
                                        Actividad:{" "}
                                        <span
                                          style={{
                                            color: "red",
                                            fontWeight: "550",
                                          }}
                                        >
                                          {activity.name}
                                        </span>
                                      </p>
                                      <p>
                                        Dias:
                                        <span
                                          style={{
                                            color: "blue",
                                            fontWeight: "550",
                                          }}
                                        >
                                          {activity.date.join(" - ")}
                                        </span>
                                      </p>
                                      <p>
                                        Pileta:
                                        <span
                                          style={{
                                            color: "violet",
                                            fontWeight: "550",
                                          }}
                                        >
                                          {activity.pileta}
                                        </span>
                                      </p>
                                      <p>
                                        <span
                                          style={
                                            activity.userRegister >= 50
                                              ? {
                                                  color: "red",
                                                  fontWeight: "550",
                                                }
                                              : {
                                                  color: "green",
                                                  fontWeight: "550",
                                                }
                                          }
                                        >
                                          {activity.userRegister >= 50
                                            ? "No Hay cupos disponibles"
                                            : "Disponible"}
                                        </span>
                                      </p>
                                    </div>
                                    {activity.userRegister < 50 && (
                                      <button
                                        className="btn btn-primary"
                                        style={{ height: "70px" }}
                                        disabled={activity.userRegister >= 50}
                                        onClick={() =>
                                          handleRegister(
                                            activity.id,
                                            activity.name,
                                            activity.date.join(" - "),
                                            activity.hourStart
                                          )
                                        }
                                      >
                                        Inscribirse
                                      </button>
                                    )}
                                  </div>
                                </>
                              ))
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Inscripcion;
