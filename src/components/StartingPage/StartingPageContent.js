import classes from './StartingPageContent.module.css';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
// var divElement = document.getElementById('viz1671630712673');                    
//   var vizElement = divElement.getElementsByTagName('object')[0];                    
//   if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1000px';vizElement.style.height='827px';} 
//   else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1000px';vizElement.style.height='827px';} 
//   else { vizElement.style.width='100%';vizElement.style.height='727px';}                     
//   var scriptElement = document.createElement('script');                    
//   scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
//   vizElement.parentNode.insertBefore(scriptElement, vizElement);    
const StartingPageContent = () => {
        
  return (
    <section className={classes.starting}>
      <h1>Welcome to Save Money!</h1>
      <div className='display-grid' style={{margin: "0 7vw"}}>
        <Link to='/auth' className={classes.shop}>
            <div className='display-flex' style={{justifyContent: "space-between"}}>
                <h2>
                  We provide shop owners our platform to grow their buisness sign up for free and register your shop with us.
                </h2>
            </div>
          </Link>
          <Link to='/nearbyshops' className={classes.shop}>
            <div className='display-flex' style={{justifyContent: "space-between"}}>
                <h2>
                  Save your money and time by searching the near by shop around you.
                </h2>
            </div>
          </Link>
        </div>
       
        
    </section>
          
  );
};

export default StartingPageContent;
