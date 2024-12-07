import React, { useState, useEffect, useRef } from "react";

type NewDataModalProps = {
  toggleModal: () => void;
  addData: (newData: any) => void;
};

const NewDataModal = ({ toggleModal, addData }: NewDataModalProps) => {
  const [selectedType, setSelectedType] = useState("posts");

  const [postData, setPostData] = useState({
    userId: "11",
    title: "",
    body: "dummy boddy",
  });

  const [commentData, setCommentData] = useState({
    userId: "11",
    name: "",
    email: "dummyemail@gmail.com",
    body: "dummy boddy",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleModal]);

  const handleButtonClick = (type: string) => {
    setSelectedType(type);
  };

  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType === "posts") {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          addData(json);
        });
      setPostData({ userId: "11", title: "", body: "dummy body" });
      toggleModal();
    } else {
      fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          addData(json);
        });
      setCommentData({
        userId: "11",
        name: "",
        email: "dummyemail@gmail.com",
        body: "dummy boddy",
      });
      toggleModal();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        ref={modalRef}
        className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg md:w-[60vw] lg:w-[40vw] w-full"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold mb-4">New Data Modal</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => handleButtonClick("posts")}
              className={`px-6 py-2 rounded-lg transition-transform transform duration-200 ${
                selectedType === "posts"
                  ? "bg-blue-500 text-white shadow-lg active:scale-95"
                  : "bg-gray-300 text-black shadow-md hover:shadow-lg hover:scale-105"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => handleButtonClick("comments")}
              className={`px-6 py-2 rounded-lg transition-transform transform duration-200 ${
                selectedType === "comments"
                  ? "bg-blue-500 text-white shadow-lg active:scale-95"
                  : "bg-gray-300 text-black shadow-md hover:shadow-lg hover:scale-105"
              }`}
            >
              Comments
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          {selectedType === "posts" ? (
            <div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={postData.title}
                  onChange={handlePostChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={commentData.name}
                  onChange={handleCommentChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          )}
          <div className="flex space-x-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-4"
            >
              Submit
            </button>
            <button
              onClick={toggleModal}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDataModal;
