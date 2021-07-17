import React, { useState, useEffect } from "react";
import { Modal, Paper } from "@material-ui/core";

import Navbar from "./Navbar";
import AddListing from "./AddListing";

function Listing() {
  const [listings, setListings] = useState("Loading ...");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/listing/get`)
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        const result = data.data.map((item, i) => (
          <div
            key={item._id + i}
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "10px",
            }}
          >
            <h5 style={{ flex: "1" }}>{i + 1}.</h5>
            <h5 style={{ flex: "7" }}>{item.title}</h5>
            <p style={{ flex: "5" }}>{item.startDate}</p>
            <p
              style={{ flex: "4", cursor: "pointer" }}
              onClick={() => {
                setModalOpen(true);
                setModalBody(
                  <div style={{ padding: "10px" }}>
                    {[
                      "title",
                      "skills",
                      "jd",
                      "startDate",
                      "duration",
                      "mode",
                      "location",
                      "stipend",
                      "remote",
                    ].map((e, i) => (
                      <div
                        key={i}
                        style={{
                          flexWrap: "wrap",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <h5
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textTransform: "capitalize",
                          }}
                        >
                          {e}
                        </h5>
                        <p>{JSON.stringify(item[e])}</p>
                      </div>
                    ))}
                  </div>
                );
              }}
            >
              details
            </p>
          </div>
        ));
        setListings(result);
      })
      .catch((err) => {
        setErrorMsg("Error connecting to server.");
      });
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        // BackdropProps={{ invisible: true }}
      >
        <div
          style={{
            background: "#fff",
            minWidth: "350px",
            width: "fit-content",
            height: "fit-content",
            outline: "none",
            margin: "5px",
            borderRadius: "4px",
          }}
        >
          <Paper elevation={2}>{modalBody}</Paper>
        </div>
      </Modal>

      <Navbar />
      <section
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <p
            style={{
              color: "var(--primary-color)",
              cursor: "pointer",
              marginLeft: "auto",
              width: "fit-content",
            }}
            onClick={() => {
              setModalOpen(true);
              setModalBody(<AddListing />);
            }}
          >
            +Add Listing
          </p>
          <div
            className="custom-scroll"
            style={{
              minWidth: "330px",
              maxHeight: "70vh",
              minHeight: "200px",
              overflowY: "scroll",
              maxWidth: "600px",
            }}
          >
            {errorMsg ? <p>{errorMsg}</p> : listings}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Listing;
