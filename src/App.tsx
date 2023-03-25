import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/Root';
import HomePage from './pages/Home';
import UserPage from './pages/User';

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
  return <RouterProvider router={router} />;
}

export default App;
