
import { Table, TableBody } from "@/components/ui/table";
import { Scammer } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScammerSortField, SortDirection } from "@/hooks/useSortableScammers";
import { CompactTableHeader } from "./table/CompactTableHeader";
import { CompactTableRow } from "./table/CompactTableRow";
import { CompactTableFooter } from "./table/CompactTableFooter";

interface ScammerTableCompactProps {
  scammers: Scammer[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  onSort?: (field: ScammerSortField) => void;
  sortField?: ScammerSortField;
  sortDirection?: SortDirection;
}

export const ScammerTableCompact = ({ 
  scammers, 
  formatDate,
  onSort,
  sortField,
  sortDirection
}: ScammerTableCompactProps) => {
  const isSortable = !!onSort;

  return (
    <div className="rounded-sm border-western-wood bg-western-parchment/80 overflow-hidden">
      <ScrollArea orientation="horizontal" className="w-full">
        <div className="min-w-[800px]">
          <Table>
            <CompactTableHeader 
              isSortable={isSortable} 
              onSort={onSort} 
              sortField={sortField} 
            />
            <TableBody>
              {scammers.map((scammer) => (
                <CompactTableRow 
                  key={scammer.id}
                  scammer={scammer}
                  formatDate={formatDate}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      <CompactTableFooter isSortable={isSortable} />
    </div>
  );
};
