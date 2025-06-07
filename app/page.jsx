
"use client";
import { useState } from "react";

export default function TaskManager() {
  const [kids, setKids] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newKidName, setNewKidName] = useState("");
  const [newKidGender, setNewKidGender] = useState("male");
  const [taskInput, setTaskInput] = useState("");
  const [type, setType] = useState("positive");
  const [recurrent, setRecurrent] = useState(false);

  const addKid = () => {
    if (newKidName.trim() !== "") {
      setKids([...kids, {
        id: Date.now(),
        name: newKidName,
        gender: newKidGender,
        points: 0,
        achievements: [],
      }]);
      setNewKidName("");
    }
  };

  const deleteKid = (id) => {
    setKids(kids.filter((kid) => kid.id !== id));
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, {
        id: Date.now(),
        title: taskInput,
        type,
        recurrent,
        points: type === "positive" ? 10 : -10,
      }]);
      setTaskInput("");
    }
  };

  const assignTaskToKid = (kidId, taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setKids((prevKids) =>
      prevKids.map((kid) =>
        kid.id === kidId
          ? {
              ...kid,
              points: kid.points + task.points,
              achievements: [...kid.achievements, task.title],
            }
          : kid
      )
    );
  };

  return (
    <main className="p-4 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Kids Task Tracker</h1>

      {/* Add Kid */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Add Child</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Child name"
            value={newKidName}
            onChange={(e) => setNewKidName(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={newKidGender}
            onChange={(e) => setNewKidGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addKid}>Add</button>
        </div>
        <div className="grid gap-2">
          {kids.map((kid) => (
            <div key={kid.id} className="border p-2 rounded bg-white shadow">
              <div className="flex justify-between items-center">
                <strong>{kid.name}</strong>
                <button className="text-red-600" onClick={() => deleteKid(kid.id)}>Delete</button>
              </div>
              <p className="text-sm text-gray-600">
                Gender: {kid.gender} | Points: {kid.points}
              </p>
              <div className="text-xs text-gray-500">Achievements: {kid.achievements.join(", ")}</div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    className="border rounded px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => assignTaskToKid(kid.id, task.id)}
                  >
                    {task.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Task */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Add Task</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Task title"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addTask}>Add</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setType("positive")} className={`px-3 py-1 rounded ${type === "positive" ? "bg-blue-500 text-white" : "border"}`}>Positive</button>
          <button onClick={() => setType("negative")} className={`px-3 py-1 rounded ${type === "negative" ? "bg-red-500 text-white" : "border"}`}>Negative</button>
          <button onClick={() => setRecurrent(!recurrent)} className={`px-3 py-1 rounded ${recurrent ? "bg-purple-500 text-white" : "border"}`}>{recurrent ? "Recurrent" : "One-time"}</button>
        </div>
        <div className="grid gap-2">
          {tasks.map((task) => (
            <div key={task.id} className="text-sm text-gray-700">
              {task.title} — {task.type} — {task.points} pts — {task.recurrent ? "Recurrent" : "One-time"}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
