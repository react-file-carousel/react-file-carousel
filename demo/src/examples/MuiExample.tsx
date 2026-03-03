import {
  FileCarousel,
  type FileData,
  type FileCarouselTabSlotProps,
  type FileCarouselTableSlotProps,
} from 'react-file-carousel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const theme = createTheme({ palette: { mode: 'light', primary: { main: '#1976d2' } } });

function MuiTab({ active, onSelect, icon, name, ref }: FileCarouselTabSlotProps) {
  return (
    <Button
      ref={ref as React.Ref<HTMLButtonElement>}
      variant={active ? 'contained' : 'outlined'}
      size="small"
      onClick={onSelect}
      startIcon={icon}
    >
      {name}
    </Button>
  );
}

function MuiTable({ headers, rows }: FileCarouselTableSlotProps) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 360 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((h, i) => (
              <TableCell key={i}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MuiExample({ files }: { files: FileData[] }) {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 380 }}>
        <FileCarousel
          files={files}
          components={{ Tab: MuiTab, Table: MuiTable }}
        />
      </div>
    </ThemeProvider>
  );
}
