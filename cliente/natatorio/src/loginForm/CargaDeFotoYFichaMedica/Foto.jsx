import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import style from "../form.module.css";

function Index({ setImageUrl, imageUrl, setPage }) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preset_key = "Natatorio";
  const cloud_name = "dmutrxpkl";
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Crear un objeto FileReader para leer la imagen y obtener su URL
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };
  const uploadImage = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    formData.append("folder", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => {
        setLoading(false);
        setError(false);
        setSuccess(true);
        setImageUrl(res.data.secure_url);
      })
      .catch((err) => setError(true));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  }, [success]);

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, []);

  return (
    <div>
      <div>
        <h3 htmlFor="imagen" className={`text-center ${style.label__Text}`}>
          Imagen de perfil
        </h3>

        <input
          type="file"
          className="form-control"
          id="imagen"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div>
            <img
              src={previewUrl}
              alt="Imagen seleccionada"
              className="rounded mx-auto d-block mt-1"
              style={{ maxWidth: "250px", height: "150px" }}
            />
          </div>
        )}
        <div className="mt-1 mx-auto" style={{ width: "fit-content" }}>
          {loading && (
            <div className="text-center">
              <p className="text-primary">Puede tardar unos segundos</p>
              <div
                className="spinner-border"
                role="status"
                style={{ marginTop: "-4px" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {error && (
            <p className="text-danger">
              Ocurrio un error, recargue y vuelva a intentarlo
            </p>
          )}
          {success && <p className="text-primary">Imagen Update</p>}
        </div>
        <div className="mt-1 mx-auto" style={{ width: "fit-content" }}>
          <button
            type="button"
            className="btn btn-light fw-bold text-dark"
            disabled={!previewUrl}
            onClick={uploadImage}
          >
            Cargar imagen
          </button>
        </div>
      </div>
      {!imageUrl && (
        <p
          className="mx-auto text-danger mt-2"
          style={{ width: "fit-content" }}
        >
          Cargue una imagen para continuar
        </p>
      )}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-lg  btn-danger " onClick={() => setPage(0)}>
          Anterior
        </button>
        <button
          className="btn btn-primary "
          disabled={!imageUrl}
          onClick={() => setPage(2)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Index;
