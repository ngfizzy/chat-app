import React, {FC} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";

import "./VerticalSection.css"

type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Props {
  xs?: Sizes;
  sm?: Sizes;
  md?: Sizes;
  lg?: Sizes;
  as?: any;
  className?: string;
  canToggle?: boolean;
  isShowing?: boolean;
  onToggle?: (isShowing: boolean) => any;
  heading?: string;
}

export const VerticalSection: FC<Props> =({
  xs,
  sm,
  md,
  lg,
  as,
  className,
  children,
  canToggle,
  onToggle,
  heading,
  isShowing
}) => {
  const handleToggle = () => {
    if(canToggle) {
      onToggle && onToggle(!isShowing);
    }
  }

  const toggler = (
    <span
      onClick={handleToggle}
      className="text-success d-sm-none">
        <FontAwesomeIcon icon={faTimes} />
    </span>
  );

  return isShowing || typeof isShowing === 'undefined' ? <Col
      className={`h-100 p-1 bg-light rounded VerticalSection ${className || ''}`}
      xs={xs}
      sm={sm}
      lg={lg}
      mg={md}
      as={as}
    >
      {heading && <header className="p-3 pb-0 Heading">
         <h3 className="font-weight-bold d-flex justify-content-between">
          {heading}
          </h3>
        {canToggle && toggler}
      </header>}
      {children}
    </Col> : null

}