import { useState } from 'react';
// import { useModal } from '../../context/Modal';
import './ImageModal.css';


function ImageModal({spotImages, index}) {
    // const { closeModal } = useModal();

    const [ind, setInd] = useState(index)

    const backImage = () => {
        setInd((ind - 1 + spotImages.length) % spotImages.length);
    }

    const forwardImage = () => {
        setInd((ind + 1 + spotImages.length) % spotImages.length);
    }

    console.log(spotImages)
    console.log("ind: ", ind)

    return (
        <div id="image-modal">
            <div id="image-modal-content">
                <button onClick={backImage}>{"<"}</button>
                <img src={spotImages[ind].url} />
                <button onClick={forwardImage}>{">"}</button>
            </div>
        </div>
    )
}

export default ImageModal;
