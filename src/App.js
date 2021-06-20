import '../src/styles/custom.css'

import AuthPage from './components/pages/AuthPage'
import AppNav from './components/AppNav'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EmployeePage from './components/pages/EmployeePage.jsx'
import ManagerPage from './components/pages/ManagerPage.jsx'

import UserContextProvider from './context/UserContext'
import MessageContextProvider from './context/MessageContext'
import ReimbursementContextProvider from './context/ReimbursementContext'


import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure( awsconfig );
Auth.configure( awsconfig )
Storage.configure( awsconfig )

function App() {

  return (
    <Router>
      <MessageContextProvider>
        <UserContextProvider>
          <ReimbursementContextProvider>
            <AppNav />
            <Route exact path="/">
              <AuthPage />
            </Route>
            <Route exact path="/manager">
              <ManagerPage />
            </Route>
            <Route exact path="/employee/:username">
              <EmployeePage />
            </Route>
          </ReimbursementContextProvider>
        </UserContextProvider>
      </MessageContextProvider>
    </Router>
  );
}

export default App;

