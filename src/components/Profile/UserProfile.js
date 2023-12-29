import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import { useState, useEffect, useRef } from 'react';
import ItemUpload from './ItemUpload';
import { FaEdit } from "react-icons/fa";
import EditUser from './EditUser';

const UserProfile = () => {

  const ref = useRef(null);
  const {tableau} = window;

  const  url="https://public.tableau.com/views/saveMoneyDashboard/Dashboard1"

  const options = {
    device: "desktop",
  }

  function initViz() {
    new tableau.Viz(ref.current, url, options);
  }

  useEffect(() => {
    initViz();
  },[])

  const [isChangePassword, setisChangePassword] = useState(false);
  const [profile, setProfile] = useState([]);
  const [edit, setEdit] = useState(false);
  const[userEdit, setuserEdit] = useState("");


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userProfile'));
    
    fetch(`http://54.174.0.81:8080/shop/get_shop/username=${items.username}/password=${items.password}`, {method: 'POST'})
     .then(response => {
      // assumption: Always succeeds!
        return response.json();
    }).then(json => {
        setProfile(json);
    });
  }, [edit]);
  
  const ChangePassword = () => {
    setisChangePassword(true);
  }

  const returnProfile = () => {
    setisChangePassword(false);
  }

  function editUserDetails(param){
    setEdit(true);
    console.log(param);
    const p = param;
    setuserEdit(p);
  }

  const userUpdated = () => {
    console.log("working");
    setEdit(false);
  }
  
  return (
    
    <section className={classes.profile}>

      <h1>Your User Profile</h1>
      {edit && 
        <EditUser userEdit={userEdit} userUpdated={()=>userUpdated()} />
      }
      
      {!isChangePassword && (
        <section className={classes.auth}>
          <h2>Shop Details</h2>
          <div className={classes.displayFlex}>
            <div>
              <p><b>Username</b>: &nbsp;&nbsp; {profile.username}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Shop Name')} title='Edit' /> <b>Shop Name</b>: &nbsp;&nbsp; {profile.shop_name}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Shop Type')} title='Edit' /> <b>Shop Type</b>: &nbsp;&nbsp; {profile.shop_type}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Shop Status')} title='Edit' /> <b>Shop Status</b>: &nbsp;&nbsp; {profile.shop_status}</p>
              <br></br>
              </div>
            <div>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Shop Address')} title='Edit' /> <b>Shop Address</b>: &nbsp;&nbsp; {profile.shop_address}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Shop Postcode')} title='Edit' /> <b>Shop Postcode</b>: &nbsp;&nbsp; {profile.shop_postcode}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Latitude')} title='Edit' /> <b>Shop Latitude</b>: &nbsp;&nbsp; {profile.shop_latitude}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Longitude')} title='Edit' /> <b>Shop Longitude</b>: &nbsp;&nbsp; {profile.shop_longitude}</p>
              <p><FaEdit className={classes.edit} onClick={()=>editUserDetails('Shop Crowd')} title='Edit' /> <b>Shop Crowd</b>: &nbsp;&nbsp; {profile.shop_crowd}</p>
            </div>
          </div>
          <hr style={{margin: "20px"}}></hr>
          <ItemUpload />
        </section>
      )}
      {!isChangePassword && (
        <div className={classes.action}>
          <button onClick={ChangePassword}>Change Password</button>
        </div>
      )}
      {isChangePassword && (
        <ProfileForm />
      )}
      {isChangePassword && (
        
          <button
            type='button'
            className={classes.toggle}
            onClick={returnProfile}
            >
            Return to Profile
          </button>
        
      )}
      
      <br />
      <hr />
        <div>
          <div ref={ref}></div>
        </div>

      
      
    </section>
   
  );
};

export default UserProfile;
