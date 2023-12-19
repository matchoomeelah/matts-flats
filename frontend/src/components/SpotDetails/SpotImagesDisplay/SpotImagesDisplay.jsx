
function SpotImagesDisplay({ images }) {

    const mainImage = images.find(img => img.preview);
    const otherImages = images.filter(img => !img.preview);

    return (
        <div className='spot-images-container'>
            <div id='main-image-container'>
                <img src={`${mainImage.url}`} />
            </div>
            <div id='other-images-container'>
                {otherImages.map(image => {
                    return (
                        <div key={image.id} className='other-image'>
                            <img src={image.url} />
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default SpotImagesDisplay;
