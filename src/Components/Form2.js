import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import Select from "react-select";

import Slider from "./Slider";

function Form2(props) {
  const [mode, setMode] = useState(props.data?.mode || "part");
  const [values, setValues] = useState({
    skills: props.data?.skills || "",
    stipend: props.data?.stipend || "",
    jd: props.data?.jd || "",
    duration: props.data?.duration || "",
    startDate: props.data?.startDate || "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submission = () => {
    if (buttonDisabled) return;

    if (
      !(
        values.skills?.length > 0 &&
        values.stipend?.length > 0 &&
        values.jd &&
        values.duration &&
        values.startDate
      )
    ) {
      setErrorMsg("All fields required.");
      return;
    }
    setErrorMsg("");
    setButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/listing/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...props.data,
          mode,
          ...values,
        },
      }),
    })
      .then(async (res) => {
        setButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        props.setDataAction({});
        props.close();
      })
      .catch((err) => {
        setButtonDisabled(false);
        setErrorMsg("Error connecting to server.");
      });
  };

  useEffect(() => {
    props.setDataAction({
      ...props.data,
      ...values,
    });
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="form"
      style={{ overflowY: "Scroll", maxHeight: "94vh", minWidth: "350px" }}
    >
      <div style={{ display: "flex" }}>
        <BackIcon
          style={{ cursor: "pointer" }}
          onClick={() => props.changeForm("form1")}
        />
        <p style={{ flex: "1", textAlign: "center" }}>#Intern Details</p>
      </div>
      <div className="field-form-elem">
        <label>Job Title</label>
        <Select
          defaultValue={props.data?.skills || ""}
          isMulti
          name="Skills"
          options={[
            { value: "js", label: "JavaScript" },
            { value: "angular", label: "Angular" },
            { value: "ts", label: "TypeScript" },
            { value: "react", label: "React" },
            { value: "python", label: "Python" },
            { value: "django", label: "Django" },
            { value: "node", label: "Node" },
          ]}
          onChange={(value) => {
            const myValues = { ...values };
            myValues.skills = value;
            setValues(myValues);
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <br />
      <div className="field-form-elem">
        <label>Mode</label>
        <div
          style={{ display: "flex", justifyContent: "space-around", flex: "1" }}
        >
          <p
            onClick={() => setMode("part")}
            // className="small"
            style={{
              position: "relative",
              cursor: "pointer",
              margin: "0 6px",
              fontSize: "14px",
              color: mode === "part" ? "var(--primary-color)" : "",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "-14px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "12px",
                width: "12px",
                border: "1px solid #eee",
                background: mode === "part" ? "#0c1446" : "",
              }}
            />
            Part-time
            <br />
            20 hrs/week
          </p>
          <p
            onClick={() => setMode("semi-full")}
            // className="small"
            style={{
              position: "relative",
              cursor: "pointer",
              margin: "0 6px",
              fontSize: "14px",
              color: mode === "semi-full" ? "var(--primary-color)" : "",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "-14px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "12px",
                width: "12px",
                border: "1px solid #eee",
                background: mode === "semi-full" ? "#0c1446" : "",
              }}
            />
            Semi Full-time
            <br />
            30 hrs/week
          </p>
          <p
            onClick={() => setMode("full")}
            // className="small"
            style={{
              position: "relative",
              cursor: "pointer",
              margin: "0 6px",
              fontSize: "14px",
              color: mode === "full" ? "var(--primary-color)" : "",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "-14px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "12px",
                width: "12px",
                border: "1px solid #eee",
                background: mode === "full" ? "#0c1446" : "",
              }}
            />
            Full-time
            <br />
            40 hrs/week
          </p>
        </div>
      </div>

      <br />
      <div className="field-form-elem">
        <label>Stipend Range</label>
        <div style={{ flex: "1", marginLeft: "6px" }}>
          <Slider
            value={props.data?.stipend || [30000, 120000]}
            onChange={(value) => {
              const myValues = { ...values };
              myValues.stipend = value;
              setValues(myValues);
            }}
          />
        </div>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <div className="field-form-elem field-form-elem-no-width">
          <label style={{ minWidth: "fit-content" }}>StartDate</label>
          <input
            className="input-box"
            style={{ width: "150px" }}
            type="text"
            placeholder="dd/mm/yy"
            defaultValue={props.data?.startDate || ""}
            onBlur={(e) => {
              const myValues = { ...values };
              myValues.startDate = e.target.value;
              setValues(myValues);
            }}
          />
        </div>
        <div className="field-form-elem field-form-elem-no-width">
          <label style={{ minWidth: "fit-content", marginLeft: "5px" }}>
            Duration
          </label>
          <input
            style={{ width: "50px" }}
            className="input-box"
            type="text"
            defaultValue={props.data?.duration || ""}
            onBlur={(e) => {
              const myValues = { ...values };
              myValues.duration = e.target.value;
              setValues(myValues);
            }}
          />
          <p>Months</p>
        </div>
      </div>
      <br />
      <div className="field-form-elem">
        <label>Job Description</label>
        <textarea
          placeholder={`Enter Job description.    
Try to be as precise as possible (200-300 words)`}
          style={{
            width: "98%",
            minHeight: "200px",
            outline: "none",
            padding: "10px",
          }}
          onBlur={(e) => {
            const myValues = { ...values };
            myValues.jd = e.target.value;
            setValues(myValues);
          }}
          defaultValue={props.data?.jd || ""}
        />
      </div>
      <br />
      <div className="small field-error-msg">{errorMsg}</div>
      <div style={{ textAlign: "end" }}>
        <button
          onClick={submission}
          style={{ marginBottom: "0", marginLeft: "auto" }}
          className="button"
        >
          Post
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

export default connect(mapStateToProps, mapDispatchToProps)(Form2);
