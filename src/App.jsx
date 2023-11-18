import { useState } from "react";
import "./App.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { uid } from "uid";

function App() {
  const [taskArray, setTaskArray] = useState([]);
  const [newTask, setNewTask] = useState();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateText, setUpdateText] = useState("");

  const addToArray = () => {
    // добавить проверку на пустоту  input
    // добавить вызов это события на enter https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
    let item = {
      id: uid(),
      task: newTask,
    }; // почему это let a не cons
    setTaskArray([...taskArray, item]);
    setNewTask("");
  };

  const crossTask = (e) => {
    const done = e.target;
    done.classList.toggle("crossed");
  };

  const deleteTask = (item) => {
    let newList = taskArray.filter((element) => element.id !== item.id);
    setTaskArray(newList);
  };

  const updateTask = (e, item) => {
    // в input на редактирование нет старого значения
    // и я его хочу видеть в той же строке
    // как на примере https://codesandbox.io/s/react-todo-list-p912n?file=/src/TodoList.js
    e.preventDefault();
    let updateList = taskArray.map((element) => {
      if (element.id === item.id) {
        return { ...taskArray, task: updateText };
      }
      return taskArray;
    });
    setTaskArray(updateList);
    setUpdateStatus(!updateStatus);
  };

  return (
    <div className="cont">
      <h1 className="header">Easy To Do List</h1>

      <hr style={{ width: "80%", height: "1px" }} />

      <ul>
        {taskArray.map((item, index) => (
          <div key={index} className="inlineItem">
            <div className="box" onClick={crossTask}>
              <li>{item.task}</li>
              {/* почему это li  если ul нет */}
              <div>
                <ClearIcon
                  style={{ marginRight: "7px" }}
                  onClick={() => deleteTask(item)}
                />
                <EditIcon
                  style={{ background: "transparent" }}
                  onClick={() => setUpdateStatus(!updateStatus)}
                />
              </div>
            </div>

            <div className={updateStatus ? "updateFormVisible" : "updateForm"}>
              <input
                type="text"
                placeholder="change a task..."
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
              />
              <button onClick={(e) => updateTask(e, item)}>Change</button>
            </div>
          </div>
        ))}
      </ul>

      <div className="addBox">
        <span>Add new task</span>
        <div className="inputBox">
          {/*  это подвинуть наверх перед списком */}
          <input
            type="text"
            placeholder="add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <AddIcon onClick={() => addToArray()} />
        </div>
      </div>
    </div>
  );
}

export default App;
