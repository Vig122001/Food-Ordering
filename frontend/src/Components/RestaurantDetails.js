import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import '../Styles/Details.css';
import Carousel from 'react-bootstrap/Carousel';

Modal.setAppElement('#root');

const modalStyle = {
  overlay: {
    position: 'fixed',
    zIndex: 1020,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    left: 'auto',
    right: 'auto',
    width: 'auto',
    tranform: 'translate(-50%,-50%)',
  },
};

const imagemodelstyle = {
  content: {
    width: '90%',
    height: '600px',
    backgroundColor: 'black',
    color: 'white',
  },
};

export default function RestaurantDetails() {
  const { rName } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isSeeImages, setIsSeeImages] = useState(false);
  const [menu, setMenu] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = (item) => {
    let price = totalPrice + item.itemPrice;
    console.log('price', price);
    setTotalPrice(price);
    console.log(totalPrice);
  };

  useEffect(() => {
    const url = 'http://localhost:7878/zomato/restaurants';
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:7878/zomato/restaurantDetails/${rName}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data.data);
      });
  }, [rName]);

  useEffect(() => {
    fetch(`http://localhost:7878/zomato/menu/${rName}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setMenu(data.data);
        console.log(data.data);
      });
  }, [rName]);

  const { name, thumb, cost, address, Cuisine } = restaurant;
  const cuisineValues =
    !(Cuisine === undefined) &&
    Cuisine.length &&
    Cuisine.map((item) => <div className="value">{item.name}</div>);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalPrice === '') {
      alert('please enter amount');
    } else {
      var options = {
        key: 'rzp_test_UIq5I9cnx0j4Wj',
        key_secret: '1NQhO6dcweZlWhro0WTQMEzj',
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'STARTUP_PROJECTS',
        description: 'for testing purpose',
        handler: function (response) {
          alert(
            'Payment successful!!! Your Payment ID is : ' +
              response.razorpay_payment_id
          );
        },
        prefill: {
          name: 'Vigneshini',
          email: 'vigtvl122001@gmail.com',
          contact: '9790326484',
        },
        notes: {
          address: 'Razorpay Corporate office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div>
      <div>
        {/* Showcasing the First Image and rest will be showed in the Carousal  */}
        <img src={thumb} width="100%" height="500px" alt="" id={name} />
        <button className="btn btn-danger" onClick={() => setIsSeeImages(true)}>
          Click to see Image
        </button>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => setIsMenuModalOpen(true)}
        style={{ float: 'right', margin: '15px', backgroundColor: '#ce0505' }}
      >
        Place Online Order
      </button>
      {/* Showing 2 Tabs on screen as Overview and Contact with details in respective sections*/}
      <div className="heading">{name}</div>
      <div className="tabs">
        {/* Tab-1 */}
        <div className="tab">
          <input
            type="radio"
            id="tab-1"
            name="tab-group-1"
            defaultChecked={true}
          />
          <label htmlFor="tab-1">Overview</label>

          <div className="content">
            <div className="about">About the place</div>
            <div className="head">Cuisine</div>
            {cuisineValues}
            <div className="head">Average Cost</div>
            <div className="value">&#8377; {cost}</div>
          </div>
        </div>
        {/* Tab-2 */}
        <div className="tab">
          <input type="radio" id="tab-2" name="tab-group-1" />
          <label htmlFor="tab-2">Contact</label>
          <div className="content">
            <div className="head">Phone Number</div>
            <div className="value">+91-9876543217</div>
            <div className="head">{name}</div>
            <div className="value">{address}</div>
          </div>
        </div>
      </div>

      <Modal isOpen={isMenuModalOpen} style={modalStyle}>
        <h2>
          Menu
          <button
            onClick={() => setIsMenuModalOpen(false)}
            className="btn btn-outline-danger float-end"
          >
            X
          </button>
        </h2>
        <h3>{name}</h3>
        <ul className="">
          {menu.length &&
            menu.map((item, index) => (
              <li key={index}>
                <div className="col-10">
                  <div>
                    {item.isVeg ? (
                      <div className="text-success fs-6">Veg</div>
                    ) : (
                      <div className="text-danger fs-6">Non-veg</div>
                    )}
                  </div>
                  <div className="cuisines"> {item.itemName} </div>
                  <div className="cuisines">&#8377;{item.itemPrice}</div>
                  <div className="cuisines">{item.itemDescription}</div>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => addItem(item)}
                  >
                    Add
                  </button>
                </div>
                <hr />
              </li>
            ))}
        </ul>
        <hr />
        <h3 value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)}>
          Total Price:{totalPrice}
        </h3>
        <button className="btn btn-success" onClick={handleSubmit}>
          Pay Now
        </button>
      </Modal>

      <Modal isOpen={isSeeImages} style={imagemodelstyle}>
        <h4>Image Gallery</h4>
        <center>
          <button
            className="btn btn-outline-danger float-end"
            onClick={() => setIsSeeImages(false)}
          >
            X
          </button>
          <div
            style={{
              display: 'block',
              width: '500px',
              height: '500px',
              padding: 30,
            }}
          >
            <Carousel>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img1.jpg')}
                  width="700px"
                  height="500px"
                  alt=""
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img2.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img3.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img4.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img5.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img6.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img7.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src={require('../Assets/img8.jpg')}
                  width="700px"
                  height="500px"
                  alt="Two"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </center>
      </Modal>
    </div>
  );
}
