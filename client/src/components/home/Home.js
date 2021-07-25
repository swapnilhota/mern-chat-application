import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const setAsJohn = () => {
        const john = {
            name: 'John',
            email: 'john@email.com',
            password: '123',
            id: '123'
        }
        setUser(john);
    }

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
