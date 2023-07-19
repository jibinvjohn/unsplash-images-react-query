import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useGlobalContext } from './context';

const client_id = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=`;
const Gallery = () => {
    const {searchValue} = useGlobalContext();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['images',searchValue],
    queryFn: async () => {
        const result = await axios.get(`${url}${searchValue}`);
        return result.data;
    }
  })
  if (isLoading) {
    return <section className="image-container">
        <h4>Loading...</h4>
    </section>
  }
  if (isError) {
    return <section className="image-container">
        <h4>There was an error...</h4>
    </section>
  }
  const results = data.results;
  if (results.length === 0) {
    return <section className="image-container">
        <h4>No results found...</h4>
    </section>
  }
  return (<section className="image-container">
    {results.map(item => {
        const url = item?.urls?.regular;
        return (<img src={url} alt={item.alt_description} key={item.id} className='img'/>)
    })}
  </section>
  )
}

export default Gallery