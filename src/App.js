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

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      techs: ['Node.js', 'Javascript']
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status !== 204) return;

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    const newArray = [...repositories];
    newArray.splice(repositoryIndex, 1);

    setRepositories(newArray);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App;
