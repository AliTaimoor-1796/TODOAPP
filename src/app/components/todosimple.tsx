"use client";
import { useState, ChangeEvent } from "react";


interface Task {
  rank: number; 
  text: string; 
}

const SimpleTodoList = () => {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newRank = tasks.length + 1;
      setTasks(tasks.concat({ rank: newRank, text: newTask }));
      setNewTask(""); 
    } else {
      alert("Task cannot be empty!"); 
    }
  };


  const updateTask = (rank: number, updatedText: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.rank === rank) {

        return { rank: task.rank, text: updatedText };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };


  const deleteTask = (rank: number) => {
    const filteredTasks = tasks.filter((task) => task.rank !== rank);
    const reRankedTasks = filteredTasks.map((task, index) => {
      return { rank: index + 1, text: task.text };
    });
    setTasks(reRankedTasks);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Todo List</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          onClick={addTask}
          style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px" }}
        >
          Add
        </button>
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {tasks.map((task) => (
          <div key={task.rank} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <span>{task.rank}. {task.text}</span>
            <div>
              <button
                onClick={() => {
                  const updatedText = prompt("Edit task:", task.text);
                  if (updatedText !== null && updatedText.trim() !== "") {
                    updateTask(task.rank, updatedText);
                  } else {
                    alert("Task cannot be empty!"); 
                  }
                }}
                style={{ color: "blue", marginLeft: "10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.rank)}
                style={{ color: "red", marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleTodoList;