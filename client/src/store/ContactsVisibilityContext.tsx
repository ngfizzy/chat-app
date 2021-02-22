import React, { createContext, useState, FC, useEffect, Dispatch, SetStateAction } from 'react';

export const ContactsVisibilityContext = createContext<{
  isVisible: boolean;
  viewPortWidth: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>
}>({
  isVisible: false,
  setIsVisible: (_) => {},
  viewPortWidth: window.innerWidth,
});

const mediumScreen = 992;

export const ContactsVisibilityProvider:FC = ({children}) => {
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(viewPortWidth >= mediumScreen);

  window.addEventListener('resize',()=> {
    setViewPortWidth(window.innerWidth);
  });

  useEffect(() => {
    setIsVisible(viewPortWidth >= mediumScreen)
  }, [setIsVisible, viewPortWidth])

  return(
    <ContactsVisibilityContext.Provider value={{isVisible, setIsVisible, viewPortWidth}}>
      {children}
    </ContactsVisibilityContext.Provider>
  );
}

