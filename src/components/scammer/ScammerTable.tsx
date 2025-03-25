
import { Scammer } from "@/lib/types";
import { 
  Table, 
  TableBody
} from "@/components/ui/table";
import { ScammerSortField, SortDirection } from "@/hooks/useSortableScammers";
import { ScammerTableHeader } from "./table/ScammerTableHeader";
import { ScammerTableRow } from "./table/ScammerTableRow";
import { ScammerTablePagination } from "./table/ScammerTablePagination";

interface ScammerTableProps {
  paginatedScammers: Scammer[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  onSort: (field: ScammerSortField) => void;
  sortField: ScammerSortField;
  sortDirection: SortDirection;
}

export const ScammerTable = ({
  paginatedScammers,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  formatCurrency,
  formatDate,
  onSort,
  sortField,
  sortDirection
}: ScammerTableProps) => {
  return (
    <div className="rounded-sm border-western-wood bg-western-parchment/80 overflow-hidden">
      <Table>
        <ScammerTableHeader 
          onSort={onSort} 
          sortField={sortField} 
          sortDirection={sortDirection} 
        />
        <TableBody>
          {paginatedScammers.map((scammer, index) => (
            <ScammerTableRow 
              key={scammer.id}
              scammer={scammer}
              index={index}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ))}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <ScammerTablePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
