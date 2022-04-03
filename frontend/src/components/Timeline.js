import React, { useState, useEffect } from "react";
import { Timeline as TimelineC } from "rsuite";
import Loader from "rsuite/Loader";
import { baseURL } from "../util";
import Message from "rsuite/Message";
import toaster from "rsuite/toaster";

const Timeline = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const message = (type, message) => (
    <Message showIcon type={type} closable>
      {type === "success" ? "Éxito" : "Error"}: {message}.
    </Message>
  );

  useEffect(() => {
    fetch(`${baseURL}/timeline/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "ok") {
          setData(res.data);
        } else {
          toaster.push(message("error", res.message), "bottomCenter");
        }
        setLoading(false);
      })
      .catch((erro) => {
        setLoading(false);
        toaster.push(message("error", erro.message), "bottomCenter");
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader size="md" />
      ) : (
        <TimelineC align="alternate">
          {data ? (
            data.map((item) => (
              <TimelineC.Item key={item.id}>{item.descripcion}</TimelineC.Item>
            ))
          ) : (
            <p>No hay datos</p>
          )}
        </TimelineC>
      )}
    </div>
  );
};

export default Timeline;
