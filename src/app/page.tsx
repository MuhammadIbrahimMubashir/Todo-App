"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask("");
    }
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #ffeb3b, #4caf50, #2196f3)",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          maxWidth: "600px", // Ensure the card is not too wide
          width: "100%",
          boxSizing: "border-box", // Make sure padding doesn't affect width
        }}
      >
        <title>Todo App</title>
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
            fontSize: "24px",
            margin: "0",
          }}
        >
          Todo App
        </h1>
        <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
            style={{
              flex: "1",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              color: "#000",
            }}
          />
          <button
            onClick={addTask}
            style={{
              background: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span style={{ fontSize: "16px", color: "#000" }}>{task}</span>
              <div>
                <button
                  onClick={() => editTask(index)}
                  style={{
                    background: "#ffc107",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  style={{
                    background: "#ff6f61",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
