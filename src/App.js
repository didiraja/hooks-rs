import React, { useState, useEffect } from 'react';

export default function App() {

  const [repos, setRepos] = useState([])
 
  // WillMount
  useEffect(() => {

    async function getRepos() {
      const response = await fetch('https://api.github.com/users/didiraja/repos');
  
      const data = await response.json();
      
      setRepos(await data)
    }

    getRepos();

  }, [])

  // DidUpdate
  useEffect(() => {
    const filtered = repos.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos!`
  }, [repos])

  function handleFavorite(id) {
    const newRepos = repos.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepos(newRepos)
  }

  return (
    <>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span> (Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  )
}
