import * as React from 'react';
import axios from "axios";


import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '@mui/utils';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {
  useWallet,
} from '@solana/wallet-adapter-react';
import styles from './index.module.css'

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

interface Data {
  symbol: string;
  amount: number;
  price: number;
  coingeckoId: string;
  logoUrl: string;
}

function createData(
  symbol: string,
  amount: number,
  price: number,
  coingeckoId: string,
  logoUrl: string,
): Data {
  return {
    symbol,
    amount,
    price,
    coingeckoId,
    logoUrl
  };
}

interface Props {
  searchAddress: string,
}

var rows: Array<Data>;// = [createData('Cupcake', 305, 3.7, 67, 4.3)];

export const Dashboard = (props: Props) => {
  var baseUrl = "http://92.38.130.111:443/wallet-tokens/";
  const [loading, setLoading] = React.useState(false);
  const [color, setColor] = React.useState("#333333");
  let tB = 0;
  const wallet = useWallet();
  let walletAddress = "";
  if (wallet.connected && wallet.publicKey) {
    // 
    walletAddress = wallet.publicKey.toString();
  }

  let walletData: Array<Data>;
  const [apiData, setApidata] = React.useState([])

  const [rowData, setrowData] = React.useState([])
  // if (walletAddress !== '') baseUrl = "http://92.38.130.111:443/wallet-tokens/".concat(walletAddress);

  const getData = async () => {
    console.log(props.searchAddress);
    setLoading(true);
    if (props.searchAddress === '' && walletAddress === '') {
      setrowData([]);
      setLoading(false);
      return;
    }
    let burl = '';
    if (props.searchAddress !== '') {
      burl = baseUrl.concat(props.searchAddress);
    } else if (wallet.connected) {
      burl = baseUrl.concat(walletAddress);
    }
    console.log(burl);
    console.log("start loading")
    try {
      await axios.get(burl).then((response) => {
        setrowData(response.data);

      }).catch(function (error) {
        console.log(error);
      }).then(function () {

        console.log("get walltdata function  executed");
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    console.log("start end!")
    return;
  }

  React.useEffect(() => {
    getData();

  }, [props.searchAddress, walletAddress]);

  //
  const [orderBy, setOrderBy] = React.useState<keyof Data>('price');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <h3>Net Worth</h3>
      <h4>
        {(walletAddress !== '' || props.searchAddress !== '') && rowData.length === 0 && "$0.00"}
        {
          (walletAddress !== '' || props.searchAddress !== '') &&
          rowData.length > 0 &&
          rowData.map((row, index) => {
            tB += row.amount * row.price;
            if (index === rowData.length - 1) return "$".concat(tB.toFixed(2));
          })
        }
      </h4>
      <h4>
        {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
      </h4>
      <div >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.panelSubTitle}>
              <div>
                <span className={styles.totalBalance} >
                  $0.00
                </span>
                <span className={styles.priceChangePercent}>
                  &nbsp;&nbsp; - 0%
                </span>
              </div>
              <div>
                <ButtonGroup variant="outlined" color='inherit' aria-label="outlined button group">
                  <Button size="small">1D</Button>
                  <Button>1W</Button>
                  <Button>1M</Button>
                  <Button>1Y</Button>
                  <Button>ALL</Button>
                </ButtonGroup>
              </div>
            </div>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            {/* <Typography>Accordion 2</Typography> */}
            <div className={styles.panelSubTitle}>
              <span>
                Tokens
              </span>
              <span>
                {(walletAddress !== '' || props.searchAddress !== '') && rowData.length === 0 && "$0.00"}
                {
                  (walletAddress !== '' || props.searchAddress !== '') &&
                  rowData.length > 0 &&
                  rowData.map((row, index) => {
                    tB += row.amount * row.price;
                    if (index === rowData.length - 1) return "$".concat(tB.toFixed(2));
                  })
                }
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails >
            <Paper sx={{ width: '95%', mb: 2 }} className="sweet-loading">

              <TableContainer>
                <Table
                  sx={{ maxWidth: "100%" }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">

                      </TableCell>

                      <TableCell
                        align={'left'}
                        padding={'normal'}
                      >
                        Symbol
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align={'right'}
                        padding={'normal'}
                      >
                        Balance
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align={'right'}
                        padding={'normal'}
                      >
                        Price
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align={'right'}
                        padding={'normal'}
                      >
                        Value
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <p>

                    </p>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                    {walletAddress !== '' && rowData.length > 0 && rowData.map((row, index) => {
                      // const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.symbol}
                        >
                          <TableCell padding="checkbox">

                          </TableCell>
                          <TableCell

                            scope="row"
                            align={'left'}
                            padding={'none'}
                          >
                            <div style={{ display: 'inline-flex', height: '100%' }}>
                              <img src={row.logoUrl} className={styles.logoUrl}></img>
                              <div style={{ display: 'inline-block' }}><p> {row.symbol}</p></div>
                            </div>

                          </TableCell>

                          <TableCell
                            align={'right'}
                            padding={'none'}>
                            {row.amount !== 0 ? row.amount.toFixed(6) === 0.00 ? "<0.0000001" : row.amount.toFixed(6) : '-'}
                          </TableCell>
                          <TableCell
                            align={'right'}
                            padding={'none'}
                          >
                            {"$".concat(row.price)}
                          </TableCell>
                          <TableCell
                            align={'right'}
                            padding={'none'}
                          >
                            {row.amount !== 0 ? "$".concat((row.amount * row.price).toFixed(2)) : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })
                    }

                  </TableBody>
                </Table>
              </TableContainer>

              <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '60px' }}>
                <ClipLoader color={color} loading={loading} size={50} />
              </div>
            </Paper>
          </AccordionDetails>

        </Accordion>


      </div>


    </>
  );
}