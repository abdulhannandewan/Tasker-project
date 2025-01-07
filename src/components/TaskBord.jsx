import { useState } from "react";
import SearchTask from "./Tasks/SearchTask";
import TaskAction from "./Tasks/TaskAction";
import TaskList from "./Tasks/TaskList";
import AddTaskModal from "./Tasks/AddTaskModal";

const TaskBord = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "learn react",
    description:
      "I want to learn React such than i can treat it like my slave and make it do whatever I want to de.",
    tags: ["web", "React", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [isOpen, setIsOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const handleAddTask = (e, newTask, isAdd, setIsAdd) => {
    e.preventDefault();
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setTaskToUpdate(null);

    setIsOpen(false);
  };
  const handleEditTask = (EditTask) => {
    console.log(EditTask);
    setTaskToUpdate(EditTask);
    setIsOpen(true);
  };
  const handleEditButton = () => {
    setIsOpen(false);
    setTaskToUpdate(null);
  };
  const handleDeleteButton = (deleteTask) => {
    setTasks(tasks.filter((task) => deleteTask.id !== task.id));
  };
  const handleDeleteAllBtn = () => {
    setTasks([]);
  };
  const handleFavBtn = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  };
  const handleSearch = (searchText) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setTasks(filtered);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {isOpen && (
          <AddTaskModal
            setIsOpen={setIsOpen}
            onSave={handleAddTask}
            taskToUpdate={taskToUpdate}
            handleEditButton={handleEditButton}
          />
        )}
        <div className="container">
          <SearchTask onSearch={handleSearch} />

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onDeleteAll={handleDeleteAllBtn}
              setIsOpen={setIsOpen}
            />
            {tasks.length === 0 ? (
              <h1>No task found</h1>
            ) : (
              <TaskList
                onFav={handleFavBtn}
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteButton}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskBord;
