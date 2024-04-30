import PHBreadcrumbs from "@/components/ui/PHBreadcrumbs";
import React from "react";

type Props = {};

const Projects = (props: Props) => {
  const items = [{ label: "Projects" }];
  return (
    <div>
      <PHBreadcrumbs items={items} />
    </div>
  );
};

export default Projects;
