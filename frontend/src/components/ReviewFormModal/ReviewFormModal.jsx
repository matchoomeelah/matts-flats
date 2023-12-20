import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import './ReviewForm.css'
import { thunkAddReview } from '../../store/reviews';

function ReviewFormModal() {
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots.currentSpot)

    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState('');
    const [serverError, setServerError] = useState('');



    // Submit form
    const handleSubmit = async () => {
        // Handle Errors
        try {
            const response = dispatch(thunkAddReview({
                review: reviewText,
                stars
            }, currSpot.id));

            console.log("REVIEW RESPONSE", response);
        } catch (e) {
            setServerError(e.message);
        }

    }

    return (
        <div id='review-form-container'>
            <h1>How was your stay?</h1>
            {serverError.length > 0 && <p>{serverError}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    id='review-text'
                    placeholder='Leave your review here...'
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)} />
                <label htmlFor="stars">
                    <input
                        id='stars'
                        type="number"
                        min={1}
                        max={5}
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                    />
                    {"  Stars"}
                </label>
                <button disabled={reviewText.length < 10 || stars === ''}>Submit your review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal;
