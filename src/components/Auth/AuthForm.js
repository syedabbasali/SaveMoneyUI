import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const shop_typeInputRef = useRef();
  const shop_addressInputRef = useRef();
  
  const shop_postcodeInputRef = useRef();
  const shop_longitudeInputRef = useRef();
  const shop_latitudeInputRef = useRef();
  const shop_nameInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    // optional: Add validation

    setIsLoading(true);
    let url;
    var shop =   {}
    if (isLogin) {
      url =
        `http://54.174.0.81:8080/shop/get_shop/username=${enteredEmail}/password=${enteredPassword}`;
        shop =   {}
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(shop),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            setIsLoading(false);
            if (res.ok) {
              console.log(res.json);
              return res.json();
            } else {
              return res.json().then((json) => {
                let errorMessage = 'Authentication failed!';
                // if (data && data.error && data.error.message) {
                //   errorMessage = data.error.message;
                // }
    
                throw new Error(errorMessage);
              });
            }
          })
          .then((json) => {
            // console.log(json);
            localStorage.setItem('userProfile', JSON.stringify(json));
            var Profile = localStorage.getItem('userProfile');
            // console.log(Profile);
    
            const expirationTime = new Date(
              new Date().getTime() + +10000 * 1000
            );
            authCtx.login('abc123', expirationTime.toISOString());
            history.replace('/profile');
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });



    } else {
      url ='http://54.174.0.81:8080/registershop';
      
        const shop_type = shop_typeInputRef.current.value;
        const shop_address = shop_addressInputRef.current.value;
        const shop_name = shop_nameInputRef.current.value;
        const shop_postcode = shop_postcodeInputRef.current.value;
        const shop_longitude = shop_longitudeInputRef.current.value;
        const shop_latitude = shop_latitudeInputRef.current.value;
        shop = {
                  username:enteredEmail,
                  password:enteredPassword,
                  shop_type:shop_type,
                  shop_name:shop_name,
                  shop_address:shop_address,
                  shop_postcode:shop_postcode,
                  shop_longitude:shop_longitude,
                  shop_latitude:shop_latitude,
                  shop_crowd_flag:"1"
              }
      console.log(JSON.stringify(shop));

      const response = await fetch('http://54.174.0.81:8080/registershop', {
            method: 'POST',
            body: JSON.stringify(shop),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // const data = await response;
        console.log(response.status);
        if(response.status === 200) {
            alert("You are now Registered! Try Login into your account.");
            localStorage.setItem('userProfile', JSON.stringify(shop));
            var Profile = localStorage.getItem('userProfile');
            // console.log(Profile);
    
            const expirationTime = new Date(
              new Date().getTime() + +10000 * 1000
            );
            authCtx.login('abc123', expirationTime.toISOString());
            history.replace('/profile');
        }
    }
    

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {isLogin && (
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Username</label>
          <input type='text' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Register your business' : 'Login with existing account'}
          </button>
        </div>
      </form>)}
      {!isLogin && (
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Username</label>
          <input type='text' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="shop_name">Shop Name</label>
          <input required ref={shop_nameInputRef} type="text" placeholder="Shop name" id="shop_name" name="shop_name" />
        </div>
        <div className={classes.control}>
          <label htmlFor='shop_type'>shop_type</label>
          <input type='text' id='shop_type' required ref={shop_typeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='shop_address'>shop_address</label>
          <input
            type='text'
            id='shop_address'
            required
            ref={shop_addressInputRef}
          />
        </div>
        <div className={classes.control}>
            <label htmlFor="shop_postcode">Shop Postcode</label>
            <input required ref={shop_postcodeInputRef} type="text" placeholder="Shop Postcode" id="shop_postcode" name="shop_postcode" />
        </div>
        <div className={classes.control}>   
            <label htmlFor="shop_longitude">Longitude</label>
            <input required ref={shop_longitudeInputRef} type="text" placeholder="Longitude" id="shop_longitude" name="shop_longitude" />
        </div>
        <div className={classes.control}>   
            <label htmlFor="shop_latitude">Latitude</label>
            <input required ref={shop_latitudeInputRef} type="text" placeholder="Latitude" id="shop_latitude" name="shop_latitude" />
        </div>          
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>)}
    </section>
  );
};

export default AuthForm;
