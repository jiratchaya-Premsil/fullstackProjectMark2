export default function TaskItem({ task }) {
  return (
    <div className="w-full md:w-1/2 mb-4 p-4 bg-white rounded shadow">
      <div className="flex justify-between">
        <span className="font-semibold">Task {task.id}</span>
        <span
          className={`capitalize ${
            task.status === "completed"
              ? "text-green-600"
              : task.status === "running"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className=" bg-gray-300 h-2 rounded">
        <div
          className={`h-2 rounded transition-all duration-200 ${
            task.status === "completed"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${task.progress}%` }}
        />
      </div>
    </div>
  );
}