import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import "./Crud.css"





const Crud = () => {

  const [todo,setTodo]=useState("")
  const [edit,setedit]=useState("")

  const getData = () =>{
    let data=JSON.parse(localStorage.getItem('todo')) || []
    if(data){
      return data;
    }else{
      return []
    }
  }
  const [record,setRecord]=useState(getData())

  const hanlde = (e) =>{
    e.preventDefault()

    if(!todo){
      toast.error("Taks add first..");
      return false;
    }

    let obj={
      id:Math.floor(Math.random()*1000),
      todo,
      dep:"Learn React"
    }

    if(edit){
      let up=record.map((val)=>{
        if(val.id == edit){
          val.todo=todo;
        }
        return val;
      })
      localStorage.setItem('todo',JSON.stringify(up));
      setRecord(up);
      toast.success("Update successfully..");
    }else{
    let newrecord=[...record,obj];
    localStorage.setItem('todo',JSON.stringify(newrecord));
    setRecord(newrecord);
    toast.success("Task Add sucessfully...");
    }
    
    setTodo("");
  }
  const deletetodo = (id) =>{
    let deletee=record.filter((val)=> val.id != id);
    localStorage.setItem('todo',JSON.stringify(deletee));
    setRecord(deletee);
    toast.error("delete task successfully...");
  }
  const edittodo = (id,todo) =>{
    setTodo(todo);
    setedit(id);
  }
  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
    <div className=" container">
      <div className="row">
      <div className="card shadow mt-5 mx-auto" style={{width: '30rem',border:"5px solid 	#58d800",borderRadius:"15px"}}>
    <div className="card-body">

        <h2 style={{marginBottom:"50px"}}><i>Todo App</i></h2>
        <form onSubmit={hanlde}>
            <input type="text" className='form-control position-relative' style={{backgroundColor:"rgb(171 206 161)",}} placeholder='Add New Task' onChange={(e) => setTodo(e.target.value)} value={todo} />
            <input type="submit"  value="+" className=' position-absolute border'  style={{width:"35px",height:"36px",textAlign:"center",backgroundColor:"green",color:"white",top:"105px",right:"20px",fontSize:"20px",lineHeight:"30px",borderRadius:"5px"}} />
        </form>
    </div>

      <div className="row">
        {
          record.map((val)=>{
            return(
        <div className="col-lg-12 mt-4 mb-3">

              <div key={val.id} className="card mt-4 shadow mx-auto" style={{width: '18rem'}}>
  <div className="card-2 p-3">
    <h3 className="card-title"><i>{val.todo}</i></h3>
    <p className="card-text">{val.dep}</p>
    <div className="d-flex">
    <button className='btn' onClick={() => deletetodo(val.id)} ><RiDeleteBin5Line  style={{fontSize:"25px",color:"black",display:"inline-block",marginLeft:"60px"}}/>
    
    </button>
    <button className='btn' onClick={() => edittodo(val.id,val.todo)} ><FaRegEdit 
  style={{fontSize:"25px",color:"black",display:"inline-block"}}/>
    
    </button>
    </div>
    
  </div>
</div>
</div>


            )
          })
        }
      </div>
      </div>
    </div>
</div>
</div>


  )
}

export default Crud
