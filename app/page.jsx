"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
    setKids((prevKids) => prevKids.map((kid) =>
      kid.id === kidId
        ? {
            ...kid,
            points: kid.points + task.points,
            achievements: [...kid.achievements, task.title],
          }
        : kid
    ));
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="kids">
        <TabsList>
          <TabsTrigger value="kids">Kids</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="assign">Assign Tasks</TabsTrigger>
          <TabsTrigger value="report">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="kids">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input placeholder="Child name" value={newKidName} onChange={(e) => setNewKidName(e.target.value)} />
                <select className="border p-1 rounded" value={newKidGender} onChange={(e) => setNewKidGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <Button onClick={addKid}>Add Child</Button>
              </div>
              {kids.map((kid) => (
                <div key={kid.id} className="border p-2 rounded">
                  <div className="flex justify-between items-center">
                    <strong>{kid.name}</strong>
                    <Button variant="destructive" onClick={() => deleteKid(kid.id)}>Delete</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Gender: {kid.gender} - Points: {kid.points}</div>
                  <div className="text-xs mt-1">Achievements: {kid.achievements.length > 0 ? kid.achievements.join(", ") : "None"}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="space-y-4">
              <Input placeholder="Task title" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
              <div className="flex space-x-2">
                <Button variant={type === "positive" ? "default" : "outline"} onClick={() => setType("positive")}>Positive</Button>
                <Button variant={type === "negative" ? "default" : "outline"} onClick={() => setType("negative")}>Negative</Button>
                <Button variant={recurrent ? "default" : "outline"} onClick={() => setRecurrent((prev) => !prev)}>
                  {recurrent ? "Recurrent" : "One-time"}
                </Button>
              </div>
              <Button onClick={addTask}>Add Task</Button>
              <div className="pt-4 space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="border p-2 rounded">
                    <strong>{task.title}</strong> — {task.type} — {task.recurrent ? "Recurrent" : "One-time"} — {task.points} pts
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assign">
          <Card>
            <CardContent className="space-y-4">
              {kids.length === 0 || tasks.length === 0 ? (
                <div className="text-muted-foreground">Please add kids and tasks first.</div>
              ) : (
                kids.map((kid) => (
                  <div key={kid.id} className="border p-2 rounded">
                    <div className="font-bold mb-1">{kid.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {tasks.map((task) => (
                        <Button key={task.id} variant="outline" onClick={() => assignTaskToKid(kid.id, task.id)}>
                          {task.title} ({task.points} pts)
                        </Button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          <Card>
            <CardContent className="space-y-4">
              {kids.length === 0 ? (
                <div className="text-muted-foreground">No kids to report.</div>
              ) : (
                kids.map((kid) => (
                  <div key={kid.id} className="border p-2 rounded">
                    <div className="font-bold">{kid.name}</div>
                    <div className="text-sm">Points: {kid.points}</div>
                    <div className="text-xs">Tasks completed: {kid.achievements.length}</div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                      {kid.achievements.map((title, index) => (
                        <li key={index}>{title}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
