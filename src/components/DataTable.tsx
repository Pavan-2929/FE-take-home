// DataTable.tsx
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
    <div>
      <table className="w-full mt-4 border ">
        <thead className="text-[#525F71] font-semibold">
          <tr>
            <th className="py-4 text-left pl-28 pr-12">ID</th>
            <th className="py-4 text-left">Title</th>
            <th className="py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {items.map((item) => (
            <tr
              key={item.id}
              className={`border-t ${
                item.id % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-4 text-left pl-28 pr-12">{item.id}</td>
              <td className="text-left py-4">{item.title || item.name}</td>
              <td
                className="cursor-pointer text-[#525F71] pr-6"
                data-tooltip-id="preview-tooltip"
                data-tooltip-content="View Details"
              >
                <FaEye size={14} onClick={() => toggleModal(item)} />
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
