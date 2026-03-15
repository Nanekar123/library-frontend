import {useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function IssueBook(){

const navigate=useNavigate();

const [data,setData]=useState({
userId:"",
bookId:""
});

const handleChange=(e)=>{
setData({...data,[e.target.name]:e.target.value});
};

const issueBook=async()=>{

await API.post("/issues",data);

navigate("/success");

};

return(

<div style={{padding:"40px"}}>

<h2>Issue Book</h2>

<input name="userId" placeholder="User ID" onChange={handleChange}/>
<br/><br/>

<input name="bookId" placeholder="Book ID" onChange={handleChange}/>
<br/><br/>

<button onClick={issueBook}>Issue Book</button>

</div>
);
}

export default IssueBook;