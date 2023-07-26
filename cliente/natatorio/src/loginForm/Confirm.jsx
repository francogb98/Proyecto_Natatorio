import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CONFIRM } from "../persons/graphql-mutation";
import { useMutation } from "@apollo/client";

import Swal from "sweetalert";

function Confirm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [succes, setSuccess] = useState(false);

  const [confirm, result] = useMutation(CONFIRM, {
    onError: (error) => {
      Swal({
        title: "¡¡Ups algo salio mal!!",
        text: error.graphQLErrors[0].message,
        icon: "error",
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          confirm: "Inicio",
        },
      }).then((value) => {
        if (value) {
          window.location.href = "http://localhost:5173/";
        }
      });
    },
  });

  useEffect(() => {
    confirm({ variables: { token } });
    setLoading(true);
  }, []);
  useEffect(() => {
    if (result.data) {
      setSuccess(true);
      setLoading(false);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  }, [result.data]);

  if (succes) {
    Swal({
      title: "¡Cuenta verificada correctamente!",
      text: "Serás redirigido en 3 segundos.",
      icon: "success",
      buttons: false,
      timer: 3000, // 5000 milisegundos (5 segundos)
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then(() => {
      // Aquí puedes realizar la redirección
      window.location.href = "https://proyecto-natatorio-t39g.vercel.app/";
    });
  }

  return <div></div>;
}

export default Confirm;
