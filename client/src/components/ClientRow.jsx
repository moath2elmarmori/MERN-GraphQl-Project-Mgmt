import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { GET_PROJECTS } from "../queries/projectQueries";

function ClientRow({ client }) {
  const [deleteClient, { loading }] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    onCompleted: () =>
      toast.success("Client And Related Projects Deleted Successfully"),
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });
  if (loading) {
    return (
      <tr>
        <td colSpan="4">
          <Spinner />
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td className="delete-user-cell">
        <button className="delete-user-button" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;
