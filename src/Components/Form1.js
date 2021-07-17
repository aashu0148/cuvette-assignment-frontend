import React, { useState } from "react";
import { connect } from "react-redux";

function Form1(props) {
  const [remoteJob, setRemoteJob] = useState(props.data?.remote || false);
  const [title, setTitle] = useState(props.data?.title || "");
  const [location, setLocation] = useState(props.data?.location || "");
  const [errorMsg, setErrorMsg] = useState("");

  const submission = () => {
    if (!title || !location) {
      setErrorMsg("All fields required.");
      return;
    }
    setErrorMsg("");

    props.changeForm("form2");
    props.setDataAction({
      ...props.data,
      title,
      location,
      remote: remoteJob,
    });
  };

  return (
    <div className="form">
      <br />
      <br />
      <div className="field-form-elem">
        <label>Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div className="field-form-elem">
        <label>Job Location</label>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <p
          onClick={() => setRemoteJob(true)}
          className="small"
          style={{
            cursor: "pointer",
            margin: "0 3px",
            color: remoteJob ? "var(--primary-color)" : "",
          }}
        >
          This job is remote
        </p>
        <p
          onClick={() => setRemoteJob(false)}
          className="small"
          style={{
            cursor: "pointer",
            margin: "0 3px",
            color: !remoteJob ? "var(--primary-color)" : "",
          }}
        >
          This job is flexible
        </p>
      </div>
      <br />
      <div className="small field-error-msg">{errorMsg}</div>
      <div style={{ textAlign: "end" }}>
        <button
          onClick={submission}
          style={{ marginBottom: "0", marginLeft: "auto" }}
          className="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.currentData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataAction: (data) => dispatch({ type: "SET_CURR_DATA", data }),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Form1);
