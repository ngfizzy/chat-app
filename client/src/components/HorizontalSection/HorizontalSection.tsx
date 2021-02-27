
import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { Toggler } from "../Toggler";

import "./HorizontalSection.css";

interface Props {
  canToggle?: boolean;
  onToggle?: (arg: boolean) => any;
  isShowing?: boolean;
  toggler?: any;
  heading?: string;
  height?: string;
}

export const HorizontalSection:FC<Props> = ({canToggle, onToggle, isShowing, heading, children, height, toggler}) => {
  const handleToggle = () => {
    if(canToggle) {
      onToggle && onToggle(!isShowing);
    }
  }

  return isShowing || typeof isShowing === 'undefined' ? <Row style={{height}} className="bg-light HorizontalSection" >
    <Col xs={12}>
      {heading && <header className="p-3 pb-0  Header">
        {<h3 className="font-weight-bold d-flex justify-content-between">
          {heading}
        </h3>}
        { handleToggle && (toggler || <Toggler onClick={handleToggle} />)}
      </header>}
    {children}
  </Col>
  </Row> : null;
}