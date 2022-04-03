import React, { useState, useEffect } from "react";
import Form from "rsuite/Form";
import ButtonToolbar from "rsuite/ButtonToolbar";
import Button from "rsuite/Button";
import Loader from "rsuite/Loader";
import { baseURL } from "../util";
import Message from "rsuite/Message";
import toaster from "rsuite/toaster";

const EditarPersona = ({ id, closeModal, type }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    fNacimiento: "",
  });
  const [saving, setSaving] = useState(false);

  const message = (type, message) => (
    <Message showIcon type={type} closable>
      {type === "success" ? "Éxito" : "Error"}: {message}.
    </Message>
  );

  useEffect(() => {
    if (type === "edit") {
      setLoading(true);
      fetch(`${baseURL}/personas/${id || 0}/`)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "ok") {
            setUserData(res.data[0]);
          } else {
            toaster.push(message("error", res.message), "bottomCenter");
          }
          setLoading(false);
        });
    }
  }, [id, type]);

  const guardar = async () => {
    console.log(userData);
    // validar campos nombre, apellido, telefono
    if (userData.nombre && userData.apellido && userData.telefono) {
      setSaving(true);
      // enviar datos
      fetch(`${baseURL}/personas/${type === "edit" ? `${id}/` || "0/" : ""}`, {
        method: type === "edit" ? "PUT" : "POST",
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "ok") {
            toaster.push(message("success", res.message), "bottomCenter");
          } else {
            toaster.push(message("error", res.message), "bottomCenter");
          }
          setSaving(false);
        });
    } else {
      toaster.push(
        message(
          "error",
          "Los campos nombre, apellido y teléfono son obligatorios"
        ),
        "bottomCenter"
      );
    }
  };
  return (
    <div>
      {loading ? (
        <Loader size="md" />
      ) : (
        <div>
          {userData ? (
            <Form>
              <Form.Group controlId="nombre">
                <Form.ControlLabel>Nombre</Form.ControlLabel>
                <Form.Control
                  name="nombre"
                  type="text"
                  id="nombre"
                  value={userData.nombre || ""}
                  disabled={saving}
                  pattern="[a-zA-Z ]*"
                  required
                  onChange={() => {
                    var arrayexit = document.getElementById("nombre").value;
                    var output = "";
                    for (var i = 0; i < arrayexit.length; i++) {
                      var char = arrayexit.charAt(i);
                      if (char.match(/[a-zA-Z ]/)) {
                        output += char;
                      }
                    }
                    document.getElementById("nombre").value = output;
                    setUserData({ ...userData, nombre: output });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="apellido">
                <Form.ControlLabel>Apellido</Form.ControlLabel>
                <Form.Control
                  name="apellido"
                  type="text"
                  value={userData.apellido || ""}
                  disabled={saving}
                  id="apellido"
                  pattern="[a-zA-Z ]*"
                  required
                  onChange={() => {
                    var arrayexit = document.getElementById("apellido").value;
                    var output = "";
                    for (var i = 0; i < arrayexit.length; i++) {
                      var char = arrayexit.charAt(i);
                      if (char.match(/[a-zA-Z ]/)) {
                        output += char;
                      }
                    }
                    document.getElementById("apellido").value = output;
                    setUserData({ ...userData, apellido: output });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="telefono">
                <Form.ControlLabel>Teléfono</Form.ControlLabel>
                <Form.Control
                  name="telefono"
                  type="number"
                  value={userData.telefono || ""}
                  disabled={saving}
                  id="telefono"
                  pattern="/^\d+$/"
                  required
                  onChange={() => {
                    var arrayexit = document.getElementById("telefono").value;
                    var output = "";
                    for (var i = 0; i < arrayexit.length; i++) {
                      var char = arrayexit.charAt(i);
                      if (char.match(/^\d+$/)) {
                        output += char;
                      }
                    }
                    document.getElementById("telefono").value = output;
                    setUserData({ ...userData, telefono: output });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.ControlLabel>Correo Electrónico</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  value={userData.email || ""}
                  disabled={saving}
                  onChange={(value) => {
                    setUserData({ ...userData, email: value });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="fnacimiento">
                <Form.ControlLabel>Fecha de Nacimiento</Form.ControlLabel>
                <Form.Control
                  disabled={saving}
                  name="fnacimiento"
                  type="date"
                  value={userData.fNacimiento || ""}
                  onChange={(value) => {
                    setUserData({
                      ...userData,
                      fNacimiento: value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <ButtonToolbar>
                  <Button
                    appearance="primary"
                    color="green"
                    onClick={guardar}
                    disabled={saving}
                  >
                    {saving ? (
                      <span>
                        <Loader size={"xs"} /> Guardando
                      </span>
                    ) : (
                      "Guardar"
                    )}
                  </Button>
                  <Button
                    appearance="default"
                    color="red"
                    disabled={saving}
                    onClick={closeModal}
                  >
                    Cancelar
                  </Button>
                </ButtonToolbar>
              </Form.Group>
            </Form>
          ) : (
            <p>No hay datos</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditarPersona;
