import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import PreviewModal from "./PreviewModal";

interface Item {
  id: number;
  title?: string;
  name?: string;
  body?: string;
  email?: string;
  userId?: string;
}

interface DataTableProps {
  items: Item[];
}

const DataTable = ({ items }: DataTableProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const toggleModal = (item: Item | null) => {
    setSelectedItem(item);
    setModal(!modal);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full mt-4 border text-sm sm:text-base">
        <thead className="text-[#525F71] font-semibold">
          <tr>
            <th className="py-4 text-left px-4 sm:px-8 lg:pl-36">ID</th>
            <th className="py-4 text-left px-4 sm:px-8 ">Title</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={`border-t ${
                item.id % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-4 text-left px-4 sm:px-8 lg:pl-36">
                {item.id}
              </td>
              <td className="py-4 text-left px-4 sm:px-8">
                {item.title || item.name}
              </td>
              <td
                className="cursor-pointer text-[#525F71] pr-6 text-center sm:text-left"
                data-tooltip-id="preview-tooltip"
                data-tooltip-content="View Details"
              >
                <FaEye size={16} onClick={() => toggleModal(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip
        id="preview-tooltip"
        place="top"
        className="bg-gray-500 text-white"
      />
      {modal && selectedItem && (
        <PreviewModal
          item={selectedItem}
          toggleModal={() => toggleModal(null)}
        />
      )}
    </div>
  );
};

export default DataTable;
