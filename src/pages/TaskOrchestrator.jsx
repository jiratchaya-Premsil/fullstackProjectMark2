import { useState } from "react";
import TaskItem from "../components/TastIetm";

const MAX_CONCURRENT = 2;

const createTasks = () =>
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    progress: 0,
    status: "waiting", // waiting | running | completed
  }));

export default function TaskOrchestrator() {
  const [tasks, setTasks] = useState(createTasks);

  const startProcessing = () => {
    runNextTasks();
    runNextTasks(); // start 2 immediately
  };

  const runNextTasks = () => {
    setTasks((prev) => {
      const runningCount = prev.filter((t) => t.status === "running").length;
      if (runningCount >= MAX_CONCURRENT) return prev;

      const nextIndex = prev.findIndex((t) => t.status === "waiting");
      if (nextIndex === -1) return prev;

      const updated = [...prev];
      updated[nextIndex] = {
        ...updated[nextIndex],
        status: "running",
      };

      processTask(updated[nextIndex].id);

      return updated;
    });
  };

  const processTask = (taskId) => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId && task.status === "running") {
            const newProgress = task.progress + Math.random() * 15;

            if (newProgress >= 100) {
              clearInterval(interval);

              setTimeout(() => {
                runNextTasks(); // hand-off
              }, 0);

              return {
                ...task,
                progress: 100,
                status: "completed",
              };
            }

            return { ...task, progress: newProgress };
          }

          return task;
        })
      );
    }, 400);
  };

  return (
    <div className = "flex flex-col md:items-center gap-2">
      many Task processing
      <button
        onClick={startProcessing}
        className="md:w-1/2 mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start Processing
      </button>
    <div className = "md:items-center w-full flex flex-col">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>

    </div>
  );
}