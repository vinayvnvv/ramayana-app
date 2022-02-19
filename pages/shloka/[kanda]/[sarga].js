import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
const fetchShlokaData = (kanda, sarga, origin = '') => {
    return fetch(`${origin}/api/shloka?kanda=${kanda}&sarga=${sarga}`);
}
const Shloka = props => {
    const router = useRouter();
    const [sargaText, setShlokaText] = useState('');
    const [shlokaNumber, setShlokaNunber] = useState('');
    const [kandaId, setKandaId] = useState();
    const [shlokaData, setShlokaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchShloka = () => {
        const {query: {kanda, sarga} = {}} = router;
        setLoading(true);
        return fetchShlokaData(kanda, sarga).then(res => res.json())
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
                    alert('shloka added');
                    await fetchShloka();
                    setLoading(false);
                    setShlokaText('');
                    setShlokaNunber('');
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
            if(props.shlokaData) {
                setShlokaData(props.shlokaData);
            } else {
                fetchShloka(); 
            }
            
        }
    }, []);
    return (
        <div>
            {props.sargaDetails && <div>
                <small>Kanda Name:</small> {props.sargaDetails.kanda.name} <br />
                <small>Sarga Name:</small> {props.sargaDetails.name}
            </div>}
            <hr />
            <div>
                <input onChange={(e) => setShlokaNunber(e.target.value)} value={shlokaNumber} placeholder={'shloka number'}/><br />
                <textarea onChange={(e) => setShlokaText(e.target.value)} value={sargaText} placeholder={'shloka text'}></textarea><br />
                <button disabled={loading} onClick={addShloka}>Add Shloka</button>
            </div>
            <hr />
            <ul>
                {shlokaData.map(s => 
                    <li key={s._id}>
                        {/* <Link href={"/shloka/" + s.kanda._id + '/' + s._id}> */}
                            <div style={{margin: '21px 0px'}}>{s.shloka_number} - {s.text}</div>
                        {/* </Link> */}
                    </li>
                )}
            </ul>
        </div>
    )
}
export async function getServerSideProps(context) {
    // Fetch data from external API
    const origin = new URL(context.req.headers.referer).origin;
    const {kanda, sarga} = context.params;
    let shlokaData = null;
    let sargaDetails = null;
    if(kanda && sarga) {
        try {
            const res = await fetchShlokaData(kanda, sarga, origin);
            shlokaData = await res.json();
            const res1 = await fetch(`${origin}/api/sarga?id=${sarga}`);
            const jsD = await res1.json();
            if(Array.isArray(jsD) && jsD.length > 0) {
                sargaDetails = jsD[0];
            }
        } catch(err) {
            console.log(err)
        }
        
    }
    return { props: {shlokaData, sargaDetails} }
  }
export default Shloka;