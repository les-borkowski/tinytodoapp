import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useHistory } from 'react-router-dom';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export default function SideButtons({showComplete, showTodo, refreshDb}) {

  
  const handleClick = () => {
    history.push('/addcard');
  }
 
  const history = useHistory();

  return (
    <>
    {/* ADD MODAL HERE */}
      <ListItem button onClick={handleClick}>
        <ListItemIcon><AddBoxIcon/></ListItemIcon>
        <ListItemText>Add new task</ListItemText>
      </ListItem>
      
      <ListItem button onClick={showComplete}>
        <ListItemIcon><PlaylistAddCheckIcon/></ListItemIcon>
        <ListItemText>Show completed tasks</ListItemText>
      </ListItem>

      <ListItem button onClick={showTodo}>
        <ListItemIcon><FormatListBulletedIcon/></ListItemIcon>
        <ListItemText>Show tasks to do</ListItemText>
      </ListItem>

      <ListItem button onClick={refreshDb}>
        <ListItemIcon><RefreshIcon/></ListItemIcon>
        <ListItemText>Refresh DB</ListItemText>
      </ListItem>
    </>
  )
}
