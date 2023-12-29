import React, { useState } from 'react';
import classes from './UserProfile.module.css';
import { useHistory } from 'react-router-dom';

function ItemUpload() {
    const history = useHistory();
  const [file, setFile] = useState("");
  const ref = React.useRef();


  var username = JSON.parse(localStorage.getItem('userProfile'));

  const handleUploadClick = async () => {

    const formData = new FormData();
    formData.append('file',file);

    // 👇 Uploading the file using the fetch API to the server
    await fetch(`http://54.174.0.81:8080/shop/upload_item_list/username=${username.username}/password=${username.password}`, {
      method: 'POST',
      body: formData,
      // 👇 Set headers manually for single file upload
     
    })
      .then((response) => {
        if(response.status === 200) {
            ref.current.value = ""
            alert("Items Successfully uploaded.");
            history.replace('/profile');
        }
      })
      .then((data) => console.log(file))
      .catch((err) => console.error(err));
  };



  return (
    <div>
        <h2>Items Upload</h2>
      <div className=''>
              <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={ref} />
                <br/><br></br>
              <div className={classes.action}>
                    <button onClick={handleUploadClick}>Upload</button>
              </div>
              
      </div>
    </div>
  );
}

export default ItemUpload;