import React, { useState } from "react";
import { Modal, Paper } from "@material-ui/core";

import Navbar from "./Navbar";
import AddListing from "./AddListing";
import "./Main.css";

function Main(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="main">
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
          <Paper elevation={2}>
            <AddListing />
          </Paper>
        </div>
      </Modal>

      <Navbar />
      <section>
        <h1>Hi company user, Welcome to Cuvette Tech</h1>

        <button
          className="button big-button"
          onClick={() => setModalOpen(true)}
        >
          +Post a Job
        </button>
      </section>
    </div>
  );
}

export default Main;
