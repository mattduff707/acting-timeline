import { NextRequest, NextResponse } from 'next/server';

async function getData(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/person/287?append_to_response=movie_credits`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    cache: 'no-cache',
  });
  if (!res.ok) {
    console.log('WHATTTTTTTTTTTTTTTTTTTTTTTT');
    throw new Error('Failed to fetch data');
  }

  return res;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getData(params.id!);

    return data;
  } catch (error) {
    console.log('ERRROR HANDLERRRRRRRRRRRRRRRRRRRR');
    console.log(error);
  }
}
