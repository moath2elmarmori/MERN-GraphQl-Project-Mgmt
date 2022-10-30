import { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";

function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");
  const formRef = useRef();

  const { loading: getClientsLoading, error, data } = useQuery(GET_CLIENTS);

  const [addProject, { loading: addingProjectLoading }] = useMutation(
    ADD_PROJECT,
    {
      variables: { name, description, status, clientId },
      refetchQueries: [{ query: GET_PROJECTS }],
    }
  );

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "" || clientId === "") {
      toast.error("Please Add All Fields");
    } else {
      console.log(status);
      addProject(name, description, status, clientId);
      setName("");
      setDescription("");
      setStatus("new");
      setClientId("");
      formRef.current.reset();
    }
  };

  if (addingProjectLoading) return <Spinner />;
  if (getClientsLoading) return null;
  if (error) return <div>Something Went Wrong...</div>;
  return (
    <>
      {!getClientsLoading && !error && (
        <div className="add-project-modal-div my-3">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#AddProjectModal"
          >
            <div className="d-flex justify-content-center align-items-center">
              <FaList />
              <p className="add-project-text">Add Project</p>
            </div>
          </button>

          <div
            className="modal fade"
            id="AddProjectModal"
            tabIndex="-1"
            aria-labelledby="AddProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="AddProjectModalLabel">
                    New Client Data
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={formSubmitHandler} ref={formRef}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Project Name"
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
                    <div className="mb-3">
                      <label className="form-label">Project Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">--Select Client--</option>
                        {data.clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <hr />
                    <button
                      className="btn btn-success"
                      data-bs-dismiss={"modal"}
                    >
                      Add Project
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProjectModal;
