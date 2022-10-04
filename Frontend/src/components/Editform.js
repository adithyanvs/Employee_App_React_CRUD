import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams,  } from "react-router-dom";
import { updatedata } from "./context/ContextProvider"

const Editform = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);
  const {updata,setUpdata} = useContext(updatedata)

  const navigate = useNavigate("")

  const [inpval, setINP] = useState({
    name: "",
    age: "",
    profession: "",
  });

  const setdata = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  // console.log(id);

  const getdata = async (e) => {
   

    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setINP(data);
      // console.log("get data");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {name,age,profession} = inpval

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,age,profession
      })
    });

    const data2 = await res2.json()
    // console.log(data2);

    if(res2.status === 42 || !data2){
        alert("fill the data")
    }else{
        // alert("Data updated")
        navigate('/')
        setUpdata(data2)
    }

  }

  return (
    <div className="container">
      <NavLink to="/"> Home </NavLink>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <form className="mt-5">
            <div className="mb-3 col-lg-8 col-md-8 col-12 ">
              <label for="exampleInputEmail1" className="form-label">
                Name
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
            <div class="mb-3 col-lg-8 col-md-8 col-12 ">
              <label for="exampleInputPassword1" class="form-label">
                Age
              </label>
              <input
                type="number"
                value={inpval.age}
                onChange={setdata}
                name="age"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-8 col-md-8 col-12 ">
              <label for="exampleInputPassword1" class="form-label">
                Profession
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

            <button type="submit" onClick={updateuser} class="btn btn-primary">
              Update
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Editform;
