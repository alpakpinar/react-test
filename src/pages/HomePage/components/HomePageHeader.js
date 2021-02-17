import React from 'react'
import './HomePageHeader.css'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import NotificationsIcon from '@material-ui/icons/Notifications'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appbar: {
        background: "#6495ED"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  export default function HomePageHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const menuButtonStyle = {
      margin: "0 15px", 
      textTransform: "none", 
      fontSize: "16px"
    }

    const menuBoxStyle = {
      marginRight: "25em",
      marginLeft: "10em",
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              KampüsteKal
            </Typography>
            <Box style={menuBoxStyle}>
              <Button color="inherit" style={menuButtonStyle}>KampüsteKal</Button>
              <Button color="inherit" style={menuButtonStyle}>Blog</Button>
              <Button color="inherit" style={menuButtonStyle}>İletişim</Button>
            </Box>
            <Typography>{props.username}</Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  style={{
                    marginTop: "40px"
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                <Avatar style={{margin: "auto"}}>{props.username[0].toUpperCase()}</Avatar>
                <ListSubheader component="div" style={{lineHeight: "30px", margin: "15px 10px"}}>
                    @{props.username}<br></br>
                    {props.name}
                </ListSubheader>
                <Divider style={{marginBottom: "8px"}} />
                  <MenuItem onClick={handleClose}>Ayarlar</MenuItem>
                  <MenuItem onClick={props.handleLogout}>Çıkış Yap</MenuItem>
                </Menu>
              </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }