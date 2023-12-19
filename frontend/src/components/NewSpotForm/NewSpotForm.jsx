import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NewSpotForm.css';
import { thunkCreateSpot } from '../../store/spots';
import { validateForm } from './field-validation';


function NewSpotForm() {
    const sessionUser = useSelector(state => state.session.user);
    const [country, setCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [spotName, setSpotName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [otherImage1, setOtherImage1] = useState('');
    const [otherImage2, setOtherImage2] = useState('');
    const [otherImage3, setOtherImage3] = useState('');
    const [otherImage4, setOtherImage4] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const formErrors = validateForm({country, streetAddress, city, state, description, spotName, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4});
        console.log("FORM ERRORS", formErrors);
        setErrors(formErrors);

        if (Object.values(errors).length) {
            return;
        }

        // Attempt to create spot and images
        dispatch(thunkCreateSpot({
            ownerId: sessionUser.id,
            address: streetAddress,
            city,
            state,
            country,
            lat: 0,
            lng: 0,
            name: spotName,
            description,
            price
        }, [
            previewImage,
            otherImage1,
            otherImage2,
            otherImage3,
            otherImage4
        ]))
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(prevErrors => { return { ...prevErrors, ...data.errors } });
                }
            })
    }

    return (
        <div id='create-spot-div'>
            <h1>Create a new Spot</h1>
            <form onSubmit={handleSubmit}>
                <h2>{"Where's your place located?"}</h2>
                <p>{"Guests will only get your exact address once they've booked a reservation."}</p>
                <div>
                    <div>
                        <span>Country</span>
                        {errors.country && <span className='error-message'>*{errors.country}</span>}
                    </div>
                    <input
                        id="country"
                        placeholder='Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}>
                    </input>
                </div>
                <div>
                    <div>
                        <span>Street Address</span>
                        {errors.address && <span className='error-message'>*{errors.address}</span>}
                    </div>
                    <input
                        id="street-address"
                        placeholder='Street Address'
                        value={streetAddress}
                        onChange={e => setStreetAddress(e.target.value)}>
                    </input>
                </div>
                <div>
                    <div>
                        <span>City</span>
                        {errors.city && <span className='error-message'>*{errors.city}</span>}
                    </div>
                    <input
                        id="city"
                        placeholder='City'
                        value={city}
                        onChange={e => setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                <div>
                        <span>State</span>
                        {errors.state && <span className='error-message'>*{errors.state}</span>}
                    </div>
                    <input
                        id="state"
                        placeholder='State'
                        value={state}
                        onChange={e => setState(e.target.value)}>
                    </input>
                </div>
                <div className='horizontal-line'></div>
                <h2> Describe your place to guests</h2>
                <p>{"Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood."}</p>

                <div>
                        {errors.description && <span className='error-message'>*{errors.description}</span>}
                </div>
                <textarea
                    id='spot-description-textarea'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                >
                </textarea>

                <div className='horizontal-line'></div>


                <h2>Create a title for your spot</h2>
                <p>{"Catch guests' attention with a spot title that highlights what makes your place special."}</p>
                <input
                    id='spot-name'
                    placeholder='Name of your spot'
                    value={spotName}
                    onChange={e => setSpotName(e.target.value)}>
                </input>
                <div>
                        {errors.spotName && <span className='error-message'>*{errors.spotName}</span>}
                </div>

                <div className='horizontal-line'></div>

                <h2>Set a base price for your spot</h2>
                <p>{"Competitive pricing can help your listing stand out and rank higher in search results."}</p>
                <label htmlFor='price'>{"$ "}
                    <input
                        id='price'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={e => setPrice(e.target.value)}>
                    </input>
                </label>
                <div>
                        {errors.price && <span className='error-message'>*{errors.price}</span>}
                </div>

                <div className='horizontal-line'></div>

                <h2>Liven up your spot with photos</h2>
                <input
                    id='preview-image'
                    placeholder='Preview Image URL'
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}>
                </input>
                {errors.previewImage && <p className='error-message'>*{errors.previewImage}</p>}
                <input
                    id='other-image-1'
                    placeholder='Image URL'
                    value={otherImage1}
                    onChange={e => setOtherImage1(e.target.value)}>
                </input>
                {errors.otherImage1 && <p className='error-message'>*{errors.otherImage1}</p>}

                <input
                    id='other-image-2'
                    placeholder='Image URL'
                    value={otherImage2}
                    onChange={e => setOtherImage2(e.target.value)}>
                </input>
                {errors.otherImage2 && <p className='error-message'>*{errors.otherImage2}</p>}

                <input
                    id='other-image-3'
                    placeholder='Image URL'
                    value={otherImage3}
                    onChange={e => setOtherImage3(e.target.value)}>
                </input>
                {errors.otherImage3 && <p className='error-message'>*{errors.otherImage3}</p>}

                <input
                    id='other-image-4'
                    placeholder='Image URL'
                    value={otherImage4}
                    onChange={e => setOtherImage4(e.target.value)}>
                </input>
                {errors.otherImage4 && <p className='error-message'>*{errors.otherImage4}</p>}


                <div className='horizontal-line'></div>

                <button id='submit-button'>Create Spot</button>
            </form>
        </div>
    )
}

export default NewSpotForm;
