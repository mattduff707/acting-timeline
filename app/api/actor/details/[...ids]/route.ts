import { NextRequest, NextResponse } from "next/server";

async function getData(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
      // cache: 'no-cache',
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function GET(
  req: Request,
  { params }: { params: { ids: string[] } },
) {
  try {
    const data = await Promise.all(params.ids.map(getData));

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
