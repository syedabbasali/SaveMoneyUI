import classes from './NearByShopsPage.module.css';
import { useRef, useContext } from 'react';
import React, { useState } from 'react';

import AuthContext from '../../store/auth-context';

const ShopsListing = () => {
    const [shops, setShops] = useState([]);
  
    const longitudeInputRef = useRef();
    const latitudeInputRef = useRef();
    const postcodeInputRef = useRef();
    const itemInputRef = useRef();
    const typeInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
    
        const longitude = longitudeInputRef.current.value;
        const latitude = latitudeInputRef.current.value;
        const postcode = postcodeInputRef.current.value;
        const item = itemInputRef.current.value;
        const type = typeInputRef.current.value;
        
        // add validation
        let url = `http://54.174.0.81:8080/shop/get_nearby_shops/longitude=${longitude}/latitude=${latitude}/postcode=${postcode}/item=${item}/shop_type=${type}`;
        // console.log(url);
        fetch(url)
        // fetch(`http://54.174.0.81:8080/shop/get_shop_type/username=Test102/password=Test102`)
         .then(response => {
          // assumption: Always succeeds!
            return response.json();
        }).then(json => {
            console.log(json)
              setShops(json);
            
        });
      }
  return (
    <div>
        <div>
        <form onSubmit={submitHandler}>
            <div className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='new-password'>Type</label>
                    <input type='text' id='new-password' ref={typeInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='Longitude'>Longitude</label>
                    <input type='text' id='Longitude' ref={longitudeInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='Latitude'>Latitude</label>
                    <input type='text' id='Latitude' ref={latitudeInputRef} />
                </div>
            </div>
            <div className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='postcode'>Post Code</label>
                    <input type='text' id='postcode' ref={postcodeInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='item'>Item</label>
                    <input type='text' id='item' ref={itemInputRef} />
                </div>
                
                <div className={classes.action}>
                    <button>Search Near By Shops</button>
                </div>
            </div>
        </form>
        </div>
        
        <div className='display-grid' style={{margin: "0 7vw"}}>
            {shops.map((shop) => (
                <div className={classes.shop}>
                    <div className='display-flex' style={{justifyContent: "space-between"}}>
                        <h1>{shop.shop_name}</h1>
                        <div className={classes.action}>
                            <a href={'https://maps.google.com/?q=' + shop.shop_latitude +','+ shop.shop_longitude} target="_blank">Locate Shop</a>
                        </div>
                    </div>
                    
                    <div className='display-flex' style={{justifyContent: "space-between"}}>
                        <p>Add: {shop.shop_address}</p>
                        <p>Postcode: {shop.shop_postcode}</p>
                    </div>
                    <div className='display-flex' style={{justifyContent: "space-between"}}>
                        <p>Type: {shop.shop_type}</p>
                        <p>Crowd: {shop.shop_crowd}</p>
                        <p>Status: {shop.shop_status}</p>
                    </div>
                    <div className='display-flex' style={{justifyContent: "space-between"}}>
                        <p>Item Price: {shop.itemPrice}</p>
                       
                    </div>
                </div>
            ))}
        </div>
        
    </div>
  );
};

export default ShopsListing;