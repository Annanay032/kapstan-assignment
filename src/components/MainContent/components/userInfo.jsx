import React from 'react'
import Avatar from '@mui/material/Avatar';
import { ChevronDownIcon } from '../../../Icons/chevronDownIcon';
import "../style.css";


function UserInfo() {
  return (
    <div className='user-info'>
      <Avatar sx={{ bgcolor: '#FFD07B' }}>A</Avatar>
      <span>Annanay</span>
      <ChevronDownIcon/>
    </div>
  )
}

export default UserInfo
