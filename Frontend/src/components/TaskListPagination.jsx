import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils'
import { visibleTaskLimit } from '@/lib/data'

const TaskListPagination = ({
    handlePrev,
    handleNext,
    handlePageChange,
    page,
    totalPages,
  }
) => {

// const generatePages = () => {
//   const pages = [];
//   if(totalPages < visibleTaskLimit) {
//     for(let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//   } else {
//     if (page <= 3) {
//       pages.push(1, 2, 3, 4, 5, "...", totalPages);
//     }
//     // Trang giữa
//     else if (page > 3 && page < totalPages - 2) {
//       pages.push(1, "...", page - 1, page, page + 1, "...", totalPages-1, totalPages);
//     }
//     // Trang cuối
//     else {
//       pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//     }
//   }

//   // Loại trùng số (phòng khi overlap khi tổng trang nhỏ)
//   const uniquePages = pages.filter((v, i, arr) => arr.indexOf(v) === i);

//   return uniquePages;
// }

const generatePages = () => {
  const pages = [];
  const maxDisplay = 7; // mong muốn hiển thị tối đa 7 mục (số + ...)

  if (totalPages <= maxDisplay) {
    // hiển thị tất cả nếu tổng trang nhỏ
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  // trường hợp nằm ở đầu (show 1..5, ..., last)
  if (page <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
    return pages;
  }

  // trường hợp nằm ở cuối (show first, ..., last-4 .. last)
  if (page >= totalPages - 3) {
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
    return pages;
  }

  // trường hợp ở giữa (show first, ..., page-1, page, page+1, ..., last)
  pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
  return pages;
};


const pagesToShow = generatePages();

 return (
    <div className='flex justify-center mt-4'>
      <Pagination>
      <PaginationContent>

        {/* prev */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={page === 1 ? undefined : handlePrev}
            className={cn('cursor-pointer',
              page === 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>

        {pagesToShow.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." 
            ? (<PaginationEllipsis/>) 
            : (<PaginationLink
                isActive={p === page}
                onClick={() => {
                  if(p !== page) handlePageChange(p)
                }}
                className="cursor-pointer"
              >
              {p}
            </PaginationLink>)}
          </PaginationItem>
        ))}

        {/* next */}
        <PaginationItem>
          <PaginationNext 
             onClick={page ===  totalPages ? undefined : handleNext}
            className={cn('cursor-pointer',
              page === totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
    </div>
  )
}

export default TaskListPagination
