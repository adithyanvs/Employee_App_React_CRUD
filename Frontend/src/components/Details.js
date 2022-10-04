import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import profilePic from '../assets/Profile.png'
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const Details = () => {

  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const {id} = useParams("")
  // console.log(id);

  const navigate = useNavigate("")

  const getdata = async (e) => {
    // e.preventDefault();

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
      setUserdata(data);
      // console.log("get data");
    }
  }

  useEffect(()=>{
    getdata()
  },[])

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
      alert("Deleted successfully")
      navigate('/')
    }

  }


  return (
    <div className='container mt-3' >
        <h2 style={{fontWeight:400}} >Welcome {getuserdata.name}</h2>

        <Card sx={{ maxWidth: 375 }}>
      <CardContent>
      <div className="card_division">

        <img src={profilePic} style={{width:70}} alt='profile picture' />
        <NavLink to={`/edit/${getuserdata._id}`} ><button className="btn btn-primary float-end " ><CreateIcon/></button></NavLink>  
        <button className="btn btn-danger float-end mx-2" onClick={()=>deleteuser(getuserdata._id)} ><DeleteOutlineIcon/></button>
        <h3 className='mt-3' >Name: <span style={{fontWeight:400}} >{getuserdata.name}</span></h3>
        <h3 className='mt-3' >Age: <span style={{fontWeight:400}} >{getuserdata.age}</span></h3>
        <h3 className='mt-3' >Profession: <span style={{fontWeight:400}} >{getuserdata.profession}</span></h3>

      </div>

        
      </CardContent>
      </Card>

    </div>
  )
}

export default Details