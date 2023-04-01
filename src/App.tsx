import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/Root';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import { Provider } from 'react-redux';
import store from './store/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'user',
        element: <UserPage />,
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
