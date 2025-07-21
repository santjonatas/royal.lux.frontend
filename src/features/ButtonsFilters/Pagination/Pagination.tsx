import { useState } from 'react';
import ButtonDefault from '../../../components/buttons/ButtonDefault/ButtonDefault';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const [offset, setOffset] = useState(0); 

  const page1 = offset;
  const page2 = offset + 1;
  const page3 = offset + 2;
  const page4 = offset + 3;
  const page5 = offset + 4;

  const handlePrevious = () => {
    const newOffset = Math.max(offset - 5, 0);
    setOffset(newOffset);
    onPageChange(newOffset); 
  };

  const handleNext = () => {
    const newOffset = offset + 5;
    setOffset(newOffset);
    onPageChange(newOffset); 
  };

  return (
    <section id="role-pagination">
      <ButtonDefault
        innerText="Anterior"
        onClick={handlePrevious}
        disabled={offset === 0}
      />

      <ButtonDefault
        innerText={(page1 + 1).toString()}
        onClick={() => onPageChange(page1)}
        disabled={currentPage === page1}
      />
      <ButtonDefault
        innerText={(page2 + 1).toString()}
        onClick={() => onPageChange(page2)}
        disabled={currentPage === page2}
      />
      <ButtonDefault
        innerText={(page3 + 1).toString()}
        onClick={() => onPageChange(page3)}
        disabled={currentPage === page3}
      />
      <ButtonDefault
        innerText={(page4 + 1).toString()}
        onClick={() => onPageChange(page4)}
        disabled={currentPage === page4}
      />
      <ButtonDefault
        innerText={(page5 + 1).toString()}
        onClick={() => onPageChange(page5)}
        disabled={currentPage === page5}
      />

      <ButtonDefault
        innerText="Próxima"
        onClick={handleNext}
        disabled={currentPage !== page5}
      />
    </section>
  );
}
