import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

 const SearchBar = ({hashtags, handleSearchBar}) => {
     console.log(hashtags)
     const filteredHashtags = hashtags.map(h => {return h.hashtag})
     console.log(filteredHashtags)
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      style={{backgroundColor: "white",display: "grid", margin: "auto"}}
      options={filteredHashtags}
      onInputChange={(event,value) =>handleSearchBar(value)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField  {...params} label="Movie" />}
    />
  );
}


export default SearchBar