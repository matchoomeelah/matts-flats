import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { thunkEditSpot, thunkGetSpotById } from '../../store/spots';
import { validateForm } from '../NewSpotForm/field-validation'
import './UpdateSpotForm.css';


function UpdateSpotForm() {
    const sessionUser = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.currentSpot);
    const { spotId } = useParams();

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
    const navigate = useNavigate();


    // Load the current spot into store
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
    }, [dispatch, spotId]);


    // Populate the data from the spot into the fields
    useEffect(() => {
        if (currentSpot) {
            console.log("CURRENT SPOT: ", currentSpot);
            setCountry(currentSpot.country);
            setStreetAddress(currentSpot.address);
            setCity(currentSpot.city);
            setState(currentSpot.state);
            setDescription(currentSpot.description);
            setSpotName(currentSpot.name);
            setPrice(currentSpot.price);

            // Images
            const previewImage = currentSpot.SpotImages.find(img => img.preview === true).url;
            setPreviewImage(previewImage);

            // Add other images
            const otherImages = currentSpot.SpotImages.filter(img => img.preview === false);

            // Inefficient as can be
            if (otherImages.length) {
                setOtherImage1(otherImages.shift().url);
            } else {
                setOtherImage1('');
            }

            if (otherImages.length) {
                setOtherImage2(otherImages.shift().url);
            } else {
                setOtherImage1('');
            }

            if (otherImages.length) {
                setOtherImage3(otherImages.shift().url);
            } else {
                setOtherImage1('');
            }

            if (otherImages.length) {
                setOtherImage4(otherImages.shift().url);
            } else {
                setOtherImage1('');
            }
        }
    }, [currentSpot])

    // Keep from trying to render too soon
    if (!currentSpot) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const formErrors = validateForm({ country, streetAddress, city, state, description, spotName, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4 });
        console.log("FORM ERRORS", formErrors);
        setErrors(formErrors);

        if (Object.values(errors).length) {
            return;
        }

        // Attempt to create spot and images
        const spot = await dispatch(thunkEditSpot({
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
        }, spotId))
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(data.errors);
                }
                console.log("DATA ERRORS", data.errors)
            })

        // console.log("SPOTID: ", spot.id);
        if (spot) {
            navigate(`/spots/${spot.id}`);
        }
    }

    return (
        <div id='create-spot-div'>
            <form id='update-spot-form' onSubmit={handleSubmit}>
                <h1>Update your Spot</h1>
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
                <div className='update-spot-horizontal-line'></div>
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

                <div className='update-spot-horizontal-line'></div>


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

                <div className='update-spot-horizontal-line'></div>

                <h2>Set a base price for your spot</h2>
                <p>{"Competitive pricing can help your listing stand out and rank higher in search results."}</p>
                {/* <label htmlFor='price'>{"$ "}
                    <input
                        id='price'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={e => setPrice(e.target.value)}>
                    </input>
                </label> */}
                <label htmlFor='price'>
                    <div id='price-container'>
                        <span>{"$ "}</span>
                        <input
                            id='price'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={e => setPrice(e.target.value)}>
                        </input>
                    </div>
                </label>
                <div>
                    {errors.price && <span className='error-message'>*{errors.price}</span>}
                </div>

                <div className='update-spot-horizontal-line'></div>

                <button id='update-spot-submit-button'>Create Spot</button>
            </form>
        </div>
    )
}

export default UpdateSpotForm;
