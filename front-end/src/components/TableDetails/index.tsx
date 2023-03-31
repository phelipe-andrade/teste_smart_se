import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function TableDetails<T extends  Record<string, any>>(props: {title: string, titleColumns: string[],  open: boolean, infos: T[], cols: number, loading: boolean}) {
    const {title, titleColumns, open, infos, cols , loading} = props;
    
    if (loading) return <p>Carregando...</p>
    return <>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={cols}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {title}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {titleColumns.map((title, index) => (
                        <TableCell key={index}>{title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {infos.map((obj, i) => (
                    <TableRow key={i}>
                        {Object.keys(obj).map((key, j)=> (
                            
                            <TableCell key={j}>{String(obj[key]).toLocaleUpperCase()}</TableCell>
                        ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
}