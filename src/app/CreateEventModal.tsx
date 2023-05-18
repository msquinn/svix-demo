import React, { useState } from "react";
import { Modal, Alert } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errorMessage: string | null;
  submitDisabled: boolean;
};

const CreateEventModal = ({
  open,
  setOpen,
  onSubmit,
  errorMessage,
  submitDisabled,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
        <h2
          id="modal-modal-title"
          className="text-lg font-medium text-gray-900"
        >
          Create new Event Type
        </h2>
        <div id="modal-modal-description" className="mt-2">
          <p className="text-sm text-gray-500">
            Create a new Svix event type by filling out the fields below.
          </p>
          <form className="mt-4" onSubmit={onSubmit}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                type="text"
                placeholder="Description"
              />
            </div>
            <button
              disabled={submitDisabled}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
