import successImg from '../images/success-icon.svg';
import errorImg from '../images/error-icon.svg';

function InfoTooltip({ onClose, isOpen, isSuccessRegistration, title, alt }) {

  return (isOpen && (
    <div className="popup-solution">
      <div className="overlay"></div>
      <div className="popup-solution__container">
        <img
          className="popup-solution__image"
          src={isSuccessRegistration ? successImg : errorImg}
          alt={alt} />
        <h2 className="popup-solution__title">{title}</h2>
      </div>
      <button
        onClick={onClose}
        className="popup-solution__close"
      ></button>
    </div>
  ))
}

export default InfoTooltip;
