import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import SettingIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';

import {
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';

interface Props {

    drawerWidth: number;
    // window?: () => Window;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const SideBar = (props: Props) => {
    // const { window } = props;
    // const container = window !== undefined ? () => window().document.body : undefined;
    const wallet = useWallet();
    const { connection } = useConnection();
    let walletAddress = "";
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

    const drawer = (
        <div>
            <Toolbar >
                Sonar
            </Toolbar>
            <Divider />
            <Box sx={{ p: 1 }}>
                <FormControl fullWidth >
                    {wallet.connected ?
                        <Select defaultValue='0'>
                            <MenuItem value='0' selected>
                                {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                            </MenuItem>
                        </Select> :
                        <Button color="inherit" disableElevation fullWidth style={{ height: '48px' }}>
                            Track an address
                        </Button>
                    }
                </FormControl>

            </Box>
            <Divider />
            <Box sx={{ p: 1 }}>
                <Link href="#" underline="none" color="inherit">
                    <Button style={{ height: "40px" }} color="inherit" disableElevation fullWidth startIcon={<DashboardIcon />}>
                        Dashboard
                    </Button>
                </Link>
            </Box>
            <Box sx={{ p: 1 }}>
                <Link href="#" underline="none" color="inherit">
                    <Button color="inherit" disableElevation fullWidth startIcon={<SettingIcon />}>
                        Setting
                    </Button>
                </Link>
            </Box>
        </div >
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default SideBar;