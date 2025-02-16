import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion"; // ✅ Added for animations
import { Button, TextField, List, ListItem, ListItemText, IconButton, Container, Paper, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import styles from "./Todo.module.css"; // ✅ Imported CSS

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (input.trim() === "") return;
    await addDoc(collection(db, "todos"), { text: input });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const deleteAll = async () => {
    todos.forEach(async (todo) => await deleteDoc(doc(db, "todos", todo.id)));
  };

  const editTodo = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const updateTodo = async () => {
    if (editText.trim() === "") return;
    await updateDoc(doc(db, "todos", editId), { text: editText });
    setEditId(null);
    setEditText("");
  };

  return (
    <>
    <div className={styles["todo-container"]}>
      <motion.div 
        className={styles["todo-card"]}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
         <Typography variant="h4" className={styles["app-title"]} style={{ marginBottom: "30px" }}>
            TaskFlow
          </Typography>
        <TextField
          className={styles["todo-input"]}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          fullWidth
        />
        <div style={{ marginTop: "15px" }}>
          <Button className={styles["todo-button"]} onClick={addTodo}>
            Add
          </Button>
          <Button className={`${styles["todo-button"]} ${styles["delete-button"]}`} onClick={deleteAll}>
            Delete All
          </Button>
        </div>

        <List className={styles["todo-list"]}>
          {todos.map((todo) => (
            <motion.div 
              key={todo.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem className={styles["todo-item"]}>
                {editId === todo.id ? (
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    fullWidth
                  />
                ) : (
                  <ListItemText primary={todo.text} />
                )}

                {editId === todo.id ? (
                  <Button className={styles["todo-button"]} onClick={updateTodo}>
                    Save
                  </Button>
                ) : (
                  <>
                    <IconButton onClick={() => editTodo(todo)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => deleteTodo(todo.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </>
                )}
              </ListItem>
            </motion.div>
          ))}
        </List>
      </motion.div>
    </div>
    </>
  );
};

export default TodoApp;
