import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    age: "",
    profession: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, age, profession } = inpval;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        profession,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      // alert("Employee data successfully added")
      navigate("/");
      setUdata(data);
      console.log("data added");
    }
  };

  return (
    <div>
    <div></div>
      <div className="container">
        {/* <NavLink to="/" > Home  </NavLink> */}
        {/* <h4 style={{}} >Enter new employee details below:</h4> */}
        <div className="row mt-5">
          <div className="col-2"></div>
          <div className="col-6 regformdiv">
          <h4 style={{color: "red",marginTop:"30px",}} >Enter new employee details below:</h4>
            <form className="mt-3 regform">
              <div className="mb-3 col-lg-8 col-md-8 col-12 w-100 ">
                <label for="exampleInputEmail1" className="form-label">
                  Name:
                </label>
                <input
                  
                  type="text"
                  value={inpval.name}
                  onChange={setdata}
                  name="name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3 col-lg-8 col-md-8 col-12 w-100">
                <label for="exampleInputPassword1" class="form-label">
                  Age:
                </label>
                <input
                  type="text"
                  value={inpval.age}
                  onChange={setdata}
                  name="age"
                  class="form-control"
                  id="exampleInputPassword1"
                  
                />
              </div>
              <div class="mb-3 col-lg-8 col-md-8 col-12 w-100 ">
                <label for="exampleInputPassword1" class="form-label">
                  Profession:
                </label>
                <input
                  type="text"
                  value={inpval.profession}
                  onChange={setdata}
                  name="profession"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div className="d-flex justify-content-between mt-3 mb-5">
                <button
                  type="submit"
                  onClick={addinpdata}
                  class="btn btn-primary"
                >
                  <DoneAllIcon/>
                  Submit
                </button>
                <NavLink to="/" className="btn btn-primary ">
                  <ArrowBackIcon/>
                  Back
                </NavLink>
              </div>
            </form>
          </div>
          <div className="col-2"></div>
          
        </div>
        <>
          <h1></h1>
          <h1></h1>
          
        </>
      </div>
      
    </div>
  );
};

export default Register;
