"use client";

import Form from "next/form";
import { searchMovies } from "../actions/movieActions";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({});

  async function handleAction(formData) {
    const res = await searchMovies(formData);

    setData(res);
  }

  return (
    <div>
      <MovieForm actionHandler={handleAction} />

      {data.Search && <MovieTable movies={data.Search} />}
    </div>
  );
}

export function MovieForm({ actionHandler }) {
  return (
    <Form action={actionHandler}>
      <label htmlFor="idTitleSearchKey">Título</label>

      <input id="idTitleSearchKey" name="titleSearchKey" />

      <button type="submit">Pesquisar</button>
    </Form>
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
                  m.Poster !== "N/A"
                    ? m.Poster
                    : "https://via.placeholder.com/150"
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
