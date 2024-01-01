import { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monsters : []
        };

        console.log('constructor')
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.fetchMonsters()
    }

    fetchMonsters() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState(() => {
                return { monsters : users }
            }, () => console.log(users)));
    }

    render() {
        console.log('render')
        return (
            <div className='App'>
                <input className='search-box' type='search' placeholder='search monsters' onChange={ (event) => {
                    this.setState(() => {
                            this.fetchMonsters();
                        },
                        () => {
                            const monsters = this.state.monsters.filter(m => m.name.toLowerCase().includes(event.target.value.toLowerCase()));
                            console.log(monsters);
                            return { monsters : monsters }
                        })
                } }/>
                { this.state.monsters.map((monster) => {
                    return (
                        <div key={ monster.id }>
                            <h1>{ monster.name }</h1>
                        </div>
                    )
                }) }
            </div>);

    }
}

export default App;
