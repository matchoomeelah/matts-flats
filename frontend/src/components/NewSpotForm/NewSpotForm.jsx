import { useState } from 'react';
import './NewSpotForm.css';


function NewSpotForm() {
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


    const handleSubmit = () => {

    }

    return (
        <div>
            <h1>Create a new Spot</h1>
            <form onSubmit={handleSubmit}>
                <h2>{"Where's your place located?"}</h2>
                <p>{"Guests will only get your exact address once they've booked a reservation."}</p>
                <div>
                    <div>Country</div>
                    <input
                        id="country"
                        placeholder='Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}>
                    </input>
                </div>
                <div>
                    <div>
                        Street Address
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
                        City
                    </div>
                    <input
                        id="city"
                        placeholder='City'
                        value={city}
                        onChange={e => setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                    <div>State</div>
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

                <div className='horizontal-line'></div>

                <h2>Liven up your spot with photos</h2>
                <input
                    id='preview-image'
                    placeholder='Preview Image URL'
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}>
                </input>
                <input
                    id='other-image-1'
                    placeholder='Image URL'
                    value={otherImage1}
                    onChange={e => setOtherImage1(e.target.value)}>
                </input>
                <input
                    id='other-image-2'
                    placeholder='Image URL'
                    value={otherImage2}
                    onChange={e => setOtherImage2(e.target.value)}>
                </input>
                <input
                    id='other-image-3'
                    placeholder='Image URL'
                    value={otherImage3}
                    onChange={e => setOtherImage3(e.target.value)}>
                </input>
                <input
                    id='other-image-4'
                    placeholder='Image URL'
                    value={otherImage4}
                    onChange={e => setOtherImage4(e.target.value)}>
                </input>

                <div className='horizontal-line'></div>

                <button id='submit-button'>Create Spot</button>
            </form>
        </div>
    )
}

export default NewSpotForm;
