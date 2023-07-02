import React, {useState} from 'react'

const DataUpload = () => {

const [pushup, setPushup] = useState("");
const [stomach, setStomach] = useState("");
const [squat, setSquat] = useState("");
const [arm, setArm] = useState("");
const [uplift, setUplift] = useState("");
const [upheel, setUpheel] = useState("");
const [kick_on_chair, setKick_on_chair] = useState("");
const [spreading_thigh, setSpreading_thigh] = useState("");


return (
  
    <div className="container">
    <form action="http://localhost:8080/train" method="POST">
        <div className ="form-group">
        <table>
          <tbody>
              <tr>
                  <td>푸시엎<input type="number"  name="pushup" value = {pushup} onChange = { (e) => {setPushup(e.target.value)}} /></td>
                  <td>배운동<input type="number"  name="stomach" value = {stomach} onChange ={(e) => {setStomach(e.target.value)}} /></td>
                  <td>벽스퀏<input type="number"  name="squat" value = {squat} onChange = {(e) => {setSquat(e.target.value)}} /></td>
                  <td>팔운동<input type="number"  name="arm" value = {arm} onChange = {(e) => {setArm(e.target.value)}} /></td>
              </tr>
              <tr>
                  <td>상체들기<input type="number"  name="uplift" value = {uplift} onChange = {(e) => {setUplift(e.target.value)}} /></td>
                  <td>뒷꿈치들기<input type="number"  name="upheel" value = {upheel} onChange = {(e) => {setUpheel(e.target.value)}} /></td>
                  <td>의자발차기<input type="number"  name="kick_on_chair" value = {kick_on_chair} onChange = {(e) =>{setKick_on_chair(e.target.value)}} /></td>
                  <td>무릎벌리기<input type="number"  name="spreading_thigh" value = {spreading_thigh} onChange = {(e) =>{setSpreading_thigh(e.target.value)}} /></td>          
              </tr>    
          </tbody>
          </table>
          <button type="submit" className="btn btn-danger" >Submit</button>
          </div>
        </form>
  
    </div>

  )
}

export default DataUpload;