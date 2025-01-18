"use client";

import { useState } from "react";

export default function MovieForm() {
  const [titleSearchKey, setTitleSearchKey] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search); 
      } else {
        setMovies([]);
        setError(data.Error); 
      }
    } catch (err) {
      setError("An unexpected error occurred."); 
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="idTitleSearchKey">Título</label>
        <input
          id="idTitleSearchKey"
          name="titleSearchKey"
          value={titleSearchKey}
          onChange={(e) => setTitleSearchKey(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>

      
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {movies.length > 0 ? (
          movies.map((m) => (
            <div key={m.imdbID}>
              <p>
                {m.Title} --- {m.Year}
              </p>
              <img
                src={
                  m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"
                }
                alt={`Poster of ${m.Title}`}
                style={{ width: "150px", height: "auto" }}
              />
            </div>
          ))
        ) : (
          !error && <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}
