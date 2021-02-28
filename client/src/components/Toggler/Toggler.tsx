import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface Props {
  onClick?: any;
}

export const Toggler: FC<Props> = ({onClick}) => {
  return <span onClick={onClick} className="text-success d-sm-none">
      <FontAwesomeIcon icon={faArrowLeft} />
  </span>;
}