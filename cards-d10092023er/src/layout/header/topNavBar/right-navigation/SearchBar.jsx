import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, useTheme } from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const theme = useTheme();
  const [searchParams, setSearch] = useSearchParams();

  const handleChange = ({ target }) => setSearch({ q: target.value });

  const handleSearch = () => {
    const query = searchParams.get("q");

    // Add your search logic here using the 'query' variable
    console.log("Search query:", query);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <FormControl variant="standard" style={{ marginRight: "20px" }}>
        <OutlinedInput
          style={{
            width: "250px",
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#e3f2fd',
            color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
           
            borderWidth: '3px',
            borderColor: theme.palette.mode === 'dark' ? '#616161' : '#757575', // Double color border
            borderRadius: '20px', // Border radius
            // Conditionally add white border in dark mode
            border: theme.palette.mode === 'dark' ? '3px solid #fff' : undefined,
          }}
          placeholder="Search"
          size="small"
          value={searchParams.get("q") ?? ""}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
