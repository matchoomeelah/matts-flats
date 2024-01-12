import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { thunkEditReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';

import './UpdateReviewFormModal.css'


function UpdateReviewFormModal({ reviewId }) {
    const dispatch = useDispatch();

    const userReviews = useSelector(state => state.reviews.userReviews);
    console.log("USER REVIEWS: ", userReviews);
    const currReview = userReviews[reviewId];
    console.log("CURR REVIEW SPOT NAME", currReview.Spot.name);

    const { closeModal } = useModal();


    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState('');
    const [serverError, setServerError] = useState('');


    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle Errors
        try {
            dispatch(thunkEditReview(reviewId, {
                review: reviewText,
                stars
            })).then(closeModal);
        } catch (err) {
            setServerError(err.message);
        }

    }

    return (
        <div id='review-form-container'>
            <h1 id='review-edit-heading-1'>How was your stay at</h1>
            <h1 id='review-edit-heading-2'>{currReview.Spot.name}?</h1>
            {serverError.length > 0 && <p>{serverError}</p>}
            <form id='review-form' onSubmit={handleSubmit}>
                <textarea
                    id='review-comment-area'
                    placeholder='Leave your review here...'
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)} />
                <ul className="rating-list">
                    <li id='stars-word-list-item'>Stars</li>
                    <li onClick={() => setStars(5)}><i className={`fa fa-star ${stars >= 5 ? "filled" : "empty"}`} title="Rate 5"></i></li>
                    <li onClick={() => setStars(4)}><i className={`fa fa-star ${stars >= 4 ? "filled" : "empty"}`} title="Rate 4"></i></li>
                    <li onClick={() => setStars(3)}><i className={`fa fa-star ${stars >= 3 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(2)}><i className={`fa fa-star ${stars >= 2 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(1)}><i className={`fa fa-star ${stars >= 1 ? "filled" : "empty"}`}></i></li>
                </ul>

                <button id='form-review-submit-button' disabled={reviewText.length < 10 || stars === ''}>Submit your review</button>
            </form>
        </div>
    )
}

export default UpdateReviewFormModal;
