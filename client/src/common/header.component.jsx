import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(15)
    },
    toolbarTitle: {
      flex: 1,
    }
  }));

class Header extends Component {

    render() {
        return (
        <Container maxWidth="lg">
            <HeaderToolbar/>
        {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              href="#"
              className={classes.toolbarLink}
            >
              {section}
            </Link>
          ))}
        </Toolbar> */}
        </Container>
        );
    }
}

const HeaderToolbar = () => {
    const classes = useStyles();
    return (
        <Toolbar className={classes.toolbar}>
        <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
        >
            Meme Generator
        </Typography>
        </Toolbar>        
    );
}

export default Header;