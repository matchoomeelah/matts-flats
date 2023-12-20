import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { thunkLoadSpots } from './store/spots';

import Navigation from './components/Navigation/Navigation';
import SpotDisplay from './components/SpotDisplay/SpotDisplay';
import SpotDetails from './components/SpotDetails/SpotDetails';
import NewSpotForm from './components/NewSpotForm/NewSpotForm';
import ManageSpotsDisplay from './components/ManageSpots/ManageSpotsDisplay';
import UpdateSpotForm from './components/UpdateSpotForm.jsx/UpdateSpotForm';
import ManageReviewsDisplay from './components/ManageReviews/ManageReviewsDisplay';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotDisplay />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/new',
        element: <NewSpotForm />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsDisplay />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
      {
        path: 'reviews/current',
        element: <ManageReviewsDisplay />
      }
    ]
  }
]);

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Attempt to restore the user before loading the page
  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => {
      setIsLoaded(true)
    });

    dispatch(thunkLoadSpots());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
