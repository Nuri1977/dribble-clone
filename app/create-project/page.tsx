import ProjectForm from "@/components/ProjectForm/ProjectForm";
import ProjectModal from "@/components/ProjectModal/ProjectModal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session) redirect("/");

  return (
    <ProjectModal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" session={session} />
    </ProjectModal>
  );
};

export default CreateProject;
