import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Sarga = () => {
    const router = useRouter();
    const [name, setSargaName] = useState('');
    const [kandaId, setKandaId] = useState();
    const [sargaData, setSargaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchSargas = () => {
        const {query: {id} = {}} = router;
        setLoading(true);
        return fetch(`/api/sarga?kanda=${id}`).then(res => res.json())
            .then(res => {
                if(Array.isArray(res)) {
                    setSargaData(res);
                    setLoading(false);
                    setSargaName('')
                } else {
                    setLoading(false);
                    alert('err')
                }
            }).catch(err => {
                setLoading(false)
                alert('err')
            });
    }
    const addSarga = () => {
        if(name) {
            setLoading(true);
            fetch('/api/sarga', {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name, kanda: kandaId})}).then(async res => {
                if(res.status == 200) {
                    alert('sarga added');
                    await fetchSargas();
                    setLoading(false);
                    setSargaName('');
                } else {
                    setLoading(false);
                    alert('Error on adding');
                    setSargaName('');
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
    useEffect(() => {
        const {query: {id} = {}} = router;
        console.log(router)
        if(id) {
            setKandaId(id)
            fetchSargas(); 
        }
    }, []);
    return (
        <div>
            <div>
                <input onChange={(e) => setSargaName(e.target.value)} value={name}/>
                <button disabled={loading} onClick={addSarga}>Add Sarga</button>
            </div>
            <div>
                {sargaData.map(s => 
                    <div key={s._id}>
                        <Link href={"/shloka/" + s.kanda._id + '/' + s._id}>
                            <a>{s.name}</a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Sarga;