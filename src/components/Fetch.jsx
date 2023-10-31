import React,{ useState ,useEffect} from 'react';


const Fetch = () => {
    const [data,setData]=useState([]);
    const[loading,setLoading] =useState(null);
    const[error,setError]=useState(null);


   const fetchData =() => {
    fetch('http://hn.algolia.com/api/v1/search?tags=story,author_pg')
    .then((response) => response.json())
    .then((result) => {
        setData(result.hits);
        setLoading(false);
    })
    .catch((error) => {
      console.log('Error fetching data!',error);
      setError(error);
      setLoading(false);
    })
    
   }
   useEffect(() => {
    fetchData()
  }, [])
  return (
 <>
<h2>HackerNews</h2>
      { loading ? (<p>Loading...</p>):error ?
      (<p>Error loading page {error.message}</p>) : 
      (
       <ul>
        {data.map((item) => (
            <li key ={item.objectID}>
                <a href = {item.url} >{item.title}</a>
            </li>
        ))}   
        </ul>
      )
  }
 </>
    
  )
}

export default Fetch;
