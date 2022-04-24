import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const StockSlider = ({ slides }) => {

    let email = localStorage.getItem("UserEmail");
    let navigate = useNavigate();

    useEffect(() => {
        if (email) {
          getUser();
        }
      }, []);
    
      const [user, setUser] = useState([]);
    
      const getUser = () => {
        const request = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        console.log(email);
        fetch("http://localhost:5000/api/user/" + email, request)
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      const getStock = (index,id) => {

        // const requestOptions = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     user: index,
        //     userId:id,
        //   }),
        // };
        // fetch("http://localhost:5000/api/register", requestOptions)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.status === "ok") {
        //       localStorage.setItem("StockImage", data.value.image);
        //       localStorage.setItem("StockPrice", data.value.price);
        //       setTimeout(() => {
        //         navigate(`stock/${index}`);
        //       }, 750);
              
        //     } else {
        //       alert("Something went wrong");
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
          
          navigate(`stock/${index}`);
        
      };
    

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='stock image' className='image' onClick={() => getStock(index,user._id)}/>
            )}
          </div>
          
        );
      
      })}
      
    </section>
    
  );
};

export default StockSlider;