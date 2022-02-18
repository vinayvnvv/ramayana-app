import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Shloka = () => {
    const router = useRouter();
    const [sargaText, setShlokaText] = useState('');
    const [shlokaNumber, setShlokaNunber] = useState('');
    const [kandaId, setKandaId] = useState();
    const [shlokaData, setShlokaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchShloka = () => {
        const {query: {kanda, sarga} = {}} = router;
        setLoading(true);
        return fetch(`/api/shloka?kanda=${kanda}&sarga=${sarga}`).then(res => res.json())
            .then(res => {
                if(Array.isArray(res)) {
                    setShlokaData(res);
                    setLoading(false);
                    setShlokaText('')
                    setShlokaNunber('')
                } else {
                    setLoading(false);
                    alert('err')
                }
            }).catch(err => {
                setLoading(false)
                alert('err')
            });
    }
    const addShloka = () => {
        if(shlokaNumber && sargaText) {
            setLoading(true);
            const {query: {kanda, sarga} = {}} = router;
            const body = {
                text: sargaText, 
                kanda, 
                sarga,
                shloka_number: shlokaNumber,

            }
            fetch('/api/shloka', {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)}).then(async res => {
                if(res.status == 200) {
                    alert('sarga added');
                    await fetchSargas();
                    setLoading(false);
                    setShlokaText('');
                    shlokaNumber('');
                } else {
                    setLoading(false);
                    // alert('Error on adding');
                    setShlokaText('');
                }
            }).catch(err => {
                alert('Error on adding');
                console.log(err);
                setLoading(false);
            })
        } else {
            alert('name & number  required')
        }
    }
    useEffect(() => {
        const {query: {kanda, sarga} = {}} = router;
        console.log(router)
        if(kanda && sarga) {
            fetchShloka(); 
        }
    }, []);
    return (
        <div>
            <div>
                <input onChange={(e) => setShlokaText(e.target.value)} value={sargaText}/>
                <input onChange={(e) => setShlokaNunber(e.target.value)} value={shlokaNumber}/>
                <button disabled={loading} onClick={addShloka}>Add Shloka</button>
            </div>
            <div>
                {shlokaData.map(s => 
                    <div key={s._id}>
                        {/* <Link href={"/shloka/" + s.kanda._id + '/' + s._id}> */}
                            <div>{s.shloka_number} - {s.text}</div>
                        {/* </Link> */}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Shloka;