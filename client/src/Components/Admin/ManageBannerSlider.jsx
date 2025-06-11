import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div style={styles.container}>
      <h2 style={styles.heading}>🖼️ Manage Banner Slider</h2>

      <div style={styles.uploadSection}>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.fileInput}
        />
        <button onClick={handleUpload} style={styles.uploadButton}>Upload Banner</button>
      </div>

      <div style={styles.bannerList}>
        {banners.length > 0 ? banners.map((banner) => (
          <div key={banner._id} style={styles.bannerCard}>
            <img
              src={`http://localhost:5000${banner.imageUrl}`}
              alt="Banner"
              style={styles.bannerImage}
            />
            <button onClick={() => handleDelete(banner._id)} style={styles.deleteButton}>
              ❌ Delete
            </button>
          </div>
        )) : (
          <p style={styles.noBanner}>No banners uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

// ✅ Basic CSS styles in JS object
const styles = {
  container: {
    padding: '30px',
    fontFamily: 'sans-serif'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  uploadSection: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  fileInput: {
    fontSize: '16px'
  },
  uploadButton: {
    padding: '8px 16px',
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  bannerList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  },
  bannerCard: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    width: '320px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#c62828',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  noBanner: {
    color: '#999',
    fontStyle: 'italic'
  }
};

export default ManageBannerSlider;
