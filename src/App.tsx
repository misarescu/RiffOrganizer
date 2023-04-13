import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/Root';
import HomePage from './pages/Home';
import UserPage, { loader as userPageLoader } from './pages/User';
import { Provider } from 'react-redux';
import store from './store/index';
import PasswordResetPage from './pages/PasswordReset';

// TODO: add form actions for the form submissions to work with reac-router-dom
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'user/:userId',
        id: 'user-page',
        loader: userPageLoader,
        element: <UserPage />,
      },
      {
        path: '/password-reset/:userId',
        id: 'password-reset',
        // loader: () => {},
        element: <PasswordResetPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
