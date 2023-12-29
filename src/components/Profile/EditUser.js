import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const EditUser = (props) => {
  const history = useHistory();


  var username = JSON.parse(localStorage.getItem('userProfile'));
  const userEditInputRef = useRef();
  const authCtx = useContext(AuthContext);

  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUser = userEditInputRef.current.value;

    if(props.userEdit === "Shop Name") {
        fetch(`http://54.174.0.81:8080/shop/update_shopname/username=${username.username}/password=${username.password}/shopname=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
        
    } else if(props.userEdit === "Shop Type") {
        fetch(`http://54.174.0.81:8080/shop/update_shoptype/username=${username.username}/password=${username.password}/shoptype=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    } else if(props.userEdit === "Shop Address") {
        fetch(`http://54.174.0.81:8080/shop/update_shopaddress/username=${username.username}/password=${username.password}/shopaddress=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    } else if(props.userEdit === "Shop Postcode") {
        fetch(`http://54.174.0.81:8080/shop/update_shoppostcode/username=${username.username}/password=${username.password}/shoppostcode=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    } else if(props.userEdit === "Longitude") {
        fetch(`http://54.174.0.81:8080/shop/update_shoplongitude/username=${username.username}/password=${username.password}/shoplongitude=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    } else if(props.userEdit === "Latitude") {
        fetch(`http://54.174.0.81:8080/shop/update_shoplatitude/username=${username.username}/password=${username.password}/shoplatitude=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    } else if(props.userEdit === "Shop Crowd") {
        
        fetch(`http://54.174.0.81:8080/shop/update_person_count/username=${username.username}/count=${enteredUser}/event=Entry`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    } else if(props.userEdit === "Shop Status") {
        fetch(`http://54.174.0.81:8080/shop/update_shop_status/username=${username.username}/password=${username.password}/status=${enteredUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              props.userUpdated();
              
              alert(props.userEdit + " is Updated!");
          }).catch((err) => {
            console.log(err);
            alert(err.message);
          });
    }

    
  };

  return (
    <div>
      <h2>Change "{props.userEdit}"</h2>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='username'>{props.userEdit}</label>
          <input required type='text' id='username' ref={userEditInputRef} />
        </div>
     
      <div className='display-flex jc-space-evenly'>
        <div className={classes.action}>
          <button>Save Changes</button>
        </div>
        
          <a className={classes.cancel} onClick={()=> props.userUpdated()}>Cancel</a>
        
      </div>
      
    </form>
    </div>
  );
};

export default EditUser;


