import { useState } from 'react';
import { Pagination } from '@patternfly/react-core';

export const PaginationNoItems: React.FunctionComponent = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  return (
    <Pagination
      itemCount={0}
      perPage={perPage}
      page={page}
      onSetPage={onSetPage}
      widgetId="no-items-example"
      onPerPageSelect={onPerPageSelect}
    />
  );
};
