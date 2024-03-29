import UserCard from "./UserCard";
import {useState} from "react";
import {alpha, debounce, InputBase, List, ListItem, styled} from "@mui/material";
import axios from "axios";
import config from "../config";
import SearchIcon from '@mui/icons-material/Search';
import {useAuth} from "../context/AuthContext";


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

const UserSearch = (props) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const max = props.maxResults;
    const addPresent = props.addPresent;

    const {userLogin} = useAuth();

    const handleSearch = async () => {
        try {
            // AJAX users request
            const response = await axios.get(config.apiUrl+'/users?search='+searchQuery);
            const usersList = response.data.usersList || [];
            setSearchResults(usersList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const debouncedSearch = debounce(handleSearch, 300); // 300 milliseconds delay

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        debouncedSearch()
    };

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
                    id="searchInput"
                />
            </Search>
            <List>
                {searchResults
                    .filter(result => result.login !== userLogin)
                    .slice(0,max)
                    .map(result => (
                    <ListItem key={result.login}>
                        <UserCard
                            userData={result}
                            addPresent={addPresent}
                            chosen={props.chosen}
                            setChosen={props.setChosen}
                        />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default UserSearch;