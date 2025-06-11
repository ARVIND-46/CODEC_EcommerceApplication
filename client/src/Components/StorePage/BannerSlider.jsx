import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

// Import slick slider styles only
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    slidesToScroll: 1
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Banner Slider</h2>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner._id}>
            <img
              src={`http://localhost:5000${banner.imageUrl}`}
              alt="banner"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
