import React from 'react';
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

function Main() {
  const [post, setPost] = useState([]);
   
  useEffect(() => {
    axios.get("http://localhost:8080/hometrain").then(response => {
        setPost(response.data);
        console.log(response.data)
       
    });
  }, []);

  async function deleteHandler(id, e) {
    e.preventDefault();
    console.log(id)
    await axios.delete(`http://localhost:8080/deletetrain/${id}`).then((response) => {
      console.log("excuted")
    }).then((res) => console.log(res)
    ).catch((error) =>{console.log(error)})
  };

  return (
    <>
    <div>
    <Table striped bordered hover variant="white">
    
      <thead>
        <tr>
            <th align="center">Date</th>
            <th align="center">푸쉬업</th>
            <th align="center">배운동</th>
            <th align="center">벽스퀏</th>
            <th align="center">팔운동</th>
            <th align="center">상체들기</th>
            <th align="center">뒤꿈치들기</th>
            <th align="center">의자발차기</th>
            <th align="center">무릎벌리기</th> 
        </tr>
      </thead>
      <tbody>
        {post.map((post) => {
        return(
            <tr key={post._id}>
                <td align="right">{post.date}</td>
                <td align="right">{post.pushup}</td>
                <td align="right">{post.stomach}</td>
                <td align="right">{post.squat}</td>
                <td align="right">{post.arm}</td>
                <td align="right">{post.uplift}</td>
                <td align="right">{post.upheel}</td>
                <td align="right">{post.kick_on_chair}</td>
                <td align="right">{post.spreading_thigh}</td>
                <td align="right"><button onClick = {(e) => deleteHandler(post._id, e)}>삭제</button></td>
            </tr>
            )
        })}
        </tbody>
      </Table>
    </div>
    </>
  );
}

export default Main;
