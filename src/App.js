import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository(event) {

    event.preventDefault();

    const data = {
      title: `Novo repositorio ${Date.now()}`,
      url: "https://github.com/endersonra/go-stack-challenge-02-node-js-concepts",
      techs: ["Node.js",
        "React.js",
        "React Native"
      ]
    };

    const response = await api.post('repositories', data);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repositorie => repositorie.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            <p>{repositorie.title}</p>

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
