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
  onPageChange
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const displayPage = currentPage + 1;

  return (
    <section id="role-pagination">
      <ButtonDefault 
        innerText='1'
        onClick={() => onPageChange(0)} 
        disabled={displayPage === 1}
      />
      <ButtonDefault 
        innerText='2' 
        onClick={() => onPageChange(1)}
        disabled={displayPage === 2}
      />
      <ButtonDefault 
        innerText='3' 
        onClick={() => onPageChange(2)}
        disabled={displayPage === 3}
      />
      <ButtonDefault 
        innerText='4' 
        onClick={() => onPageChange(3)}
        disabled={displayPage === 4}
      />
      <ButtonDefault 
        innerText='5' 
        onClick={() => onPageChange(4)}
        disabled={displayPage === 5}
      />
      
      <ButtonDefault
        innerText='Próxima'
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={displayPage >= totalPages}
      />
    </section>
  );
}