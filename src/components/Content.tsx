import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DataTable from "./DataTable";
import Loader from "./Loader";

const Content = ({ data }: { data: string }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const fetchItems = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${data}?_page=${page}&_limit=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const totalItems = response.headers.get("X-Total-Count");
      if (totalItems) {
        setTotalPages(Math.ceil(parseInt(totalItems, 10) / itemsPerPage));
      }

      const itemsData = await response.json();
      setItems(itemsData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [data, currentPage]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-500">
        <svg
          className="h-10 w-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m2-4h.01M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9zm-9 7v-2m0-4h.01m-.01-2V7"
          />
        </svg>
      </div>
      <p className="mt-4 text-gray-600 text-center">
        {error || "Something went wrong."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>;
  }

  const getVisiblePages = () => {
    const visiblePages = [];
    if (currentPage > 3) visiblePages.push(1, "...");

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      visiblePages.push(i);
    }
    if (currentPage < totalPages - 2) visiblePages.push("...", totalPages);
    return visiblePages;
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "items_data.json";
    link.click();
  };

  return (
    <div className="px-6 mt-6 mb-8">
      <div className="bg-white px-6 py-4 border border-[#EAECF0] font-montserrat ">
        <div>
          <p className="font-sans font-bold text-[#344054]">
            Displaying Content
          </p>
        </div>
        <DataTable items={items} />
        <div className="mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <FaChevronLeft className="hover:text-blue-500 cursor-pointer size-9 pt-6 text-[#888888]" />
          </button>
          {getVisiblePages().map((page, index) => (
            <button
              className={`cursor-pointer hover:text-blue-500 px-2 py-2 mx-1 ${
                page === currentPage
                  ? "text-blue-500 font-medium"
                  : "text-zinc-900"
              }`}
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={typeof page !== "number"}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <FaChevronRight className="hover:text-blue-500 cursor-pointer size-9 pt-6 text-[#888888]" />
          </button>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button onClick={handleDownload} className="font-semibold text-lg bg-[#D1CFFF] px-9 py-2 rounded-lg">
          Download
        </button>
      </div>
    </div>
  );
};

export default Content;
