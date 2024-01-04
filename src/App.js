import { useState, useEffect } from 'react';
import './App.css';
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";

const App = () => {
    const [monsters, setMonsters] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setMonsters(users));
    }, []);

    useEffect(() => {
        setFilteredMonsters(monsters.filter(m => {
            return m.name.toLowerCase().includes(searchField);
        }));
    }, [monsters, searchField]);

    const onSearchChange = (event) => {
        const searchField = event.target.value.toLowerCase();
        setSearchField(searchField);
    }

    console.log(monsters)
    console.log(filteredMonsters)
    console.log(searchField)
    return (<div className='App'>
        <h1 className='app-title'>Monsters</h1>
        <SearchBox
            onChangeHandler={ onSearchChange }
            placeholder={ 'monster search' }
            className={ 'monsters-search-box' }
        />
        <CardList monsters={ filteredMonsters }/>
    </div>)
}

export default App;
