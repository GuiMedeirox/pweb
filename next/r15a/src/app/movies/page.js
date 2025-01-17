export default async function Home({ searchParams }) {
  const { titleSearchKey = "bagdad" } = await searchParams;

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=f1cbc41e&s=${titleSearchKey}`
  );

  const data = await res.json();

  return (
    <div>
      <div>
        {data.Search.map((m) => (
          <div key={m.imdbID}>
            {m.Title} --- {m.Year}
            <img 
                        src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"} 
                        alt={`Poster of ${m.Title}`} 
                        style={{ width: '150px', height: 'auto' }}
                    />
          </div>
        ))}
      </div>
    </div>
  );
}
