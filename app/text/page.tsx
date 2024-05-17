// components/Modal.js
"use client";
import PolicyContent from "@/components/global/PolicyContent";
import { useState } from "react";

export default function Modal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-2xl mx-auto">
                {/* Modal toggle */}
                <button
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setShowModal(!showModal)}
                    type="button"
                    data-modal-toggle="default-modal"
                >
                    Toggle modal
                </button>
                {/* Main modal */}

                {/* Main modal */}
                <div
                    id="default-modal"
                    className={`${
                        showModal ? "" : "hidden"
                    } overflow-x-hidden overflow-y-scroll fixed h-modal md:h-full w-screen top-4 left-0 right-0 md:inset-0 z-50 items-center flex justify-center`}
                >
                    <div className="relative w-full max-w-5xl px-4 h-4/5 lg:m-5">
                        {/* Modal content */}
                        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                    Terms of Service
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="default-modal"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-6 space-y-6 overflow-y-scroll">
                                <PolicyContent />
                            </div>
                            {/* Modal footer */}
                            <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    data-modal-toggle="default-modal"
                                >
                                    I accept
                                </button>
                                <button
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                                    data-modal-toggle="default-modal"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
