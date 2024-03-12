import { useModal } from '../../context/Modal';

function OpenModalImage({
    modalComponent, // component to render inside the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    imageSrc
  }) {
    const { setModalContent } = useModal();

    const onClick = () => {
      setModalContent(modalComponent);
      if (typeof onButtonClick === "function") onButtonClick();
    };

    return <img id='modal-image' src={imageSrc} onClick={onClick}/>;
  }

  export default OpenModalImage;
