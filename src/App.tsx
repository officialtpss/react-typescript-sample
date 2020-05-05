import React from 'react';
import './App.css';
import MainLayout from './layout/Main-Layout';
import { SnackbarProvider } from 'notistack';
import CloseIcon from '@material-ui/icons/Close'; 

function App() {
  const notistackRef: any = React.createRef();
  const onClickDismiss = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  }
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{  vertical: 'top', horizontal: 'right',}}ref={notistackRef} action={(key) => (<span onClick={onClickDismiss(key)} style={{cursor: 'pointer'}}>
          <CloseIcon/>
        </span>
      )}
    >  <MainLayout /></SnackbarProvider>
  );
}

export default App;
