import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productcard/ProductCard';
import BlogCard from '../../components/blogcard/BlogCard';
import { Link } from 'react-router-dom';
import './home.css';
import PreLoader from '../../components/preloader/PreLoader';

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://demotestmern.azurewebsites.net/api/products/');
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Get only the first 4 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://demotestmern.azurewebsites.net/api/blogs/');
        const data = await response.json();
        setBlogs(data.slice(0, 3)); // Get only the first 4 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.swipe-up');

    // Create an Intersection Observer to detect when an element is in view
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add the 'visible' class when the element is in view
          observer.unobserve(entry.target); // Stop observing the element once it's in view
        }
      });
    }, {
      threshold: 0.2, // Trigger the animation when 20% of the element is visible
    });

    elements.forEach(element => {
      observer.observe(element); // Start observing each element with the '.swipe-up' class
    });

    return () => {
      observer.disconnect(); // Clean up the observer on component unmount
    };
  }, []);

  useEffect(() => {
    // Remove preloader after 3 seconds
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  // if (loading) {
  //   return <PreLoader />;
  // }

  return (
    <div className='home'>
      <div className="hero section con1 swipe-up">
        <img src="https://images.unsplash.com/photo-1548610762-7c6afe24c261?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="about section con1 swipe-up">
        <div className="about-head">
          <div className="section_centre_title">
            About Us
          </div>
          <div className="section_centre_subtitle">
            Order now and appreciate the quality
          </div>
        </div>

        <div className="about-items">
          <div className="about-item">
            <div className="about-item-i">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="about-item-title">
              Large Assortment
            </div>
            <div className="about-item-subtitle">
              we offer many different types of products with fewer variations in each category.
            </div>
          </div>
          <div className="about-item">
            <div className="about-item-i">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="about-item-title">
              Large Assortment
            </div>
            <div className="about-item-subtitle">
              we offer many different types of products with fewer variations in each category.
            </div>
          </div>
          <div className="about-item">
            <div className="about-item-i">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="about-item-title">
              Large Assortment
            </div>
            <div className="about-item-subtitle">
              we offer many different types of products with fewer variations in each category.
            </div>
          </div>
        </div>
      </div>
      <div className="categories section con1 swipe-up">
        <div className="cat-head">
          <div className="section_centre_title">
            Categories
          </div>
          <div className="section_centre_subtitle">
            Find what you are looking for
          </div>
        </div>

        <div className="cat-items">
          {['Cleanse', 'Treat', 'Protect'].map((category) => (
            <Link to={`/shop?category=${category}`} className="cat-item" key={category}>
              <div className="cat-item-img">
                <img src="https://images.unsplash.com/photo-1548610762-7c6afe24c261?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={category} />
              </div>
              <div className="cat-item-title">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* <div className="hero section con1">
        <img src="https://images.unsplash.com/photo-1548610762-7c6afe24c261?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div> */}

      <div className="home-products section con1 swipe-up">
        <div className="home-pro-head">
          <div className="section_left_title">
            Browse Our <strong>Products</strong>
          </div>
          <div className="view-all-btn">
            <span>View All</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <hr />
        <div className="home-products-con">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
      <div className="home-blog section con1 swipe-up">
        <div className="home-pro-head">
          <div className="section_left_title">
            Explore More About  <strong>Skincare</strong>
          </div>
          <div className="view-all-btn">
            <span>View All</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <hr />
        <div className="home-blog-con">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
      <div className="home-testimonials section con1 swipe-up">
        <div className="home-pro-head">
          <div className="section_left_title">
            Our Happy  <strong>Customers</strong>
          </div>
        </div>
        <hr />
        <div className="home-testimonials-cards">
          <div className="h-testimonial-card">
            <p className='h-testimonial-stars'>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </p>
            <p className='h-testimonial-name'>lorem ipsum</p>
            <p className='h-testimonial-review'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, beatae facilis. Praesentium, vitae nulla doloribus ipsam eius expedita ad nisi veritatis optio sapiente reiciendis, asperiores itaque enim illum ut eligendi.</p>
          </div>
          <div className="h-testimonial-card">
            <p className='h-testimonial-stars'>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </p>
            <p className='h-testimonial-name'>lorem ipsum</p>
            <p className='h-testimonial-review'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, beatae facilis. Praesentium, vitae nulla doloribus ipsam eius expedita ad nisi veritatis optio sapiente reiciendis, asperiores itaque enim illum ut eligendi.</p>
          </div>
          <div className="h-testimonial-card">
            <p className='h-testimonial-stars'>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </p>
            <p className='h-testimonial-name'>lorem ipsum</p>
            <p className='h-testimonial-review'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, beatae facilis. Praesentium, vitae nulla doloribus ipsam eius expedita ad nisi veritatis optio sapiente reiciendis, asperiores itaque enim illum ut eligendi.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home