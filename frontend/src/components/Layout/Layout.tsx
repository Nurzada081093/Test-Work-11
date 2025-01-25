import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/joy';
import ToolBar from '../UI/ToolBar/ToolBar.tsx';

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;