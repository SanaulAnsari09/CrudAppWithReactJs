import React from 'react';
import './App.css';
import { useState } from 'react';

function App(){

  const [inputs, setInputs] = useState({
    name:'',
    email:''
  });

  const [tableData, setTableData] = useState([]);
  const [edtClick, setEdtClick] = useState(false);
  const [editIndex, setEditIndex] = useState('');


  function handleChange(e){

    setInputs({...inputs, [e.target.name]:e.target.value});
 
  }

  function handleSubmit(e){
    e.preventDefault();

    if(edtClick){
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEdtClick(false);
      setInputs({
        name:'',
        email:''
      })
      
    }else{

      setTableData([...tableData, inputs]);
      setInputs({
        name:'',
        email:''
      });
    }

  }




  function handleDelete(i){
      const filterData = tableData.filter((value, ind)=> i!==ind);
      setTableData(filterData);
  }

  function handleEdit(ind){
    const tempData = tableData[ind];
    setInputs({
      name:tempData.name,
      email:tempData.email
    });
    setEdtClick(true);
    setEditIndex(ind);
  }

  return(
    <>
     <div className="container">
          <div className="formArea">
              <form onSubmit={handleSubmit}>
                <h1>Enter Your Details</h1>
                  <input type="text" 
                  placeholder='Enter Your Name'
                  name='name'
                  value={inputs.name}
                  onChange={handleChange}
                  />
                  <br />
                  <input type="text"
                  placeholder='Enter Your Email'
                  name='email'
                  value={inputs.email}
                  onChange={handleChange}
                  />
                  <br />
                  <button type='submit'>{edtClick ? 'Update' :'Submit'}</button>
              </form>
          </div>

          <div className="tableArea">
          <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
          tableData.map((item,index)=>{
            return(
              <>
                <tr>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                  <button className='edtbtn' onClick={()=> handleEdit(index)}> EDIT</button>
                  <button className='dltbtn' onClick={()=> handleDelete(index)}> DELETE</button>
                </td>
                </tr>
              </>
            )
          })
        }
    </tbody>
  </table>

          </div>
        </div>
    </>
  )
};

export default App;