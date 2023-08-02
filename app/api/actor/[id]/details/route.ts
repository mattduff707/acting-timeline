import { NextRequest, NextResponse } from "next/server";

async function getData(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/287?append_to_response=movie_credits&language=en-US`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    }
  );
  console.log(res.json());
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await getData(params.id!);
  console.log(data);
  return NextResponse.json(data);
}
