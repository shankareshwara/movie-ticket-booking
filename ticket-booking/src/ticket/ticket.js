 import "../ticket/ticket.css"
import React, {useState,useEffect} from 'react'
import axios from "axios";
function Ticket() {
    const [movie,setMovie] = useState([]);
    const [id,setId] = useState();
    const [seat,setSeats] = useState();
    const [change,setChange] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/movie")
            .then((response) => {
                console.log(response.data)
                setMovie(response.data)
            })
           
    }, []);

    let pos=0;
    const handleClick = ()  => {
        let length=Object.keys(movie).length;

        let f=0;
              //event.preventDefault();
              for(let i=0;i<length;i++){
                        if(Number(id)===movie[i].movie_ID){
                                f=1;
                                pos=i;
                                break;
                        }
                    }

                    
                    
                    if(f==0){
                        alert("Wrong Id");
                    }
                    else{
            fetch("http://localhost:8080/movie/"+id).then(res => res.json()).then( res => setChange(res));
         if(seat > movie[pos].seat_AVAIL){
            document.getElementById('mssg').innerHTML = NaN; 
            alert("seat exceeds");  
        }
        else{
            document.getElementById('mssg').innerHTML = movie[pos].price * seat;
        }
    }
    }
    
    const handleUpdate = () => {

        change.seat_AVAIL=change.seat_AVAIL-seat;

       fetch("http://localhost:8080/movie",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(change)}).then(res => console.log("Added"));
       alert("tickets confirmed");
    }
    return ( <>
   
    <div class="panel">
		<div class="state"><br/><i class="tick booking"></i><h1>Ticket Booking</h1></div>
		<div class="form">
			<input placeholder='enter movie id' type="text" value={id} onChange={(e) => {setId(e.target.value)}}/>
			<input placeholder='No. seats' type="text" value={seat} onChange={(e) => {setSeats(e.target.value)}}/>
			<div class="submit" onClick={handleClick}>submit</div>
            <p id="mssg">NaN</p>
			<div class="submit" onClick={handleUpdate}>confirm</div>
		</div>
		<div class="question"><a href="#"><i class="tick further"></i>further question</a></div>
	</div>
    </> );
}

export default Ticket;