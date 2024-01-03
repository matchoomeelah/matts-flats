import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetUserReviews } from '../../store/reviews';
import './ManageReviews.css'
import ManageReviewTile from './ManageReviewTile';


function ManageReviewsDisplay() {
    const dispatch = useDispatch();

    const userReviews = useSelector(state => state.reviews.userReviews);
    const sessionUser = useSelector(state => state.session.user);

    // Ensure userReviews in available in state
    useEffect(() => {
        try {
            dispatch(thunkGetUserReviews());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    // Handle case where no user logged in
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
