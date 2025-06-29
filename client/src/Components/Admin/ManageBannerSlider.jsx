import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/AdminDashboard.css'; 

const ManageBannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/banner');
      setBanners(res.data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleUpload = async () => {
    if (!image) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post("http://localhost:5000/api/admin/banner/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImage(null);
      fetchBanners();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/banner/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="manage-banner-container">
      <h2 className="manage-banner-heading">🖼️ Manage Banner Slider</h2>

      <div className="upload-section">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input"
        />
        <button onClick={handleUpload} className="upload-button">
          Upload Banner
        </button>
      </div>

      <div className="banner-list">
        {banners.length > 0 ? banners.map((banner) => (
          <div key={banner._id} className="banner-card">
            <img
              src={`http://localhost:5000${banner.imageUrl}`}
              alt="Banner"
              className="banner-image"
            />
            <button
              onClick={() => handleDelete(banner._id)}
              className="delete-button"
            >
              ❌ Delete
            </button>
          </div>
        )) : (
          <p className="no-banner">No banners uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageBannerSlider;
