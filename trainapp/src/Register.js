import React, {useState} from 'react'

const Register = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState("");

  return (
    <>
 
    <h2> Home Exercise Tracker Register Page</h2>
   
    <div className="container">
      <form action="http://localhost:8080/register" method="POST">
      <div>
        <label>UserName</label>
        <input type="text"  name="id" value = {id} onChange = { (e) => {setId (e.target.value)}} />
      </div>
     <br />
      <label>Password</label>
        <input type="text"  name="pw" value = {pw} onChange = { (e) => {setPw (e.target.value)}} />
      <button type="submit" className="btn btn-danger" >등록</button>
    </form>
  </div>
</>
  )
}

export default Register;