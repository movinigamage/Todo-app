"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tasksCollection = collection(db, 'tasks');
    const q = query(tasksCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      await addDoc(collection(db, 'tasks'), { task });
      setTask('');
    }
  };

  const removeTask = async (id) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  };

  const startEditing = (index, task) => {
    setEditingTaskIndex(index);
    setEditingTask(task);
  };

  const saveTask = async (id) => {
    const taskDoc = doc(db, 'tasks', id);
    await updateDoc(taskDoc, { task: editingTask });
    setEditingTaskIndex(null);
    setEditingTask('');
  };

  const filteredTasks = tasks.filter((taskObj) =>
    taskObj.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Todo Task App</h1>
        <div className="input-group input-group-lg mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="input-group input-group-lg mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTask}>Add</button>
        </div>
        <ul className="list-group">
          {filteredTasks.map((taskObj, index) => (
            <li key={taskObj.id} className="list-group-item d-flex justify-content-between align-items-center">
              {editingTaskIndex === index ? (
                <>
                  <input
                    type="text"
                    className="form-control"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm" onClick={() => saveTask(taskObj.id)}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingTaskIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {taskObj.task}
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(index, taskObj.task)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeTask(taskObj.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;