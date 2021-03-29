import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import Header from './components/Header';
import AddItemForm from './components/TodoList/AddItemForm';
import { Container, Grid, Paper } from '@material-ui/core';
import { changeTodolistFilterAC, removeTodolistAC, addTodolistAC, changeTodolistTitleAC, TodolistDomainType, FilterValuesType, setTodolistsAC } from './state/todolists-reducer';
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { TaskItemType, TaskStasuses, todolistsAPI } from './api/todolists-api';



// export type TodolistsType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }

export type TasksStateType = {
  [key: string]: Array<TaskItemType>
}

const AppWithRedux = () => {


  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>((state) => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

  useEffect(() => {
    todolistsAPI.getTodolists()
    .then((todolists) => {
      debugger
      dispatch(setTodolistsAC(todolists))
    })
  }, [])

  
  const removeTask = useCallback((todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(todolistID, taskID))
  }, [dispatch])
  
  const changeFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
    dispatch(changeTodolistFilterAC(filter, todolistID))
  }, [dispatch])

  const addTask = useCallback((title: string, todolistID: string) => {
    dispatch(addTaskAC(title, todolistID))
  }, [dispatch])

  const changeTaskStatus = useCallback((taskID: string, todolistID: string, status: TaskStasuses) => {
    dispatch(changeTaskStatusAC(taskID, todolistID, status))   
  }, [dispatch])                           

  const removeTodolist = useCallback((todolistID: string) => {
    dispatch(removeTodolistAC(todolistID))
  }, [dispatch])

  const addNewTodolist = useCallback((newTitle: string) => {
    dispatch(addTodolistAC(newTitle))
  }, [dispatch])

  const changeTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, title))
  }, [dispatch])
  
  const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistID, title))
  }, [dispatch])


  return (
    <div className={s.app}>
      
      <Header />

      <Container fixed>
      <Grid container style={{padding: '20px 20px 20px 0'}}>
        <AddItemForm addItem={addNewTodolist}/>
      </Grid>
      <Grid container spacing={3}>
      {todolists.map((tl) => {

        let tasksForTodolist = tasks[tl.id];

        return <Grid key={tl.id} item>
          <Paper style={{padding: '10px'}}>
            <TodoList 
              todolistID={tl.id}
              title={tl.title} 
              tasks={tasksForTodolist} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist} />
          </Paper>
        </Grid>
      })}
      </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
