"use client";

import { useState } from "react";

export default function Home() {
  const [resultMovies, setResultMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAction(formData) {
    setIsLoading(true);

    const titleSearchKey = formData.get("titleSearchKey");

    const httpRes = await fetch(
      `http://www.omdbapi.com/?apikey=7e0e045c&s=${titleSearchKey}`
    );
    const jsonRes = await httpRes.json();

    setResultMovies(jsonRes.Search || []);
    setSearchKey(""); // Reset input field
    setIsLoading(false);
  }

  return (
    <div className="container">
      <style>
        {`
          .container {
            font-family: Arial, sans-serif;
            margin: 20px;
            max-width: 600px;
          }

          .form-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
          }

          .input-field {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          .search-button {
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .search-button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .table-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .movie-row {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .movie-poster {
            width: 100px;
            height: auto;
            border-radius: 4px;
          }

          .movie-table {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          p {
            margin: 0;
          }
        `}
      </style>

      <MovieForm
        handleAction={handleAction}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        isLoading={isLoading}
      />

      <MovieTable movies={resultMovies} />
    </div>
  );
}

export function MovieForm({ handleAction, searchKey, setSearchKey, isLoading }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default page reload
        const formData = new FormData(e.target);
        handleAction(formData);
      }}
      className="form-container"
    >
      <label htmlFor="idTitleSearchKey">Título</label>
      <input
        id="idTitleSearchKey"
        name="titleSearchKey"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        required
        className="input-field"
      />
      <button type="submit" disabled={isLoading} className="search-button">
        {isLoading ? "Carregando..." : "Pesquisar"}
      </button>
    </form>
  );
}

export function MovieTable({ movies }) {
  return (
    <div className="table-container">
      {movies.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <div className="movie-table">
          {movies.map((m) => (
            <div key={m.imdbID} className="movie-row">
              <p>
                {m.Title} --- {m.Year}
              </p>
              <img
                src={
                  m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"
                }
                alt={`Poster of ${m.Title}`}
                className="movie-poster"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
