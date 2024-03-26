import axios from 'axios';

let user = {
    name: 'Jon',
    age: 30
  }
  
  const apiCall = () => {
    axios.post('http://localhost:8080/', {
        name: user.name,
        age: user.age
  }).then((res) => {
      console.log(res);
      user.name = res.data;
    }
    );
  }

export default function test() {
    return (
        <div className="App">
          <header className="App-header">
            <p> Let's see if this works.</p>
            <p> {user.name} </p>
          </header>
        </div>
    );
}

