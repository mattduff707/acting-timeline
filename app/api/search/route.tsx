import { NextResponse } from 'next/server';

async function getData(query: string) {
  const res = await fetch(`https://api.themoviedb.org/3/search/person?query=${query}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query');

  const data = await getData(query!);

  return NextResponse.json(data);
}
