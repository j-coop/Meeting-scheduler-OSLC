import UserCard from "./UserCard";
import {useState} from "react";
import {alpha, debounce, InputBase, List, ListItem, styled} from "@mui/material";
import axios from "axios";
import config from "../config";
import SearchIcon from '@mui/icons-material/Search';


const UserSearch = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            // AJAX users request
            const response = await axios.get(config.apiUrl+'/users?search='+searchQuery);
            const usersList = response.data.usersList || [];
            if (response.data && response.data.usersList) {
                setSearchResults(response.data.usersList);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const debouncedSearch = debounce(handleSearch, 300); // 300 milliseconds delay

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        handleSearch();
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleInputChange}
                    autoFocus={true} // not ideal honestly
                />
            </Search>
            <List>
                {searchResults.slice(0,5).map(result => (
                    <ListItem>
                        <UserCard login={result.login} email={result.email} name={result.fullName}/>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default UserSearch;