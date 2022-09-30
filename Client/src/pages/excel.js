import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as XLSX from 'xlsx'
import axios from 'axios'
export const getJsDateFromExcel = excelDate => {
  return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
};

function Excel() {
 
  const [items, setItems] = useState([]);
 const navigate = useNavigate()

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const addDispo = (index) =>{
    const date = items[index].date
    const DietId = items[index].DietId
    const res = axios.post('http://localhost:3001/lgdiet/addExcelDispo', {
    date, DietId
   }, alert('the availability of the dietetician has been added to the database'))
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <table class="table container">
        <thead>
          <tr>
            <th scope="col">Date and DietId  and ButtonAddDispo </th>
          </tr>
        </thead>
        <tbody>
        {items.map((value, index) =>{
          return(
          <div key={items.id+'-'+index}>
            <tr>
              <td> {value.date}</td>
              <td> {value.DietId}</td>
              <td>{<button type="button" class="btnRdv" onClick={()=>addDispo(index)}>Add</button>}</td>
            </tr>
          </div>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}


export default Excel