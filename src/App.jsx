import React,{useState, useEffect} from 'react';
import './App.css';
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField";
import db from "./firebase.js"
import firebase from "../node_modules/firebase/compat";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton"
import Modal from "@mui/material/Modal"
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [todos, setTodos] = useState([
    
  ])
  const [input, setInput] = useState("");
  console.log(input);

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  padding: 20,
};
  
  useEffect(() => {    db.collection("todos").orderBy("timestamp","desc").onSnapshot((snapshot) => {  console.log(snapshot.docs.map((doc) => doc.data().todo));
setTodos(
  snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo}))
)
  })
  },[])
  const addTodo = () => {
    event.preventDefault();//will stop refresh the page
    //add todo to database
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("")
  }
  const [open, setOpen] = useState()
  const [editInput, setEditInput] = useState()

    
  return (
    <div className="App">
      <h1 style={{fontSize: '40px'}}>Todo List</h1>
    <div className="input-section"> 
      <form>
      <TextField  value= 
      {input} onChange={(event) =>             setInput(event.target.value)}            required
          id="standard-required"
          label="✅ Add Todo"
          defaultValue="Hello World"
          variant="standard"    />
      <Button onClick={addTodo} variant="contained">Hello        World</Button>
      </form>
      </div>
      <div className="todo-section" style={{width: '500px'}}>
      <ul>
      {todos.map(todo => (
        <li style={{listStyle: 'none',fontFamily: 'sans-serif'}}>
          <Modal open={open} onClose=  
          {e => setOpen(false)}>
          <div  style={style}>
            <h1>Update Todo</h1>
            <TextField id="filled-basic" label="Update Todo" variant="filled" value={editInput} onChange={event => setEditInput(event.target.value)}/>
          <Button style={{margin: '10px'}} variant="contained" onClick={() => {db.collection('todos').doc(todo.id).set({
          todo: editInput,
          },{merge : true})
             setOpen(false)                                        }}>Save</Button>
          </div>
          </Modal>
          <List>
          <ListItem>
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={todo.todo}
                    secondary={"dummy deadline ⏰"}
                  />
            <IconButton aria-label="edit" onClick={e => setOpen(true)}><EditIcon /></IconButton>
                  <IconButton aria-label="delete" onClick={(event) => db.collection("todos").doc(todo.id).delete()}><DeleteIcon /></IconButton>
                </ListItem>
            </List>
        </li>
      ))}
      </ul>
      </div>
      </div>
  );
}

export default App;