import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');
    const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current) {
            const fetchValues = async () => {
                const res = await axios.get('/api/values/current');

                setValues(res.data);
            };

            const fetchIndexes = async () => {
                const res = await axios.get('/api/values/all');

                setSeenIndexes(res.data);
            };

            fetchValues();
            fetchIndexes();

            return () => {
                effectRan.current = true;
            };
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/values', { index });
        setIndex('');
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(', ');
    };

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            );
        }

        return entries;
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Enter your index:</label>
                <input
                    onChange={(e) => setIndex(e.target.value)}
                    value={index}
                />
                <button>Submit</button>
            </form>

            <h3>Index I Have Seen</h3>
            {renderSeenIndexes()}

            <h3>Calculated Values</h3>
            {renderValues()}
        </div>
    );
};

export default Fib;
