import React, {useState } from 'react'


const Login = () => {

  const [id, setId] = useState();
  const [pw, setPw] = useState();
  
  return (
    <div>
 
    <div className="container mt-3">
        <form action="http://localhost:8080/login" method="POST">
          <div className="form-group">
            <label>아이디</label>
            <input type="text" className="form-control" name="id" />
          </div>
          <div className="form-group">
            <label>비번</label>
            <input type="text" className="form-control" name="pw" />
          </div>
          <button type="submit" className="btn btn-danger">로그인</button>
        </form>
      </div>

      <div className="container mt-4">
        <form action="http://localhost:8080/register" method="POST">
          <div className="form-group">
            <label>아이디</label>
            <input type="text" className="form-control" name="id" />
          </div>
          <div className="form-group">
            <label>비번</label>
            <input type="password" className="form-control" name="pw" />
          </div>
          <button type="submit" className="btn btn-danger">가입</button>
        </form>
      </div>
      

    </div>
  )
}

export default Login
