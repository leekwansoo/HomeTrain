import React, {useState} from 'react'
import axios from 'axios'
const Login = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState("");

const handleSubmit = ((e) => {
   e.preventDefault();
  const data = {id: id, pw: pw}
  console.log(data)
  axios.post("http://localhost:8080/login", {id: id, pw: pw} ,
  {
    headers: {"Content-Type" : "application/json"},
    withCredentials : true
  })
.then(response => {
  console.log(response.data)}
)
})


  return (
    <>

    <div className="container">
    <h2> Home Exercise Tracker Login Page</h2>
        <form onSubmit = {handleSubmit}>
        <div>
            <label>UserName</label>
            <input type="text"  name="id" value = {id} onChange = { (e) => {setId (e.target.value)}} />
        </div>
        <br />
        <label>Password</label>
            <input type="text"  name="pw" value = {pw} onChange = { (e) => {setPw (e.target.value)}} />
        <button type="submit" className="btn btn-danger" >Login</button>
        </form>
    </div>
    
</>
  )
}

export default Login;