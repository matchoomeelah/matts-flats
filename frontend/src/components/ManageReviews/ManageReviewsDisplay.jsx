import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { thunkGetUserReviews } from '../../store/reviews';
import ManageReviewTile from './ManageReviewTile';
import './ManageReviews.css'


function ManageReviewsDisplay() {
    const dispatch = useDispatch();

    const userReviews = useSelector(state => state.reviews.userReviews);
    const sessionUser = useSelector(state => state.session.user);

    // Ensure userReviews is available in state
    useEffect(() => {
        dispatch(thunkGetUserReviews());
    }, [dispatch]);

    // Handle case where no user logged in, and we don't want them to see the page
    if (!sessionUser) {
        return null;
    }

    return (
        <div>
            <h1 id="manage-reviews-heading">Manage Reviews</h1>
            <div id="reviews-container">
                {Object.values(userReviews).length === 0 && <h3>You haven&apos;t posted any reviews.</h3>}
                {Object.values(userReviews).sort((a, b) => b.id - a.id).map(rev => {
                    return <ManageReviewTile key={rev.id} review={rev} />
                })}
            </div>
        </div>
    )
}

export default ManageReviewsDisplay;
