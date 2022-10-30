import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { toast } from "react-toastify";

function DeleteProjectButton({ projectId }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate("/");
      toast.success("Project Deleted Successfully");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  const navigate = useNavigate();
  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        className="btn btn-danger m-2 d-flex align-items-center"
        onClick={deleteProject}
      >
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}

export default DeleteProjectButton;
