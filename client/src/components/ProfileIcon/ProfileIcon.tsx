import React, { FC } from 'react';

import './ProfileIcon.css'

export const ProfileIcon: FC<{name: string}> = ({name}) => {
  const nameSegments = name?.split(' ');
  const firstName = nameSegments[0] || ' ';
  const lastName = nameSegments[1] || ' ';

  return (
    <div className="text-center font-weight-bold text-capitalize ProfileIcon">
    {
      `${firstName[0]}${lastName[0]}`
    }
  </div>
  )
}