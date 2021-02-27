import React, { ChangeEvent, KeyboardEvent, FC, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Props {
  message: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => any;
  onKeyDown: (e: KeyboardEvent) => any;
  onSubmit: (e: FormEvent<HTMLFormElement>) => any;
}
export const MessageForm:FC<Props> = ({message, onChange, onKeyDown, onSubmit }) =>  (
  <form className="row h-100 pl-4 rounded" onSubmit={onSubmit}>
    <textarea
      placeholder="Type a message here"
      className="col-sm-10 col-md-11 col-xs-11 mx-auto my-auto pt-3 px-3 h-75 rounded TextArea"
      value={message}
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></textarea>
    <button
      className="col-xs-1 col-sm-2 col-md-1 h-25 my-auto border-0 bg-transparent SendButton"
    >
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </form>
)
