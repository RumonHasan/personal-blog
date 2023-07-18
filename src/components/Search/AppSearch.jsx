import { useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import './AppSearchStyles.css';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createHyphenatedSearchParams } from '../../utils/general';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/projectSlice';

const AppSearch = () => {
  const searchValue = useSelector((data) => data.mainReducer.searchPost);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  const jumpToProject = () => {
    let searchTerm = createHyphenatedSearchParams(searchValue);
    navigate(`/search/${searchTerm}`);
  };

  useEffect;

  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Search Blog"
        variant="outlined"
        value={searchValue}
        onChange={handleSearch}
        className="search-input"
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => jumpToProject()}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default AppSearch;
