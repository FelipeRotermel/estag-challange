import { useEffect, useState } from 'react';
import './Login.css';

function Login() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetch('http://localhost/routes/login.php?action=get')
        .then((resp) => resp.json())
        .then((data) => {
            setUsers(data);
        })

    }, [])

    /* Register new User Function */
    function UserRegister() {
        let username = document.querySelector('.RegisterUsernameTable').value;
        let password = document.querySelector('.RegisterPasswordTable').value;

        for(let i=0; i < users.length; i++) {
            if(users[i].username === username ){
                alert("Name already taken")
                return;
            }
        }

        let data = new FormData();
        data.append('username', username);
        data.append('password', password);

        fetch('http://localhost/routes/login.php?action=post', {
            method: 'POST',
            body: data,
        })
    }

    /* Login with a User */
    function UserLogin() {
        let username = document.querySelector('.LoginUsernameTable').value;
        let password = document.querySelector('.LoginPasswordTable').value;

        let data = new FormData();
        data.append('username', username);
        data.append('password', password);

        fetch('http://localhost/routes/login.php?action=login', {
            method: 'POST',
            body: data
            })
            .then(response => response.json())
            .then(data => {
                let user = JSON.parse(sessionStorage.getItem('user')) || [];
                user.push(data);
                sessionStorage.setItem('user', JSON.stringify(user));
                location.href = '/';
            })
    }

    return (
        <div className="Container">
            <div className="Column">
                <div className='UserTable'>
                    <form className='UserRegisterTable'>
                        <h1>Register</h1><br />
                        <input type="text" className='RegisterUsernameTable' name="username" placeholder="Username" required /><br />
                        <input type="password" className='RegisterPasswordTable' name="password" placeholder="Password" required /><br />
                        <button className='RegisterButtonTable' onClick={(e) => {e.preventDefault(); UserRegister()}}>Register</button>
                    </form>
                    <form className='UserLoginTable'>
                        <h1>Login</h1><br />
                        <input type="text" className='LoginUsernameTable' name="username" placeholder="Username" required /><br />
                        <input type="password" className='LoginPasswordTable' name="password" placeholder="Password" required /><br />
                        <button className='LoginButtonTable' onClick={(e) => {e.preventDefault(); UserLogin()}}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;