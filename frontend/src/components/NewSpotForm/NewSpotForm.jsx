// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import './NewSpotForm.css';
// import { thunkCreateSpot } from '../../store/spots';
// import { validateForm } from './field-validation';
// import { useNavigate } from "react-router-dom";


// function NewSpotForm() {
//     const sessionUser = useSelector(state => state.session.user);
//     const [country, setCountry] = useState('');
//     const [streetAddress, setStreetAddress] = useState('');
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');
//     const [description, setDescription] = useState('');
//     const [spotName, setSpotName] = useState('');
//     const [price, setPrice] = useState('');
//     const [previewImage, setPreviewImage] = useState('');
//     const [otherImage1, setOtherImage1] = useState('');
//     const [otherImage2, setOtherImage2] = useState('');
//     const [otherImage3, setOtherImage3] = useState('');
//     const [otherImage4, setOtherImage4] = useState('');
//     const [errors, setErrors] = useState({});

//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     const handleSubmit = async (e) => {
//         //Prevent refresh
//         e.preventDefault();

//         setErrors({});

//         // Check if anything empty or too short
//         const formErrors = validateForm({ country, streetAddress, city, state, description, spotName, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4 });
//         console.log("FORM ERRORS", formErrors);
//         setErrors(formErrors);

//         if (Object.values(formErrors).length) {
//             return;
//         }

//         // Attempt to create spot and images
//         const spot = await dispatch(thunkCreateSpot({
//             ownerId: sessionUser.id,
//             address: streetAddress,
//             city,
//             state,
//             country,
//             lat: 0,
//             lng: 0,
//             name: spotName,
//             description,
//             price
//         }, [
//             previewImage,
//             otherImage1,
//             otherImage2,
//             otherImage3,
//             otherImage4
//         ]))
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if (data?.errors) {
//                     setErrors({ ...formErrors, ...data.errors });
//                 }
//                 console.log("DATA ERRORS", data.errors)
//             })

//         if (spot) {
//             navigate(`/spots/${spot.id}`);
//         }
//     }

//     return (
//         <div id='create-spot-div'>
//             <form id='create-spot-form' onSubmit={handleSubmit}>
//                 <h1 id='create-spot-heading'>Create a new Spot</h1>
//                 <h2 id="where-heading">{"Where's your place located?"}</h2>
//                 <p>{"Guests will only get your exact address once they've booked a reservation."}</p>
//                 <div>
//                     <div>
//                         <span>Country</span>
//                         {errors.country && <span className='error-message'>*{errors.country}</span>}
//                     </div>
//                     <input
//                         id="country"
//                         placeholder='Country'
//                         value={country}
//                         onChange={e => setCountry(e.target.value)}>
//                     </input>
//                 </div>
//                 <div>
//                     <div>
//                         <span>Street Address</span>
//                         {errors.address && <span className='error-message'>*{errors.address}</span>}
//                     </div>
//                     <input
//                         id="street-address"
//                         placeholder='Street Address'
//                         value={streetAddress}
//                         onChange={e => setStreetAddress(e.target.value)}>
//                     </input>
//                 </div>
//                 <div id="city-state-container">
//                     <div>
//                         <span>City {errors.city && <span className='error-message'>*{errors.city}</span>}</span>
//                         <input
//                             id="city"
//                             placeholder='City'
//                             value={city}
//                             onChange={e => setCity(e.target.value)}>
//                         </input>
//                     </div>
//                     <div>

//                         <span>State {errors.state && <span className='error-message'>*{errors.state}</span>}</span>
//                         <input
//                             id="state"
//                             placeholder='State'
//                             value={state}
//                             onChange={e => setState(e.target.value)}>
//                         </input>
//                     </div>
//                 </div>

//                 <div className='create-spot-horizontal-line'></div>

//                 <h2> Describe your place to guests</h2>
//                 <p>{"Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood."}</p>

//                 <textarea
//                     id='spot-description-textarea'
//                     placeholder='Please write at least 30 characters'
//                     value={description}
//                     onChange={e => setDescription(e.target.value)}
//                 >
//                 </textarea>
//                 <div>
//                     {errors.description && <span className='error-message'>*{errors.description}</span>}
//                 </div>

//                 <div className='create-spot-horizontal-line'></div>

//                 <h2>Create a title for your spot</h2>
//                 <p>{"Catch guests' attention with a spot title that highlights what makes your place special."}</p>
//                 <input
//                     id='spot-name'
//                     placeholder='Name of your spot'
//                     value={spotName}
//                     onChange={e => setSpotName(e.target.value)}>
//                 </input>
//                 <div>
//                     {errors.spotName && <span className='error-message'>*{errors.spotName}</span>}
//                 </div>

//                 <div className='create-spot-horizontal-line'></div>

//                 <h2>Set a base price for your spot</h2>
//                 <p>{"Competitive pricing can help your listing stand out and rank higher in search results."}</p>
//                 <label htmlFor='price'>
//                     <div id='price-container'>
//                         <span>{"$ "}</span>
//                         <input
//                             id='price'
//                             placeholder='Price per night (USD)'
//                             value={price}
//                             onChange={e => setPrice(e.target.value)}>
//                         </input>
//                     </div>
//                 </label>
//                 <div>
//                     {errors.price && <span className='error-message'>*{errors.price}</span>}
//                 </div>

//                 <div className='create-spot-horizontal-line'></div>

//                 <h2>Liven up your spot with photos</h2>
//                 <p>{"Submit a link to at least one photo to publish your spot."}</p>
//                 <input
//                     id='preview-image'
//                     placeholder='Preview Image URL'
//                     value={previewImage}
//                     onChange={e => setPreviewImage(e.target.value)}>
//                 </input>
//                 {errors.previewImage && <p className='error-message'>*{errors.previewImage}</p>}
//                 <input
//                     id='other-image-1'
//                     placeholder='Image URL'
//                     value={otherImage1}
//                     onChange={e => setOtherImage1(e.target.value)}>
//                 </input>
//                 {errors.otherImage1 && <p className='error-message'>*{errors.otherImage1}</p>}

//                 <input
//                     id='other-image-2'
//                     placeholder='Image URL'
//                     value={otherImage2}
//                     onChange={e => setOtherImage2(e.target.value)}>
//                 </input>
//                 {errors.otherImage2 && <p className='error-message'>*{errors.otherImage2}</p>}

//                 <input
//                     id='other-image-3'
//                     placeholder='Image URL'
//                     value={otherImage3}
//                     onChange={e => setOtherImage3(e.target.value)}>
//                 </input>
//                 {errors.otherImage3 && <p className='error-message'>*{errors.otherImage3}</p>}

//                 <input
//                     id='other-image-4'
//                     placeholder='Image URL'
//                     value={otherImage4}
//                     onChange={e => setOtherImage4(e.target.value)}>
//                 </input>
//                 {errors.otherImage4 && <p className='error-message'>*{errors.otherImage4}</p>}


//                 <div className='create-spot-horizontal-line'></div>

//                 <button id='create-spot-submit-button'>Create Spot</button>
//             </form>
//         </div>
//     )
// }

// export default NewSpotForm;

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateSpot } from '../../store/spots';
import { validateForm } from './field-validation';
import { useNavigate } from "react-router-dom";
import './NewSpotForm.css';


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
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        //Prevent refresh
        e.preventDefault();

        // Don't allow submission without user logged in
        if (!sessionUser) {
            navigate('/');
        }

        setErrors({});


        // Check if anything empty or too short
        const formErrors = validateForm({ country, streetAddress, city, state, description, spotName, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4 });
        console.log("FORM ERRORS", formErrors);
        setErrors(formErrors);

        if (Object.values(formErrors).length) {
            return;
        }

        // Attempt to create spot and images
        const spot = await dispatch(thunkCreateSpot({
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
                    setErrors({ ...formErrors, ...data.errors });
                }
                console.log("DATA ERRORS", data.errors)
            })

        if (spot) {
            navigate(`/spots/${spot.id}`);
        }
    }

    if (!sessionUser) {
        // navigate('/');
        return null;
    }

    return (
        <div id='create-spot-div'>
            <form id='create-spot-form' onSubmit={handleSubmit}>
                <h1 id='create-spot-heading'>Create a new Spot</h1>
                <h2 id="where-heading">{"Where's your place located?"}</h2>
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
                        onChange={e => { if (country.length < 30 && e.target.value.length < 30) { setCountry(e.target.value) } else setCountry(e.target.value.substring(0, 31)) }}>
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
                <div id="city-state-container">
                    <div>
                        <span>City {errors.city && <span className='error-message'>*{errors.city}</span>}</span>
                        <input
                            id="city"
                            placeholder='City'
                            value={city}
                            onChange={e => { if (city.length < 30 && e.target.value.length < 30) { setCity(e.target.value) } else setCity(e.target.value.substring(0, 31)) }}>
                        </input>
                    </div>
                    <div>

                        <span>State {errors.state && <span className='error-message'>*{errors.state}</span>}</span>

                        <input
                            id="state"
                            placeholder='State'
                            value={state}
                            onChange={e => { if (state.length < 30 && e.target.value.length < 30) { setState(e.target.value) } else setState(e.target.value.substring(0, 31)) }}>
                        </input>
                    </div>
                </div>

                <div className='create-spot-horizontal-line'></div>

                <h2> Describe your place to guests</h2>
                <p>{"Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood."}</p>

                <textarea
                    id='spot-description-textarea'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={e => { if (description.length < 5000 && e.target.value.length < 5000) { setDescription(e.target.value) } setDescription(e.target.value.substring(0, 5001)) }}
                >
                </textarea>
                <div>
                    {errors.description && <span className='error-message'>*{errors.description}</span>}
                </div>

                <div className='create-spot-horizontal-line'></div>

                <h2>Create a title for your spot</h2>
                <p>{"Catch guests' attention with a spot title that highlights what makes your place special."}</p>
                <input
                    id='spot-name'
                    placeholder='Name of your spot'
                    value={spotName}
                    onChange={e => { if (spotName.length < 30 && e.target.value.length < 30) { setSpotName(e.target.value) } else setSpotName(e.target.value.substring(0, 31)) }}>
                </input>
                <div>
                    {errors.spotName && <span className='error-message'>*{errors.spotName}</span>}
                </div>

                <div className='create-spot-horizontal-line'></div>

                <h2>Set a base price for your spot</h2>
                <p>{"Competitive pricing can help your listing stand out and rank higher in search results."}</p>
                <label htmlFor='price'>
                    <div id='price-container'>
                        <span>{"$ "}</span>
                        <input
                            id='price'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={e => { if (price.length < 9 && e.target.value.length < 9) { setPrice(e.target.value) } else setPrice(e.target.value.substring(0, 9)) }}>
                        </input>
                    </div>
                </label>
                <div>
                    {errors.price && <span className='error-message'>*{errors.price}</span>}
                </div>

                <div className='create-spot-horizontal-line'></div>

                <h2>Liven up your spot with photos</h2>
                <p>{"Submit a link to at least one photo to publish your spot."}</p>
                <input
                    id='preview-image'
                    placeholder='Preview Image URL'
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}>
                </input>
                <div>
                    {errors.previewImage && <span className='error-message'>*{errors.previewImage}</span>}
                </div>
                <input
                    id='other-image-1'
                    placeholder='Image URL'
                    value={otherImage1}
                    onChange={e => setOtherImage1(e.target.value)}>
                </input>
                <div>
                    {errors.otherImage1 && <span className='error-message'>*{errors.otherImage1}</span>}
                </div>

                <input
                    id='other-image-2'
                    placeholder='Image URL'
                    value={otherImage2}
                    onChange={e => setOtherImage2(e.target.value)}>
                </input>
                <div>
                    {errors.otherImage2 && <span className='error-message'>*{errors.otherImage2}</span>}
                </div>

                <input
                    id='other-image-3'
                    placeholder='Image URL'
                    value={otherImage3}
                    onChange={e => setOtherImage3(e.target.value)}>
                </input>
                <div>
                    {errors.otherImage3 && <span className='error-message'>*{errors.otherImage3}</span>}
                </div>

                <input
                    id='other-image-4'
                    placeholder='Image URL'
                    value={otherImage4}
                    onChange={e => setOtherImage4(e.target.value)}>
                </input>
                <div>
                    {errors.otherImage4 && <span className='error-message'>*{errors.otherImage4}</span>}
                </div>

                <div id='image-previews'>
                    {previewImage && <img src={`${previewImage}`}></img>}
                    {otherImage1 && <img src={`${otherImage1}`}></img>}
                    {otherImage2 && <img src={`${otherImage2}`}></img>}
                    {otherImage3 && <img src={`${otherImage3}`}></img>}
                    {otherImage4 && <img src={`${otherImage4}`}></img>}
                </div>

                <div className='create-spot-horizontal-line'></div>

                <button id='create-spot-submit-button'>Create Spot</button>
            </form>
        </div>
    )
}

export default NewSpotForm;
