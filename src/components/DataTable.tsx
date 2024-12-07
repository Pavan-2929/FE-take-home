import React from "react";

interface Item {
  id: number;
  title?: string;
  name?: string;
}

interface DataTableProps {
  items: Item[];
}

const DataTable = ({ items }: DataTableProps) => {
  return (
    <div>
      <table className="w-full mt-4 border ">
        <thead className="text-[#525F71] font-semibold">
          <tr>
            <th className="py-4 text-left pl-28 pr-12">ID</th>
            <th className="py-4 text-left">Title</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
