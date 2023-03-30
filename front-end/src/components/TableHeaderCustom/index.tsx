import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaderCustom(props: {titlesHead: string[]}) {
    const {titlesHead} = props;
    return <>
    <TableHead>
        <TableRow>
            <TableCell />
            {titlesHead.map((title, index) => (
                <TableCell align="center" key={title + index}>{title}</TableCell>
            ))}
        </TableRow>
    </TableHead>
    </>
}