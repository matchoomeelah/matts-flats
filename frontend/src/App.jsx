import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRestoreUser } from './store/session';
import { thunkGetUserSpots, thunkLoadSpots } from './store/spots';

import Navigation from './components/Navigation/Navigation';
import SpotDisplay from './components/SpotDisplay/SpotDisplay';
import SpotDetails from './components/SpotDetails/SpotDetails';
import NewSpotForm from './components/NewSpotForm/NewSpotForm';
import ManageSpotsDisplay from './components/ManageSpots/ManageSpotsDisplay';
import UpdateSpotForm from './components/UpdateSpotForm.jsx/UpdateSpotForm';
import ManageReviewsDisplay from './components/ManageReviews/ManageReviewsDisplay';
import { thunkGetUserReviews } from './store/reviews';

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

  const allSpots = useSelector(state => state.spots.allSpots);


  // Attempt to restore the user before loading the page
  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => {
      setIsLoaded(true)
    });

    // Handle timeout
    // if (Object.keys(allSpots).length === 0) {
      dispatch(thunkLoadSpots());
    // }

    // Get reviews of current user and set in state
    dispatch(thunkGetUserReviews());

    // Get spots of current user and set in state
    dispatch(thunkGetUserSpots());
  }, [dispatch, allSpots]);

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
