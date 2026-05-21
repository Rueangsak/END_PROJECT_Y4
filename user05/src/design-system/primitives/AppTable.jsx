import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { elevation } from '../tokens/elevation';

/**
 * Responsive data table with horizontal scroll on small screens.
 *
 * @param {{ id: string, label: string, align?: 'left'|'right'|'center' }[]} columns
 * @param {Record<string, unknown>[]} rows
 */
export default function AppTable({ columns = [], rows = [], dense = false }) {
  return (
    <TableContainer
      component={Paper}
      elevation={elevation.raised}
      sx={{
        width: '100%',
        overflowX: 'auto',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Table size={dense ? 'small' : 'medium'} stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} align={col.align || 'left'}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id ?? rowIndex} hover>
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align || 'left'}>
                  {row[col.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
