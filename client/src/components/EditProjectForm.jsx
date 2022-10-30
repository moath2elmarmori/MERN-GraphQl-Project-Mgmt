import { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "./Spinner";

function EditProjectForm({ project }) {
  const projectStatusOptions = {
    "Not Started": "new",
    "In Progress": "progress",
    Completed: "complete",
  };
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(projectStatusOptions[project.status]);

  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  if (loading) {
    return <Spinner />;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      toast.error("Please Add All Fields");
    } else {
      updateProject(project.id, name, description, status);
    }
  };
  return (
    <>
      <div>
        <a
          className="btn btn-secondary"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Edit Project
        </a>
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body my-5">
          <form onSubmit={formSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Project Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <hr />
            <div className="mb-3">
              <label className="form-label">Project Status</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="complete">Completed</option>
              </select>
            </div>
            <hr />
            <button className="btn btn-primary" type="submit">
              Submit Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProjectForm;
