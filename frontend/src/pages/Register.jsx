import { useState } from 'react';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
    const login = useContext(AuthContext);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        const res = await api.post("/register", form);

        login(res.data);
};

    return (
        <form onSubmit={submit}>
            <input placeholder='name' onChange={(e) => setForm({...form, username: e.target.value})} />
            <input placeholder='email' onChange={(e) => setForm({...form, email: e.target.value})} />
            <input placeholder='password' type='password' onChange={(e) => setForm({...form, password: e.target.value})} />
            <button>Register</button>
        </form>
    );
}