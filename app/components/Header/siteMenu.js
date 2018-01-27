import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const SiteMenu = props => {
  return (
    <IconMenu {...props} iconButtonElement={<IconButton><MenuIcon color="#fff" /></IconButton>}>
      <MenuItem primaryText="Home" containerElement={<Link to="/" />} />
      <MenuItem primaryText="News" containerElement={<Link to="/news" />} />
    </IconMenu>
  );
};

export default SiteMenu;
