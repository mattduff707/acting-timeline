import Image from 'next/image';
async function getData() {
  const res = await fetch('https://api.themoviedb.org/3/search/person?query=brad', {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export default async function Home() {
  const data = await getData();

  console.log(data);
  return <main className="flex flex-col h-full"></main>;
}
