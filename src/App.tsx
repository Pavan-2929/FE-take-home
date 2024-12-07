import React, { useState } from "react";
import "./App.css";
import { FaChevronDown } from "react-icons/fa";
import Content from "./components/Content";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("posts");

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setSelectedContent(value);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="lg:px-12 md:px-6 sm:px-4 px-2 py-5 border-b border-[#DFDFDF] ">
        <p className="font-montserrat lg:text-[32px] text-3xl text-center leading- lg:text-start font-medium">
          Dynamic Content Manager
        </p>
      </div>
      <div className="px-2 sm:px-6 lg:px-12 py-5 font-bold text-[#344054]">
        <p>Fetch Content</p>
      </div>
      <div className="px-1 lg:px-5 w-fit max-w-[100vw]">
        <div className="min-w-[300px] px-1 sm:px-4 lg:px-6 py-4 bg-white border border-[#EAECF0] rounded-lg">
          <div className="relative">
            <div
              onClick={toggleMenu}
              className="cursor-pointer flex px-3 space-x-8 text-opacity-90 rounded-lg py-[6px] justify-between items-center bg-[#EEEEEE] text-[#525F71]"
            >
              <button className="rounded-md focus:outline-none font-bold font-montserrat">
                {selectedContent || "Select content type"}
              </button>
              <FaChevronDown />
            </div>
            <div
              className={`mt-2 w-[250px] bg-[#EEEEEE] text-[#525F71] border rounded-md shadow-lg transform transition-transform duration-300 ${
                isOpen ? "scale-y-100 inline-block" : "scale-y-0 hidden"
              } origin-top`}
            >
              <ul className="py-2">
                <li
                  onClick={() => handleSelect("posts")}
                  className="px-3 py-[6px] hover:bg-[#D1CFFF] cursor-pointer"
                >
                  Posts
                </li>
                <li
                  onClick={() => handleSelect("comments")}
                  className="px-3 py-[6px] hover:bg-[#D1CFFF] cursor-pointer"
                >
                  Comments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Content data={selectedContent} />
      </div>
    </div>
  );
};

export default App;
