import { ProjectInterface } from "@/common.types";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import ProjectModal from "@/components/ProjectModal/ProjectModal";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateProject = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();

  if (!session) redirect("/");

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  return (
    <ProjectModal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" session={session} project={result?.project} />
    </ProjectModal>
  );
};

export default CreateProject;
