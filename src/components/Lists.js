import React, { useState } from 'react'

const Lists = React.memo(({
  //key는 컴포넌트로 전달되는 것이 아니라 React가 자체적으로 사용하기 때문에 props로 전달할 필요가 없다
  id, title,  todoData, setTodoData,  
  snapshot,handleClick, completed, provided
}) => {
  //console.log("Lists.js is rendering")

  const [isEditing,setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map(data=>{
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    })

    
    setTodoData(newTodoData)
    localStorage.setItem('todoData',JSON.stringify(newTodoData))
  }

  const handleEditChange = (event) => {
    setEditedTitle(event.target.value);

  }

  const handleSubmit =(event) => {
    event.preventDefault();

    let newTodoData = todoData.map((data)=>{
      if(data.id === id){
        data.title = editedTitle
      }
      return data;
    })
    setTodoData(newTodoData);
    localStorage.setItem('todoData',JSON.stringify(newTodoData))
    setIsEditing(false);

  }

  if (isEditing) {
    return (
        <div className="flex items-center justify-between w-full px-4 py-1 my-1 text-gray-600 bg-gray-100 border rounded row">
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full px-3 py-2 mr-4 text-gray-500 appearance-none"
                    value={editedTitle}
                    onChange={handleEditChange}
                    autoFocus
                />
            </form>
            <div className="items-center">
                <button
                    class="px-4 py-2 float-right"
                    onClick={() => setIsEditing(false)}
                    type="button"
                >
                    x
                </button>
                <button onClick={handleSubmit} class="px-4 py-2 float-right"  type="submit">
                    save
                </button>
            </div>
        </div>
    )
} else {
    return (
        <div
            key={id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
            <div className="items-center">
                <input
                    type="checkbox"
                    onChange={() => handleCompleteChange(id)}
                    defaultChecked={completed}
                />{" "}
                <span className={completed ? "line-through" : undefined}>{title}</span>
            </div>
            <div className="items-center">
                <button className="float-right px-4 py-2" onClick={() => handleClick(id)}>
                    x
                </button>
                <button className="float-right px-4 py-2" onClick={() => setIsEditing(true)}>
                    edit
                </button>
            </div>
        </div>
    )
}})

export default Lists