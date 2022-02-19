import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const fetchSargaData = (id, origin = '') => {
    return fetch(`${origin}/api/sarga?kanda=${id}`);
}

const Sarga = props => {
    const router = useRouter();
    const [name, setSargaName] = useState('');
    const [kandaId, setKandaId] = useState();
    const [sargaData, setSargaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchSargas = () => {
        const {query: {id} = {}} = router;
        setLoading(true);
        return fetchSargaData(id).then(res => res.json())
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
        console.log(router, props)
        if(id) {
            setKandaId(id)
            if(props.sargaData) {
                setSargaData(props.sargaData);
            } else {
                fetchSargas(); 
            }
            
        }
    }, []);
    return (
        <div>
            {props.kandaDetails && <div>
                <small>Kanda Name:</small> {props.kandaDetails.name} <br />
            </div>}
            <hr />
            <div>
                <input onChange={(e) => setSargaName(e.target.value)} value={name}/>
                <button disabled={loading} onClick={addSarga}>Add Sarga</button>
            </div>
            <hr />
            <ul>
                {sargaData.map(s => 
                    <li key={s._id}>
                        <Link href={"/shloka/" + s.kanda._id + '/' + s._id}>
                            <a>{s.name}</a>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const origin = new URL(context.req.headers.referer).origin;
    const {id} = context.params;
    let sargaData = null;
    let kandaDetails = null;
    if(id) {
        const res = await fetchSargaData(id, origin);
        sargaData = await res.json();
        const res1 = await fetch(`${origin}/api/kanda?id=${id}`);
        const jsD = await res1.json();
        if(Array.isArray(jsD) && jsD.length > 0) {
            kandaDetails = jsD[0];
        }
    }
    return { props: {sargaData, kandaDetails} }
  }


export default Sarga;