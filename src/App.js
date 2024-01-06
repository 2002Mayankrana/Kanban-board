import "./App.css";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { fetchData } from "./actions/action";

const App = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.dataSlice);
  const [kanbanData, setKanbanData] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
    async function fetchKanbanData() {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setKanbanData(data);
      } catch (error) {
        console.error('Error fetching Kanban data:', error);
        setKanbanData([]);
      }
    }
    fetchKanbanData();
  }, [dispatch]);

  function dragStart(event, id) {
    event.dataTransfer.setData('id', id);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function drop(event, column) {
    const id = event.dataTransfer.getData('id');

    const updatedData = kanbanData.map(item => {
      if (item.id === id) {
        return { ...item, column };
      }
      return item;
    });

    setKanbanData(updatedData);
  }

  return tickets ? (
    <div>
      <Navbar />
      <div className="kanban-container">
        <div
          className="kanban-column"
          onDragOver={e => dragOver(e)}
          onDrop={e => drop(e, 'Todo')}
        >
          <h3>Todo</h3>
          {kanbanData
            .filter(item => item.column === 'Todo')
            .map(item => (
              <div
                key={item.id}
                className="kanban-item"
                draggable
                onDragStart={e => dragStart(e, item.id)}
              >
                {item.title}
              </div>
            ))}
        </div>
        <div
          className="kanban-column"
          onDragOver={e => dragOver(e)}
          onDrop={e => drop(e, 'In Progress')}
        >
          <h3>In Progress</h3>
          {kanbanData
            .filter(item => item.column === 'In Progress')
            .map(item => (
              <div
                key={item.id}
                className="kanban-item"
                draggable
                onDragStart={e => dragStart(e, item.id)}
              >
                {item.title}
              </div>
            ))}
        </div>
        <div
          className="kanban-column"
          onDragOver={e => dragOver(e)}
          onDrop={e => drop(e, 'Done')}
        >
          <h3>Done</h3>
          {kanbanData
            .filter(item => item.column === 'Done')
            .map(item => (
              <div
                key={item.id}
                className="kanban-item"
                draggable
                onDragStart={e => dragStart(e, item.id)}
              >
                {item.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;

