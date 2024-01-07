import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';

import { useState } from 'react';

const PickCity = props => {
  const [city, setCity] = useState('');
  const onSearch = e => {
    e.preventDefault();
    props.onSearch(city);
    setCity('');
  };
  return (
    <form className={styles.pickCityForm} onSubmit={onSearch}> 
      <label>
        <TextInput placeholder="Enter city name...." value={city} onChange={e => setCity(e.target.value)} />
      </label>
      <Button type='submit'>Search</Button>
    </form>
  );
};

export default PickCity;