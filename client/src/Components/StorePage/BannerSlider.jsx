import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';  
import '../../styles/Store.css'; 


const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/banner');
        setBanners(res.data);
      } catch (err) {
        console.error('Failed to load banners:', err);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false
  };

  return (
    <div  className="bannerContainer">
      
        {banners.map((banner) => (
          <div key={banner._id} className='Cards'>
            <img
              src={`http://localhost:5000${banner.imageUrl}`}
              alt="banner"
            />
          </div>
        ))}
     
    </div>
  );
};

export default BannerSlider;
