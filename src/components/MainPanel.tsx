import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface Props {
    drawerWidth: number;
}

const MainPanel = (props: any) => {
    const { children } = props;
    return (
        <>
            <Box
                component="main"
                sx={{ m: 3, flexGrow: 1, p: 3, width: { sm: `calc(100% - ${props.drawerWidth}px)` } }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ m: 4 }}>
                    {/* <Typography paragraph>
                        <h3>Net Worth</h3>
                        <h4>$0.00</h4>

                    </Typography> */}
                    {children}

                </Container>
            </Box>
        </>
    );

}

export default MainPanel