import React, { FC } from 'react'

import './ConversationSummary.css'

interface Props {
  name: string;
  message: string;
}

export const ConversationSummary:FC<Props> = ({ name, message }) =>  (
  <div className="p-1 ConversationSummary">
    <h4 className="font-weight-bold text-capitalize contact-name">{name}</h4>
   { message ? <p className="font-weight-400 last-message">{message.substr(0, 86)}</p> : null}
  </div>
);

