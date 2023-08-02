import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const Actor = ({ params }: { params: Props }) => {
  console.log(params);
  return <div>page</div>;
};

export default Actor;
