import React from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import Lists from "./Lists";



export const List = React.memo(({todoData,setTodoData,handleClick}) => {
  console.log("List.js is rendering")
  const handleEnd = (result) => {
    console.log('result',result)
    //목적지가 없으면 이 함수를 종료한다
    if (!result.destination){
      return;
    }
    //리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];
    
    //1. 변경시키는 아이템을 배열에서 지워준다.
    //2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 해준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData',JSON.stringify(newTodoData))
  }

  return (
    <div>
    <DragDropContext onDragEnd={handleEnd}>
    <Droppable droppableId="todo">
    {(provided)=>(
    <div {...provided.droppableProps} ref={provided.innerRef}>
    {todoData.map((data,index)=>(
      <Draggable 
      key={data.id} 
      draggableId={data.id.toString()}
      index={index} >
      {(provided,snapshot)=>(


      <Lists
          key={data.id}
          id={data.id}
          title={data.title}
          completed={data.completed}
          todoData={todoData}
          setTodoData={setTodoData} 
          provided={provided}
          snapshot={snapshot}
          handleClick={handleClick}
        />


    
    )}
    </Draggable>
    ))}
    {provided.placeholder}
    </div>
    )}
    </Droppable>
    </DragDropContext>
    </div>
  )
})

export default List

