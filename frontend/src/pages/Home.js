/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../css/App.css";
import logo from "../assets/pIQ-logo.png";
import Timeline from "../components/Timeline";
import Button from "rsuite/Button";
import Table from "rsuite/Table";
import Modal from "rsuite/Modal";
import EditarPersona from "../components/EditarPersona";
import Message from "rsuite/Message";
import toaster from "rsuite/toaster";
import IconButton from "rsuite/IconButton";
import { baseURL } from "../util";
import AddOutlineIcon from "@rsuite/icons/AddOutline";

const App = () => {
  const [showTimeLine, setShowTimeLine] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editarPersonaM, setEditarPersonaM] = useState(false);
  const [idPersona, setIdPersona] = useState(null);
  const [typeModal, setTypeModal] = useState("edit");

  useEffect(() => {
    fetchPersonas();
  }, []);

  const message = (type, message) => (
    <Message showIcon type={type} closable>
      {type === "success" ? "Éxito" : "Error"}: {message}.
    </Message>
  );

  const fetchPersonas = () => {
    setLoading(true);
    fetch(`${baseURL}/personas/`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ok") {
          setData(res.data);
        } else {
          setData([]);
          toaster.push(message("error", res.message), "bottomCenter");
        }
        setLoading(false);
      });
  };

  const borrarPersona = (id) => {
    setLoading(true);
    fetch(`${baseURL}/personas/${id}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ok") {
          fetchPersonas();
          toaster.push(message("success", res.message), "bottomCenter");
        } else {
          toaster.push(message("error", res.message), "bottomCenter");
        }
        setLoading(false);
        fetchPersonas();
      });
  };

  return (
    <div className="App">
      <img src={logo} className="logo" alt="logo" />
      <a
        href="https://github.com/lxndr-rl/ProcesosIQ"
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
          color: "white",
          marginTop: "10px",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Prueba técnica. Parte 1
      </a>
      <p>
        <span style={{ fontSize: "1rem", color: "white" }}>
          <b>Sistema de registro de contactos</b>
        </span>
      </p>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <Table
          data={data}
          style={{
            borderRadius: "10px",
          }}
          width={930}
          loading={loading}
          locale={{
            emptyMessage: "No hay datos",
            loading: "Cargando...",
          }}
        >
          <Table.Column width={40} align="center" fixed>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.Cell dataKey="nombre" />
          </Table.Column>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.Cell dataKey="apellido" />
          </Table.Column>
          <Table.Column width={100} align="center" fixed>
            <Table.HeaderCell>Teléfono</Table.HeaderCell>
            <Table.Cell dataKey="telefono" />
          </Table.Column>
          <Table.Column width={250} align="center" fixed>
            <Table.HeaderCell>Correo Electrónico</Table.HeaderCell>
            <Table.Cell dataKey="email" />
          </Table.Column>
          <Table.Column width={120} align="center" fixed>
            <Table.HeaderCell>Fecha Nacimiento</Table.HeaderCell>
            <Table.Cell dataKey="fNacimiento" />
          </Table.Column>
          <Table.Column width={120} fixed="right">
            <Table.HeaderCell>
              Acciones{" "}
              <IconButton
                size={"sm"}
                icon={<AddOutlineIcon />}
                onClick={() => {
                  setTypeModal("add");
                  setEditarPersonaM(true);
                }}
              />
            </Table.HeaderCell>
            <Table.Cell>
              {(rowData) => {
                return (
                  <span>
                    <a
                      href="#"
                      onClick={() => {
                        setTypeModal("edit");
                        setIdPersona(rowData.id);
                        setEditarPersonaM(true);
                      }}
                    >
                      {" "}
                      Editar{" "}
                    </a>{" "}
                    |{" "}
                    <a href="#" onClick={() => borrarPersona(rowData.id)}>
                      {" "}
                      Borrar{" "}
                    </a>
                  </span>
                );
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
      </div>
      <Modal
        open={editarPersonaM}
        onClose={() => {
          setEditarPersonaM(false);
          fetchPersonas();
        }}
        backdrop={"static"}
        size={"xs"}
      >
        <Modal.Header>
          <Modal.Title>
            {typeModal === "edit" ? "Editar" : "Añadir"} Persona
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditarPersona
            id={idPersona}
            closeModal={() => {
              setEditarPersonaM(false);
              fetchPersonas();
            }}
            type={typeModal}
          />
        </Modal.Body>
      </Modal>
      <Button
        appearance="link"
        id="btn-timeline"
        onClick={() => {
          setShowTimeLine(!showTimeLine);
          if (showTimeLine) {
            document.getElementById("btn-timeline").innerHTML =
              "Ver historial de cambios (últimos 5)";
          } else {
            document.getElementById("btn-timeline").innerHTML =
              "Ocultar historial de cambios";
          }
        }}
      >
        Ver historial de cambios (últimos 5)
      </Button>
      {showTimeLine ? <Timeline /> : null}
    </div>
  );
};

export default App;
