import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'

import Form1 from "./Form1";
import Form2 from "./Form2";

function AddListing() {
    const history=useHistory()
  const [form, setForm] = useState("");

  const changeForm = (form) => {
    switch (form) {
      case "form1": {
        setForm(<Form1 changeForm={changeForm} />);
        break;
      }

      case "form2": {
        setForm(
          <Form2
            changeForm={changeForm}
            close={() => {
              history.push('/listing')
            }}
          />
        );
        break;
      }
      default: {
        setForm(<Form1 changeForm={changeForm} />);
      }
    }
  };

  useEffect(() => {
    setForm(<Form1 changeForm={changeForm} />);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>{form}</div>;
}

export default AddListing;
