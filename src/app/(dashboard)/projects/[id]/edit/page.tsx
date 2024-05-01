import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: {};
};

const SingleProject = (props: Props) => {
  return <div>EditProject: {props.params.id}</div>;
};

export default SingleProject;
