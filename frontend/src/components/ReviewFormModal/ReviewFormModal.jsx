import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import './ReviewForm.css'
import { thunkAddReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';


function ReviewFormModal() {
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots.currentSpot);
    const { closeModal } = useModal();


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
                    id='review-comment-area'
                    placeholder='Leave your review here...'
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)} />
                <div>
                    <ul className="rating-list">
                        <li id='stars-word-list-item'>Stars</li>
                        <li onClick={() => setStars(5)}><i className="fa fa-star empty" title="Rate 5"></i></li>
                        <li onClick={() => setStars(4)}><i className="fa fa-star empty" title="Rate 4"></i></li>
                        <li onClick={() => { setStars(3); console.log(stars) }}><i className="fa fa-star empty" title="Rate 3"></i></li>
                        <li onClick={() => setStars(2)}><i className="fa fa-star empty" title="Rate 2"></i></li>
                        <li onClick={() => setStars(1)}><i className="fa fa-star empty" title="Rate 1"></i></li>
                    </ul>
                </div>

                <button disabled={reviewText.length < 10 || stars === ''}>Submit your review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal;
