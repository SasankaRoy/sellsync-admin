import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Pagination component for AG Grid
 * @param {Object} props
 * @param {Object} props.gridApi - AG Grid API instance
 * @param {number[]} props.pageSizeSelector - Array of page sizes (e.g., [10, 20, 50])
 */
export const Pagination = ({
  gridApi,
  pageSizeSelector = [10, 20, 50, 100],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    if (!gridApi) return;

    const updatePaginationState = () => {
      setCurrentPage(gridApi.paginationGetCurrentPage() + 1);
      setTotalPages(gridApi.paginationGetTotalPages());
      setPageSize(gridApi.paginationGetPageSize());
      setTotalRows(gridApi.paginationGetRowCount());
    };

    gridApi.addEventListener("paginationChanged", updatePaginationState);
    updatePaginationState();

    return () => {
      gridApi.removeEventListener("paginationChanged", updatePaginationState);
    };
  }, [gridApi]);

  const onPrevPage = () => {
    if (gridApi) gridApi.paginationGoToPreviousPage();
  };

  const onNextPage = () => {
    if (gridApi) gridApi.paginationGoToNextPage();
  };

  const onPageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    if (gridApi) gridApi.paginationSetPageSize(newSize);
  };

  const onGoToPage = (pageNumber) => {
    if (gridApi) gridApi.paginationGoToPage(pageNumber - 1);
  };

  if (!gridApi || totalRows === 0) return null;

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  // Calculate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 w-full bg-white rounded-b-md border-t border-[#d4d4d4]">
      {/* Showing X to Y of Z */}
      <div className="text-xs sm:text-sm text-(--paraText-color) font-(--paraFont)">
        Showing <span className="font-semibold text-black">{startRow}</span> to{" "}
        <span className="font-semibold text-black">{endRow}</span> of{" "}
        <span className="font-semibold text-black">{totalRows}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-(--paraText-color) font-(--paraFont)">
            Show
          </span>
          <select
            value={pageSize}
            onChange={onPageSizeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none cursor-pointer"
          >
            {pageSizeSelector.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Controls */}
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft size={18} />
          </button>

          {getPageNumbers(63).map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onGoToPage(page)}
              disabled={page === "..."}
              className={`relative inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border transition-colors ${
                currentPage === page
                  ? "z-10 bg-(--button-color1) border-(--button-color1) text-white"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="sr-only">Next</span>
            <ChevronRight size={18} />
          </button>
        </nav>
      </div>
    </div>
  );
};
