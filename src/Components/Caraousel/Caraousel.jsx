import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Caraousel.module.css'
function ControlledCarousel({images, index, setIndex}) {
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
        {images.map((image) => (
            <Carousel.Item className={styles.itemDiv}>
                <img src={image.url} alt="" />
            </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ControlledCarousel;