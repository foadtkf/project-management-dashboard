import EditProjectForm from "@/components/ui/EditProject";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: {};
};

const SingleProject = (props: Props) => {
  return (
    <div className="p-[5%]">
      {" "}
      <EditProjectForm projectID={props.params.id} />
    </div>
  );
};

export default SingleProject;
