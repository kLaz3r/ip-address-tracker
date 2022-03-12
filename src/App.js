import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import arrow from './assets/icon-arrow.svg';
import bg from './assets/pattern-bg.png';

const AppContainer = styled.div`
  /* display: flex;
  min-width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  display: block;
`;

const Header = styled.header`
  background: url(${bg}) center center/cover;
  width: 100%;
  height: 50%;
  padding: 1rem;
  text-align: center;
  z-index: 100;
`;

const Title = styled.h1`
  font-size: 2rem;
  padding: 1rem 0;
  color: white;
  z-index: 100;
`;

const InputDiv = styled.div`
  max-width: 500px;
  height: 3rem;
  margin: 0 auto;
  display: flex;
  transform: translateY(70%);
  z-index: 100;
  -webkit-box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);
  box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);

  input {
    width: 90%;
    padding: 1rem 0;
    padding-left: 1rem;
    border-radius: 10px 0 0 10px;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
  }
  button {
    width: 10%;
    border: none;
    background-color: black;
    height: 100%;
    padding: 0rem 1.5rem;
    padding-left: 1.3rem;
    border-radius: 0 10px 10px 0;
    outline: none;
    cursor: pointer;
    img {
      border-radius: 0 10px 10px 0;
      background-color: black;
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Info = styled.div`
  max-width: 1000px;
  z-index: 100;

  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem 1rem;
  background-color: white;
  border-radius: 10px;
  transform: translateY(50%);
  -webkit-box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);
  box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);
  @media (max-width: 500px) {
    flex-direction: column;
    transform: translateY(20%);
  }
`;
const InfoCard = styled.div`
  width: 25%;
  text-align: start;
  padding: 1rem;
  word-wrap: break-word;
  border-right: 1px solid #888;
  z-index: 1000;
  @media (max-width: 500px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #888;
  }
  &:last-child {
    border: none;
  }
  h5 {
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    color: #888;
    padding-bottom: 1rem;
  }
  h1 {
    font-size: 1.5rem;
  }
`;

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const getLocation = () => {
    axios
      .get(
        `https://geo.ipify.org/api/v1?apiKey=at_xaFlcoRvMfiEverqc3zBiG2B8Ca6z&ipAddress=${input}`
      )
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    axios
      .get(
        'https://geo.ipify.org/api/v1?apiKey=at_xaFlcoRvMfiEverqc3zBiG2B8Ca6z'
      )
      .then((res) => setData(res.data));
  }, []);
  return (
    <AppContainer>
      <Header>
        <Title>IP Address Tracker</Title>
        <InputDiv>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Search for any IP address or domain'
          />
          <button onClick={getLocation}>
            <img src={arrow} alt='' />
          </button>
        </InputDiv>
        {data && (
          <Info>
            <InfoCard>
              <h5>ip address</h5>
              <h1>{data.ip}</h1>
            </InfoCard>
            <InfoCard>
              <h5>location</h5>
              <h1>
                {data.location.city}, {data.location.country},{' '}
                {data.location.postalCode}
              </h1>
            </InfoCard>
            <InfoCard>
              <h5>timezone</h5>
              <h1>{data.location.timezone}</h1>
            </InfoCard>
            <InfoCard>
              <h5>isp</h5>
              <h1>{data.isp}</h1>
            </InfoCard>
          </Info>
        )}
      </Header>
      {data && (
        <MapContainer
          style={{ height: '100vh', zIndex: '-1' }}
          center={[data.location.lat, data.location.lng]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {/* <Marker position={[data.location.lat, data.location.lng]}></Marker> */}
        </MapContainer>
      )}
    </AppContainer>
  );
}

export default App;
