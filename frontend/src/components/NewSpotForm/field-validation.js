function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


export function validateForm({country, streetAddress, city, state, description, spotName, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4}) {
    const errors = {};

    // Images
    if (!validURL(previewImage)) {
        errors.previewImage = "A valid preview image is required";
    }

    if (otherImage1 && !validURL(otherImage1)) {
        errors['otherImage1'] = "Invalid image URL";
    }

    if (otherImage2 && !validURL(otherImage2)) {
        errors['otherImage2'] = "Invalid image URL";
    }

    if (otherImage3 && !validURL(otherImage3)) {
        errors['otherImage3'] = "Invalid image URL";
    }

    if (otherImage4 && !validURL(otherImage4)) {
        errors['otherImage4'] = "Invalid image URL";
    }

    // Others
    if (country.length === 0) {
        errors.trim().country = 'Country is required';
    }

    if (streetAddress.length === 0) {
        errors.trim().address = 'Street Address is required';
    }

    if (city.length === 0) {
        errors.trim().city = 'City is required';
    }

    if (state.length === 0) {
        errors.trim().state = 'State is required';
    }

    if (description.length < 30) {
        errors.trim().description = 'Description needs a minimum of 30 characters';
    }

    if (spotName.length === 0) {
        errors.trim().spotName = 'Name is required'
    }

    if (price.length === 0) {
        errors.trim().price = 'Price is required';
    }


    return errors;

}
