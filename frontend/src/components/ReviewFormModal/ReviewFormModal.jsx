import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import './ReviewForm.css'
import { thunkAddReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';


function ReviewFormModal() {
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots.currentSpot);
    const {closeModal} = useModal();


    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState('');
    const [serverError, setServerError] = useState('');



    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle Errors
        try {
            dispatch(thunkAddReview({
                review: reviewText,
                stars
            }, currSpot.id)).then(closeModal);

            // console.log("REVIEW RESPONSE", response);
        } catch (err) {
            setServerError(err.message);
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
