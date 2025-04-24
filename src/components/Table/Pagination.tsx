import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pageNumbers: (number | 'ellipsis')[] = [];

    if (totalPages <= 7) {
      // If we have 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i += 1) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of visible page range
      let rangeStart = Math.max(2, currentPage - 1);
      let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

      // Adjust the range if we're near the beginning or end
      if (currentPage <= 3) {
        rangeEnd = 4;
      } else if (currentPage >= totalPages - 2) {
        rangeStart = totalPages - 3;
      }

      // Add ellipsis before range if needed
      if (rangeStart > 2) {
        pageNumbers.push('ellipsis');
      }

      // Add pages in range
      for (let i = rangeStart; i <= rangeEnd; i += 1) {
        pageNumbers.push(i);
      }

      // Add ellipsis after range if needed
      if (rangeEnd < totalPages - 1) {
        pageNumbers.push('ellipsis');
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={`flex items-center justify-center py-4 ${className}`}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-2 flex h-8 w-8 items-center justify-center rounded-md 
                 hover:bg-surfaceSecondary disabled:cursor-not-allowed
                 disabled:opacity-50 dark:hover:bg-darkSurfaceSecondary"
        aria-label="Previous page"
        type="button"
      >
        &lt;
      </button>

      <div className="flex">
        {pages.map((page) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${String(page)}-${
                page === 'ellipsis' ? 'before' : 'after'
              }`}
              className="flex h-8 w-8 items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-md
                        ${
                          currentPage === page
                            ? 'bg-surfaceSecondary font-bold dark:bg-darkSurfaceSecondary'
                            : 'hover:bg-surfaceSecondary dark:hover:bg-darkSurfaceSecondary'
                        }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-md 
                 hover:bg-surfaceSecondary disabled:cursor-not-allowed
                 disabled:opacity-50 dark:hover:bg-darkSurfaceSecondary"
        aria-label="Next page"
        type="button"
      >
        &gt;
      </button>
    </nav>
  );
};

export { Pagination };
