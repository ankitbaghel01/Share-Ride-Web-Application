import React from 'react';
import Navbar from '../Nav/Nav';
import './Home.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OurImpact from '../OurImpact/OurImpact';
import Testimonial from '../Tostinomial/Tostinomial';
import { useNavigate } from 'react-router-dom';
import Captain from '../../Captain/Captain';

const home = () => {
  const navigate = useNavigate();

  const handleCaptain = () => {
    // Navigate to a different route
    navigate('/Captain');
  };


  return (
    <div className='container'>
      <div className="left">
        <Navbar />
      </div>

      <div className="right context">
        <div className='front'>

          <img src='https://media.istockphoto.com/id/518707448/photo/portrait-of-happy-young-couple-on-scooter-enjoying-road-trip.webp?s=1024x1024&w=is&k=20&c=EPyna2zEfv-LImepAM6yuay5W45-NKk5NtTgHVKVJLw=' alt='img' className='front-img' />

          <div className='text-front'>
            <h1>Welcome To ShearRiding</h1>

            <h6>
              Hello user Welcome to ShearRiding. Use this application and reach out your destination on time and also save your time
            </h6>
            <div className='front-btn'>
              <Button variant="warning" onClick={handleCaptain} >Captain</Button>{' '}
              <Button variant="warning">Travler</Button>{' '}

            </div>

          </div>
        </div>
        <br />
        <div className='split-screen'>
          <div className='left-section'>
            <img src='https://media.istockphoto.com/id/1217689278/photo/motorcyclist-with-his-helmet.jpg?s=612x612&w=0&k=20&c=USWm1OzLmUwX2Ak7xJHapjamv-BcXZzBUlHzszd0qd0=' alt='sefty-img' />

          </div>
          <div className='right-section'>
            <h1>Safety for all</h1>
            <br />
            <h6>We have crossed 10 million happy customers and 100 million rides. Rapido is here to revolutionize intra-city travel as we bring you redefined comfort & convenience with our disruptive service model.</h6>
            <Button variant="warning">Know More</Button>{' '}
          </div>

        </div>


        <br />
        <div className='Main-screen'>
          <div className='left-Main'>
            <div className='Know-text'>
            <h1>Know Us Better</h1>
            <br />
            <h6>We have crossed 10 million happy customers and 100 million rides. Rapido is here to revolutionize intra-city travel as we bring you redefined comfort & convenience with our disruptive service model.</h6>
            <Button variant="warning">Know More</Button>{' '}
            </div>
          </div>
          <div className='right-Main'>
            <img src='https://thumbs.dreamstime.com/b/victory-signs-leather-gloves-two-laughing-female-bikers-street-motorcycles-victory-signs-leather-gloves-two-116124450.jpg' alt='sefty-img' />

          </div>

        </div>
        <br/>
<OurImpact/>
<br/>
<Testimonial/>
<br/>
<br/>


{/* <Footer/> */}
      </div>

    </div>
  );
}

export default home;
