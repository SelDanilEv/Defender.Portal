import {
  Button,
  ListItem
} from '@mui/material';
import { useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';


const MenuItem = (props: any) => {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <div>
      <ListItem>
        <Button
          disableRipple
          component={RouterLink}
          onClick={closeSidebar}
          to={props.to}
          startIcon={props.icon}
        >
          {props.text}
        </Button>
      </ListItem>
    </div>
  );
}

export default MenuItem;
