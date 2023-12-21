import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetUserReviews } from '../../store/reviews';
import './ManageReviews.css'
import ManageReviewTile from './ManageReviewTile';

// import ManageReviewTile from "./ManageReviewTile";


function ManageReviewsDisplay() {
    const dispatch = useDispatch();

    const userReviews = useSelector(state => state.reviews.userReviews);


    // Ensure userReviews in available in state
    useEffect(() => {
        try {
            dispatch(thunkGetUserReviews());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);



    return (
        <div>
            <h1 id="manage-reviews-heading">Manage Reviews</h1>
            <div id="reviews-container">
                {Object.values(userReviews).map(rev => {
                    return <ManageReviewTile key={rev.id} review={rev} />
                })}
            </div>
        </div>
    )
}

export default ManageReviewsDisplay;
