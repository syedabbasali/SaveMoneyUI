import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();


  
  const usernameInputRef = useRef();
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation

    fetch(`http://54.174.0.81:8080/shop/update_password/username=${enteredUsername}/oldpassword=${enteredOldPassword}/newpassword=${enteredNewPassword}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!

      history.replace('/');
    });
  };

  return (
    <div>
      <h2>Change Password</h2>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input required type='text' id='username' ref={usernameInputRef} />
        </div>
      <div className={classes.control}>
          <label htmlFor='old-password'>Old Password</label>
          <input required type='password' id='old-password' ref={oldPasswordInputRef} />
        </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input required type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      
    </form>
    </div>
  );
};

export default ProfileForm;
