import { TableRowsLoaderProps } from "@client/components/atoms/TableRowsLoader/@props/TableRowsLoader"

export const TableRowsLoader: React.FC<TableRowsLoaderProps> = ({
  columns,
  rows = 6,
}) =>
  Array(rows)
    .fill("")
    .map((_, index) => (
      <tr key={index}>
        <th
          className={
            index % 2 !== 0
              ? "animate-bg-gradient-slow bg-gradient-to-r from-primary to-secondary bg-400%"
              : ""
          }
          colSpan={columns}
        />
      </tr>
    ))
