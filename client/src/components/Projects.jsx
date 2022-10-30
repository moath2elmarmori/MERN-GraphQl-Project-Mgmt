import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import AddProjectModal from "./AddProjectModal";
import ProjectCard from "./ProjectCard";
import Spinner from "./Spinner";

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <div>Something Went Wrong...</div>;
  return (
    <>
      <AddProjectModal />
      <div className="row projects">
        {data.projects.length > 0 ? (
          <>
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </>
        ) : (
          <h1>There Are No Projects</h1>
        )}
      </div>
    </>
  );
}

export default Projects;
