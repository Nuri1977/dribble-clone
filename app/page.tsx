import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories/Categories";
import LoadMore from "@/components/LoadMore/LoadMore";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
// export const revalidate = 0;

export default async function Home({
  searchParams: { category, endCursor },
}: {
  searchParams: { category?: string; endCursor?: string };
}) {
  const data = (await fetchAllProjects(category, endCursor)) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];

  const {
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor: endCursorDB,
  } = data?.projectSearch?.pageInfo || {};

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings min-h-[600px]">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }
  return (
    <main className="flex-start flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            title={node?.title}
            description={node?.description}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
            image={node?.image}
          />
        ))}
      </section>

      <LoadMore
        startCursor={startCursor}
        endCursor={endCursorDB}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
      />
    </main>
  );
}
