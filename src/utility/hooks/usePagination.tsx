import { useState } from "react";

export default function usePagination(data: any[], itemsPerPage: number) {
  const [page, setPageData] = useState(1);

  const dataPerPage = data?.length / itemsPerPage;
  const isWholeNumber = dataPerPage % 1 === 0;
  const lastPage = isWholeNumber ? dataPerPage : Math.floor(dataPerPage) + 1;

  console.log(data);

  const paginatedData = data?.filter(
    (_, i) => i >= (page - 1) * itemsPerPage && i <= (itemsPerPage - 1) * page
  );

  const pages: number[] = [];

  for (let i = 1; i <= lastPage; i++) {
    pages.push(i);
  }

  function setPage(page: number) {
    const isInvalid = page <= 0 || page > lastPage;

    setPageData(() => {
      return isInvalid ? 1 : page;
    });
  }

  return { page, setPage, pages, lastPage, paginatedData };
}

// import { useState } from "react";

// export default function usePagination(data: any[], itemsPerPage: number) {
//   const [page, setPageData] = useState(1);

//   const lastPage = Math.ceil(data?.length / itemsPerPage);

//   const paginatedData = data?.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const pages: number[] = [];

//   for (let i = 1; i <= lastPage; i++) {
//     pages.push(i);
//   }

//   function setPage(page: number) {
//     const isInvalid = page <= 0 || page > lastPage;

//     setPageData(() => {
//       return isInvalid ? 1 : page;
//     });
//   }

//   return { page, setPage, pages, lastPage, paginatedData };
// }
