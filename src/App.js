import React,{useState, useCallback} from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];
export default function App() {
  console.log("App.js is rendering")


  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id : Date.now(),
      title: value,
      completed: false,
    };

    //this.setState({ todoData : [...todoData, newTodo], value:""})
    setTodoData(prev => [...prev, newTodo])
    localStorage.setItem('todoData',JSON.stringify([...todoData, newTodo]))
    setValue("")
    //Setter에서 이전 State를 가지고 오기 위해서는 함수 이용
  }

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data=>data.id !== id)
    console.log('newTodoData',newTodoData)
    setTodoData(newTodoData)
    localStorage.setItem('todoData',JSON.stringify(newTodoData))

  },[todoData]);

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData',JSON.stringify([]))
  }
  
    return(

      <div className="flex items-center justify-center w-screen h-screen bg-blue-100" > 
      {/* JSX에서는 className  */}
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3">
            <h1>할 일 목록</h1>
            <button onClick={handleRemoveClick}>Delete All</button>
          </div>
          

          <List todoData = {todoData} setTodoData = {setTodoData} handleClick={handleClick}/>

          <Form value = {value} setValue = {setValue} handleSubmit = {handleSubmit}/>


        </div>
        
      </div>
    )
  }
