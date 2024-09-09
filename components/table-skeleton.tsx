import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({
  row,
  column,
}: {
  row: number;
  column: number;
}) {
  const rowCount = row;
  const columnCount = column;
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              {Array.from({ length: columnCount }).map((_, index) => (
                <th key={index} className="p-3 text-left">
                  <Skeleton className="h-3 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, columnIndex) => (
                  <td key={columnIndex} className="p-3">
                    <Skeleton className="h-3 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
