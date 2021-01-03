import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


const {useState, useEffect} = React; 


// https://randomuser.me/api

const fetchData = () => {
  return axios.get('https://randomuser.me/api?page=1').then(({data}) => {
           
    return data.results
  }).catch(err => console.log(err, 'err'))
}

const returnName = (detail) => {
  const {name: {first, last}} = detail
  return `${first} ${last}`
}

const returnImage = (detail) => {
  const {picture} = detail; 
  const {medium} = picture;
  return <img src={medium} alt=""/>
}





function App() {
  
  const [count, setCount] = useState(0);
  const [personalInfo, setPersonalInfo] = useState([])
  const [loadMore, setLoadMore] = useState([])

  useEffect(() => {
    fetchMore()
  }, [])

  console.log(personalInfo, 'personalInfo2222');

  const fetchMore = () => {
    // console.log('hi55');
    return axios.get('https://randomuser.me/api?page=2')
    .then(res => {
      const newUserInfo = [
        ...personalInfo, 
        ...res.data.results
      ]
      setLoadMore(newUserInfo);
    })
    .catch(err => console.log(err, 'err33'))
  }

  console.log(loadMore, 'loadMore');
  
  return (
    <div className="App">
      <header className="App-header">
        {
          personalInfo.map(detail => (
            <div>
             { returnName(detail)}
            <div>{ returnImage(detail)}</div> 
            </div>
          ))
        }
      {/* ?page=2 */}
        <button onClick={() => fetchMore()}>Load More</button>
        {loadMore.length > 0 ? (
          <div>
          {loadMore.map(detail => (
            <div>
              <h5>Name</h5><span>{detail.name.first}</span>
              <h5>Photo</h5><img src={detail.picture.thumbnail} />
            </div>
          ))}
          </div>
        ):null}
       
      </header>
    </div>
  );
}

export default App;
