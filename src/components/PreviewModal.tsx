
import { FaTimes } from "react-icons/fa";

interface ItemProps {
  item: {
    id: number;
    title?: string;
    name?: string;
    body?: string;
    email?: string;
    userId?: string;
  };
  toggleModal: () => void;
}

const PreviewModal = ({ item, toggleModal }: ItemProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={toggleModal}
    >
      <div
        className="relative bg-gray-300 p-6 rounded-lg shadow-xl w-[80vw] sm:w-[60vw] lg:w-[55vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Preview Details</h2>
          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong className="font-semibold">ID:</strong> {item.id}
          </p>
          <p>
            <strong className="font-semibold">Title:</strong>{" "}
            {item.title || item.name}
          </p>
          <p>
            <strong className="font-semibold">Body:</strong> {item.body}
          </p>
          <p>
            <strong className="font-semibold">Email:</strong> {item.email}
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={toggleModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
