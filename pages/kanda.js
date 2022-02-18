import Link from "next/link";
import { useEffect, useState } from "react";

const Kanda = () => {
    const [name, setName] = useState('');
    const [kanda, setKanda] = useState([]);
    const [loading, setLoading] = useState(false);
    const onInputChange = (e) => {
        setName(e.target.value);
    }
    const onAdd = () => {
        if(name) {
            setLoading(true);
            fetch('api/kanda', {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name})}).then(async res => {
                if(res.status === 200) {
                    alert('kanda added');
                    await fetchKanda();
                    setLoading(false);
                    setName('');
                } else {
                    setLoading(false);
                    alert('Error on adding');
                }
            }).catch(err => {
                alert('Error on adding');
                console.log(err);
                setLoading(false);
            })
        } else {
            alert('name required')
        }
    }
    const fetchKanda = () => {
        setLoading(true);
        return fetch('api/kanda').then(res => res.json())
            .then(res => {
                console.log(res)
                if(res && Array.isArray(res)) {
                    setKanda(res); 
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            }) 
    }
    useEffect(() => {
        fetchKanda();
    }, [])
    return (
        <div>
            <div>
                <input onChange={onInputChange} value={name}/>
                <button onClick={onAdd} disabled={loading}>Add Kanda</button>
            </div>
            <div>
                {kanda.map(k => 
                    <div key={k._id}>
                        <Link href={"sarga/" + k._id}>
                            <a>{k.name}</a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Kanda;