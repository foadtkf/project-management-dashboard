import { fetchSingleProject } from "@/actions/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import PHBreadcrumbs from "@/components/ui/PHBreadcrumbs";
import { Metadata } from "next";
import ProjectDetail from "@/components/ui/ProjectDetail";

type Props = {
  params: {
    id: string;
  };
  searchParams: {};
};

const SingleProject = async (props: Props) => {
  const items = [{ label: "Projects", link: "/projects" }, { label: "Info" }];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: () => fetchSingleProject(props.params.id),
  });
  return (
    <div className="p-[5%]">
      <PHBreadcrumbs items={items} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetail projectID={props.params.id} />
      </HydrationBoundary>
    </div>
  );
};

export default SingleProject;

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const projectData = await fetchSingleProject(id);
  return {
    title: `Project: ${projectData.name}`,
    description: projectData.description,
  };
}
