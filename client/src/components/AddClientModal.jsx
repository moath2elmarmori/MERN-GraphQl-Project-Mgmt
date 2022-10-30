import { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient, { loading }] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  if (loading) {
    return <Spinner />;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      toast.error("Please Add All Fields");
    } else {
      addClient(name, email, phone);
      setName("");
      setEmail("");
      setPhone("");
    }
  };
  return (
    <div className="add-client-modal-div my-3">
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#AddClientModal"
      >
        <div className="d-flex justify-content-center align-items-center">
          <FaUser />
          <p className="add-client-text">Add Client</p>
        </div>
      </button>

      <div
        className="modal fade"
        id="AddClientModal"
        tabIndex="-1"
        aria-labelledby="AddClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddClientModalLabel">
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
              <form onSubmit={formSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Client Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <hr />
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Client Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Client Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <hr />
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Client Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Client Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <hr />
                <button className="btn btn-success" data-bs-dismiss={"modal"}>
                  Add Client
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddClientModal;
