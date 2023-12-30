import './CreateBookingForm.css'

function CreateBookingForm() {
    return (
        <div id='outer-container'>
            <form id='booking-details-form'>
                <h1>Request To Book</h1>
                <h2>Your Trip</h2>
                <h3>Dates</h3>
                <div id='date-selection-container'>
                <input type='date'></input>
                <p>-</p>
                <input type='date'></input>
                </div>
            </form>

            <div id='price-details-container'>

            </div>
        </div>
    )
}

export default CreateBookingForm;
