import Layout from '../components/Layout';
import AddMatch from '../components/AddMatch';
import {PlayerInterface } from '../src/declarations'

interface PlayerContainerProps {
    AllPlayers: PlayerInterface[],
}

const addMatch = ({AllPlayers}:PlayerContainerProps) => {
    return (
        <>
            <Layout>
            </Layout>

            <AddMatch AllPlayers={AllPlayers}>
            </AddMatch>
        </>
    )
}


export async function getServerSideProps () {
    const res = await fetch(`http://backend:8000/players`)
    const json = await res.json()
    console.log(json) 
    // Pass data to the page via props
    return { props: { AllPlayers: json } }
}

export default addMatch;
