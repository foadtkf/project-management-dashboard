import { fetchProjects } from "@/actions/actions";
import PHBreadcrumbs from "@/components/ui/PHBreadcrumbs";
import ProjectList from "@/components/ui/ProjectList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {};

const Projects = async (props: Props) => {
  const items = [{ label: "Projects" }];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  return (
    <div className="p-[5%]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PHBreadcrumbs items={items} />
        <ProjectList />
      </HydrationBoundary>
    </div>
  );
};

export default Projects;

export async function generateMetadata( ): Promise<Metadata> { 
  return {
    title: `Project List`,
    description: `This page provides a list of all projects.`,
  };
}