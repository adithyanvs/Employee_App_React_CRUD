import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata, updatedata, deldata } from "./context/ContextProvider";
// import { updatedata } from "./context/ContextProvider"
// import{ deldata } from "./context/ContextProvider"

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const {udata,setUdata} = useContext(adddata)//for create
  const {updata,setUpdata} = useContext(updatedata)//for update
  const {dltdata,setDltdata} = useContext(deldata)//for update


  const getdata = async (e) => {
    // e.preventDefault();

    const res = await fetch("/getdata", {
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
      setUserdata(data);
      // console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

    const deleteuser = async(id)=>{
      const res2 = await fetch(`/deleteuser/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const deletedata = await res2.json()
      // console.log(deletedata);

      if(res2.status === 422 || !deletedata){
        console.log("error");
      }else{
        // console.log("User deleted successfully");
        setDltdata(deletedata)
        getdata()
      }

    }

  return (

    <>
      {
         udata?
         <>
         <div class="alert alert-success alert-dismissible fade show" role="alert">
         <strong>{udata.name}</strong> added successfully!
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>
         </>:""
      }
      {
         updata?
         <>
         <div class="alert alert-success alert-dismissible fade show" role="alert">
         <strong>{updata.name}</strong> updated successfully!
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>
         </>:""
      }
      {
        dltdata?
         <>
         <div class="alert alert-danger alert-dismissible fade show" role="alert">
         <strong>{dltdata.name}</strong> deleted successfully!
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>
         </>:""
      }


    

    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            Add Data
          </NavLink>
        </div>

        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">age</th>
              <th scope="col">profession</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.age}</td>
                    <td>{element.profession}</td>
                    <td className="d-flex justify-content-between ">
                      <NavLink to={`view/${element._id}`}><button className="btn btn-success">
                          <RemoveRedEyeIcon /></button></NavLink>
                      <NavLink to={`edit/${element._id}`} ><button className="btn btn-primary">
                          <CreateIcon /></button></NavLink>
                       <button className="btn btn-danger" onClick={()=>deleteuser(element._id)} ><DeleteOutlineIcon /></button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Home;
