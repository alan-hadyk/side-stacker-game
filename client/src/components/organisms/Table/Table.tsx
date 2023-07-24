import { TableRowsLoader } from "@app/components/atoms/TableRowsLoader/TableRowsLoader"
import { TableProps } from "@app/components/organisms/Table/@types/Table"

export const Table: React.FC<TableProps> = ({
  className = "",
  headers,
  isLoading = false,
  rows,
}) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {isLoading && <TableRowsLoader columns={headers.length} />}
        {!isLoading &&
          rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)
