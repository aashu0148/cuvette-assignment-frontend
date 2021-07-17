import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Paper } from "@material-ui/core";

import Navbar from "./Navbar";
import AddListing from "./AddListing";
import "./Main.css";

function Main(props) {
  const history = useHistory();
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
            <AddListing
              close={() => {
                setModalOpen(false);
                history.pushState("/listing");
              }}
            />
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
