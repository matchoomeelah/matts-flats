import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { thunkAddReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { validURL } from '../CreateSpotForm/field-validation';

import './CreateReviewForm.css'


function CreateReviewFormModal() {
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots.currentSpot);
    const { closeModal } = useModal();

    const [reviewText, setReviewText] = useState('');
    const [stars, setStars] = useState('');
    const [serverError, setServerError] = useState('');
    const [imageInputs, setImageInputs] = useState([]);
    const [imageErrors, setImageErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verify image inputs, if any
        const imageErrorObject = verifyImages(imageInputs);
        setImageErrors(imageErrorObject);

        // Handle Errors
        if (Object.keys(imageErrorObject).length) {
            return;
        }

        try {
            dispatch(thunkAddReview({
                review: reviewText,
                stars
            }, imageInputs, currSpot.id)).then(closeModal);
        } catch (err) {
            setServerError(err.message);
        }

    }

    // Verify Image Inputs
    const verifyImages = (images) => {
        const errors = {};

        if (images[0] && !validURL(images[0])) {
            errors.image0 = "Invalid image URL";
        }

        if (images[1] && !validURL(images[1])) {
            errors.image1 = "Invalid image URL";
        }

        if (images[2] && !validURL(images[2])) {
            errors.image2 = "Invalid image URL";
        }

        if (images[3] && !validURL(images[3])) {
            errors.image3 = "Invalid image URL";
        }

        if (images[4] && !validURL(images[4])) {
            errors.image4 = "Invalid image URL";
        }

        return errors;
    }

    // Add input line for images
    const addImageInput = (e) => {
        e.preventDefault();
        if (imageInputs.length < 5) {
            setImageInputs([...imageInputs, '']);
        }
    }

    return (
        <div id='review-form-container'>
            <h1 id="review-form-heading">How was your stay?</h1>
            {serverError.length > 0 && <p>{serverError}</p>}
            <form id='review-form' onSubmit={handleSubmit}>
                <textarea
                    id='review-comment-area'
                    placeholder='Leave your review here...'
                    value={reviewText}
                    onChange={e => {
                        if (reviewText.length < 5000 && e.target.value.length < 5000){
                            setReviewText(e.target.value)
                        }
                        else {
                            setReviewText(e.target.value.substring(0, 5001));
                        }
                    }} />

                <button id='add-image-button' onClick={addImageInput}>+ Add Image</button>
                {imageInputs.map((img, i) => {
                    return (
                        <div key={i} className='image-input-div'>
                            <input
                                placeholder='Image URL'
                                value={imageInputs[i]}
                                onChange={(e) => {
                                    imageInputs[i] = e.target.value;
                                    setImageInputs([...imageInputs]);
                                }}>
                            </input>
                            {imageErrors[`image${i}`]}
                        </div>

                    )
                })}

                <ul className="rating-list">
                    <li id='stars-word-list-item'>Stars</li>
                    <li onClick={() => setStars(5)}><i className={`fa fa-star ${stars >= 5 ? "filled" : "empty"}`} title="Rate 5"></i></li>
                    <li onClick={() => setStars(4)}><i className={`fa fa-star ${stars >= 4 ? "filled" : "empty"}`} title="Rate 4"></i></li>
                    <li onClick={() => setStars(3)}><i className={`fa fa-star ${stars >= 3 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(2)}><i className={`fa fa-star ${stars >= 2 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(1)}><i className={`fa fa-star ${stars >= 1 ? "filled" : "empty"}`}></i></li>
                </ul>

                <button id='form-review-submit-button' disabled={reviewText.length < 10 || stars === ''}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReviewFormModal;
