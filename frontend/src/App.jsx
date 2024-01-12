import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { thunkLoadSpots } from './store/spots';

import Navigation from './components/Navigation/Navigation';
import SpotDisplay from './components/SpotDisplay/SpotDisplay';
import SpotDetails from './components/SpotDetails/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm';
import ManageSpotsDisplay from './components/ManageSpots/ManageSpotsDisplay';
import UpdateSpotForm from './components/UpdateSpotForm.jsx/UpdateSpotForm';
import ManageReviewsDisplay from './components/ManageReviews/ManageReviewsDisplay';
import CreateBookingForm from './components/CreateBookingForm/CreateBookingForm';

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
        element: <CreateSpotForm />
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
        path:'/spots/:spotId/bookings',
        element: <CreateBookingForm />
      },
      {
        path: '/reviews/current',
        element: <ManageReviewsDisplay />
      },
      {
        path: "*",
        element: <SpotDisplay />
      }
    ]
  }
]);

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Attempt to restore the user before loading the page
  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => { setIsLoaded(true)
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
