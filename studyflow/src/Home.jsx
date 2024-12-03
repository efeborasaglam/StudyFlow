import React, { useEffect, useState } from "react";
import axios from "axios";
import './assets/style.css';  // CSS für das Styling

function Home({ onLogout }) {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDate, setTaskDate] = useState('');

  // Kalender und Aufgaben logik
  const [calendarDays, setCalendarDays] = useState([]);

  // Benutzerdaten abrufen
  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    axios
      .post("http://localhost:3001/user-details", { email })
      .then((response) => {
        if (response.data.name) {
          setName(response.data.name); // Benutzername setzen
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => console.error(err));

    generateCalendar();
  }, []);

  // Kalender-Generierung basierend auf dem aktuellen Monat
  const generateCalendar = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    let daysArray = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null); // Leere Zellen für Tage vor dem ersten Tag des Monats
    }
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(day);
    }
    setCalendarDays(daysArray);
  };

  // Modal anzeigen
  const showAddTaskModal = () => {
    console.log("Modal geöffnet!"); // Debugging-Ausgabe
    setShowModal(true);
  };

  // Modal schließen
  const closeAddTaskModal = () => {
    setShowModal(false);
  };

  // Aufgabe hinzufügen
  const addTask = () => {
    console.log("Aufgabe hinzufügen ausgelöst!"); // Debugging-Ausgabe
    if (taskDesc && taskDate) {
      setTasks([...tasks, { date: taskDate, description: taskDesc }]);
      setShowModal(false);
    } else {
      alert("Bitte gib eine gültige Aufgabe und ein Datum ein.");
    }
  };

  // Aufgaben für einen bestimmten Tag rendern
  const getTasksForDay = (day) => {
    return tasks.filter((task) => new Date(task.date).getDate() === day);
  };

  return (
    <div>
      <h1>Event Calendar, {name}!</h1>

      <div id="calendar" className="calendar-grid">
        {calendarDays.map((day, index) => (
          <div key={index} className="calendar-day">
            {day ? (
              <>
                <div>{day}</div>
                {getTasksForDay(day).map((task, i) => (
                  <div key={i} className="task">
                    {task.description}
                  </div>
                ))}
              </>
            ) : (
              <div className="empty"></div>
            )}
          </div>
        ))}
      </div>

      <button className="add-task-btn" onClick={showAddTaskModal}>Add Task</button>

      {/* Modal für Aufgabe hinzufügen */}
      {showModal && (
        <div id="addTaskModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddTaskModal}>&times;</span>
            <h2>Add Task</h2>
            <input 
              type="date" 
              value={taskDate} 
              onChange={(e) => setTaskDate(e.target.value)} 
            />
            <input 
              type="text" 
              value={taskDesc} 
              onChange={(e) => setTaskDesc(e.target.value)} 
              placeholder="Task Description" 
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      )}

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
