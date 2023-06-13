/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type IUserCreateModalProps = {
  open: boolean;
  handleClose: () => void;
  setUsers: (data: any) => void;
};

const UserCreateModal: React.FC<IUserCreateModalProps> = ({
  open,
  handleClose,
  setUsers,
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreate = async () => {
    const payload = {
      username: userName,
      email,
    };
    await fetch("http://localhost:8080/user/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prev: any) => [...prev, data]);
        handleClose();
      });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Create an user
                </Dialog.Title>

                <input
                  type="text"
                  className="block w-full h-[46px] p-4 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 mb-4"
                  placeholder="username..."
                  required
                  value={userName}
                  onChange={(e: any) => setUserName(e.target.value)}
                />

                <input
                  type="email"
                  className="block w-full h-[46px] p-4 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    disabled={email.trim() === "" || userName.trim() === ""}
                    className="disabled:opacity-50  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                    onClick={() => handleCreate()}
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserCreateModal;
