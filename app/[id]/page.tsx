import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const Actor = async ({ params }: Props) => {
  const actorRes = await fetch(
    `http://localhost:3000/api/actor/${params.id}/details`,
    {
      method: "GET",
    }
  );
  const actor = await actorRes.json();

  console.log(actor);

  // const creditsRes = await fetch(
  //   `http://localhost:3000/api/actor/${params.id}/credits`
  // );

  return <section className="flex-1 bg-slate-800 py-10">page</section>;
};

export default Actor;
