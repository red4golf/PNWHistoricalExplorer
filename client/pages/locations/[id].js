import Head from 'next/head';

export async function getServerSideProps({ params }) {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const locRes = await fetch(`${base}/api/locations/${params.id}`);
    const location = await locRes.json();
    const booksRes = await fetch(`${base}/api/books`);
    const allBooks = (await booksRes.json()) || [];
    const associated = (location.books || []).map((bid) => allBooks.find((b) => b.id === bid)).filter(Boolean);
    return { props: { location, books: associated } };
  } catch (err) {
    return { notFound: true };
  }
}

export default function LocationPage({ location, books }) {
  if (!location) return <div className="p-8">Location not found</div>;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const imageSrc =
    location.images?.full || location.images?.card || location.images?.thumb;
  return (
    <main className="container mx-auto px-4 py-8">
      <Head>
        <title>{location.title} | Pacific Northwest Heritage Explorer</title>
        <meta name="description" content={location.description?.slice(0, 150)} />
      </Head>
      <h1 className="text-3xl font-bold mb-4">{location.title}</h1>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${apiBase}/${imageSrc}`}
          alt={location.title}
          className="w-full max-h-[400px] object-cover rounded-2xl mb-6"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center text-gray-500">
          No image available
        </div>
      )}
      <p className="mb-6 whitespace-pre-line">{location.description}</p>
      {location.audio && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Listen</h2>
          <audio controls src={`${apiBase}/${location.audio}`} className="w-full" />
        </div>
      )}
      {books && books.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book) => (
              <a
                key={book.id}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {book.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover} alt={book.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                    No cover
                  </div>
                )}
                <div className="p-3">
                  <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
