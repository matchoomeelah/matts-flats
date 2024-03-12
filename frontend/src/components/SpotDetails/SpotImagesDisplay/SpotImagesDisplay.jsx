import ImageModal from "../../ImageModal/ImageModal";
import OpenModalImage from "../../OpenModalImage/OpenModalImage";

function SpotImagesDisplay({ images }) {

    const mainImage = images.find(img => img.preview);
    const otherImages = images.filter(img => !img.preview);

    return (
        <div className='spot-images-container'>
            <div id='main-image-container'>
                {/* <img src={`${mainImage.url}`} /> */}
                <OpenModalImage modalComponent={<ImageModal spotImages={images} index={0} />} imageSrc={`${mainImage.url}`} />
            </div>
            <div id='other-images-container'>
                {otherImages.map((image, i) => {
                    console.log("i:", i)
                    return (
                        <div key={image.id} className='other-image'>
                            {/* <img src={image.url} /> */}
                            <OpenModalImage modalComponent={<ImageModal spotImages={images} index={i+1} />} imageSrc={`${image.url}`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default SpotImagesDisplay;
