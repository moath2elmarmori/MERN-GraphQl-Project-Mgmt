import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries/clientQueries";
import AddClientModal from "./AddClientModal";

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
    return <div>Something went wrong</div>;
  }

  if (!loading && !error && data.clients.length === 0) {
    return (
      <>
        <AddClientModal />
        <h1>Therer Are No Clients</h1>
      </>
    );
  }
  return (
    <>
      <AddClientModal />
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow client={client} key={client.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Clients;
