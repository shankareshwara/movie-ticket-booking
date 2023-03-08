import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../ticket/ticket.css";

function Delete() {
    const[movie,setMovie]=useState([]);
    const [movie_ID, setId] = useState();
    const [error, setError] = useState('');
    useEffect(() => {
      axios.get("http://localhost:8080/movie")
          .then((response) => {
              console.log(response.data)
              setMovie(response.data)
          })
         
  }, []);
    
    function del() {
        // useEffect(() => {
            let length=Object.keys(movie).length;
            let f=0;
              //event.preventDefault();
              for(let i=0;i<length;i++){
                        if(Number(movie_ID)===movie[i].movie_ID){
                                f=1;
                                break;
                        }
                    }
                        
              if(f==1){
                axios.delete('http://localhost:8080/movie?id=' +movie_ID)
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => setError(error.message));                
                        alert("user deleted");
            }
            else{
                alert("Id not found");
            }
    }

    return (


        <>
   
        <div class="panel">
            <div class="state"><br/><i class="tick booking"></i><h1>Delete Movie</h1></div>
            <div class="form">
                <input placeholder='enter movie id' type="text"  value={movie_ID} onChange={(e) => {setId(e.target.value)}}/>

                <div class="submit" onClick={del}>confirm</div>
                <p id="id"></p>
            </div>
          
        </div>
        </> 

        
    );
}

export default Delete;