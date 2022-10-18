import React from 'react'

const LayoutStateContext = React.createContext({});

const LayoutProvider = ({ children }) => {
  const [isSidebarOpened, setIsSidebarOpened] = React.useState(true);
  return (
    <LayoutStateContext.Provider value={{isSidebarOpened,setIsSidebarOpened}}>
        {children}
    </LayoutStateContext.Provider>
  );
}

export   {LayoutProvider,LayoutStateContext};

