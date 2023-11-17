import { useRef, useState } from 'react';
import './App.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { uid } from 'uid';

function App() {

  const [taskArray,setTaskArray] = useState([])
  const [newTask, setNewTask] = useState();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateText, setUpdateText] = useState("");


  const addToArray = () => {
    let item = {
      id:uid(), 
      task: newTask
    }
    setTaskArray([...taskArray,item]);
    setNewTask('')
  };

  const crossTask = (e) => {
    const done = e.target;
    done.classList.toggle('crossed')
  };
 
  const deleteTask = (item) => {
    let newList = taskArray.filter((element) => element.id!==item.id);
    setTaskArray(newList)
  };


  const updateTask = (e,item) => {
    e.preventDefault();
    let updateList = taskArray.map(element => {
      if(element.id===item.id) {
        return { ...taskArray, task: updateText };
      }
      return taskArray;
    });
    setTaskArray(updateList);
    setUpdateStatus(!updateStatus);
  };


  return (
    <div className='cont'>
      <h1 className='header'>Easy To Do List</h1>

      <hr
      style={{width:"80%", height:"1px"}}
      />

      <ul>
      {taskArray.map((item, index) => (
                        <div key={index} className="inlineItem" >
                            <div className='box' onClick={crossTask}>

                              <li>{item.task}</li>

                              <div>
                                <ClearIcon 
                                style={{marginRight: "7px"}}
                                onClick={()=>deleteTask(item)}
                                />
                                <EditIcon
                                style={{background:"transparent"}}
                                onClick={() => setUpdateStatus(!updateStatus)}
                                />
                              </div>

                            </div>

                            <div className={updateStatus ? 'updateFormVisible' : 'updateForm'}>
                              <input
                              type='text'
                              placeholder='change a task...'
                              value={updateText}
                              onChange={(e)=>setUpdateText(e.target.value)}
                              />
                              <button onClick={(e)=>updateTask(e,item)}>Change</button>
                            </div>
                        </div>
                    ))}
      </ul>

      <div className='addBox'>
        <span>Add new task</span>
        <div className='inputBox'>
           <input
           type='text'
           placeholder='add a task...'
           value={newTask}
           onChange={(e) => setNewTask(e.target.value)}
           />
           <AddIcon onClick={() => addToArray()}/>
        </div>
       


      </div>
    </div>
  )
}

export default App;
