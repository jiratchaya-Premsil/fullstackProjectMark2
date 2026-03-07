import { useSearchParams} from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import {useState} from 'react';
import { projects } from '../data/projects';
const Dashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("status") || "all";
    const [projectList, setProjectList] = useState(projects);

    const filteredProjects =
  currentFilter === "all"
    ? projectList
    : projectList.filter((project) => project.status === currentFilter);

    const {user} = useAuthStore();
    const handleFIlterChange = (status) => {
        setSearchParams({status});

    };
      const handleDelete = (id) => {
    setProjectList((prev) =>
      prev.filter((project) => project.id !== id)
    );
  };
    return <div className ="p-6">
        <h1 className = "text-2xl font-bold mb-4">Project Dashboard</h1>

        <div className = " flex gap-2 mb-6">
            {["all", "todo", "done"].map((s) => (
                <button
                key={s}
                onClick={() => handleFIlterChange(s)}
                className = {`px-4 py-2 rounded ${currentFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >

                    {s.toUpperCase()}
                </button>
            ))}
        </div>
        <div className = "bg-white border rounded shadow p-4">
            {filteredProjects.map((project) => {

                if (user.role !== 'admin'){
                    return <div className ="w-full p-4 flex flex-row justify-first" key={project.id}>
                        <div className='flex flex-col gap-4'>
                            <div >{project.title}</div>
                    <div> status:  {project.status}</div>
                    <div className = "text-gray-600">{project.desc}</div>
                        </div>

                    </div>;
                }

                return <div className ="w-full p-4 flex flex-row justify-between" key={project.id}>
                    <div className='flex flex-col gap-4'>
                        <div >{project.title}</div>
                        <div>status:  {project.status}</div>
                        <div className = "text-gray-600">{project.desc}</div>
                    </div>

                    <button onClick={() => handleDelete(project.id)}
                    className ="rounded-lg bg-red-500 text-white p-2 h-12">Delete</button>
                    </div>;
            })}
            <strong> {currentFilter}</strong>

        </div>
    </div>
 }
 export default Dashboard;