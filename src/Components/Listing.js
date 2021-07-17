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
            <p style={{ flex: "1", fontWeight: "600", fontSize: "1.1rem" }}>
              {i + 1}.
            </p>
            <p style={{ flex: "7", fontWeight: "600", fontSize: "1.1rem" }}>
              {item.title}
            </p>
            <p style={{ flex: "5", fontWeight: "600", fontSize: "1.1rem" }}>
              {item.startDate}
            </p>
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
        <div style={{ marginTop: "-80px" }}>
          <p
            style={{
              color: "var(--primary-color)",
              cursor: "pointer",
              marginLeft: "auto",
              width: "fit-content",
            }}
            onClick={() => {
              setModalOpen(true);
              setModalBody(<AddListing close={() => setModalOpen(false)} />);
            }}
          >
            +Add Another Job
          </p>
          <Paper
            elevation={0}
            className="custom-scroll listing"
            style={{
              padding: "10px",
              minWidth: "330px",
              width: "630px",
              maxHeight: "300px",
              minHeight: "200px",
              overflowY: "scroll",
              maxWidth: "600px",
            }}
          >
            {errorMsg ? <p>{errorMsg}</p> : listings}
          </Paper>
        </div>
      </section>
    </div>
  );
}

export default Listing;
