/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import UserCreateModal from "./UserCreateModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type UserType = {
  _id: string;
  username: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getAllUsers = async () => {
    await fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async () => {
    await fetch(`http://localhost:8080/user?username=${userName}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleClear = async () => {
    await getAllUsers();
    setUserName("");
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] ">User list</h2>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
        >
          Add user
        </button>
      </div>

      {/* User modal */}
      <UserCreateModal
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        setUsers={setUsers}
      />

      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="username..."
            required
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleClear()}
            disabled={userName === ""}
            className="disabled:opacity-50 text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={userName.trim() === ""}
            className="disabled:opacity-50 text-white absolute right-[85px] bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
      {users.length > 0 ? (
        users.map((users) => (
          <li
            key={users._id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {users.username}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">{users.email}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Delete<span className="sr-only">, {users._id}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          No user found
        </div>
      )}
    </ul>
  );
}
