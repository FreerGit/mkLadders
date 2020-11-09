import Layout from '../components/Layout';
import AddMatch from '../components/AddMatch';
import {PlayerInterface } from '../src/declarations'

interface PlayerContainerProps {
    AllPlayers: PlayerInterface[],
}

const addMatch = ({AllPlayers}:PlayerContainerProps) => {
    return (
        <>  
{/* @ts-ignore */}
            <Layout/>
{/* @ts-ignore */}
            <AddMatch AllPlayers={AllPlayers}/>
        </>
    )
}

export async function getServerSideProps () {
    const res = await fetch(`http://backend:8000/players`)
    const json = await res.json()
    return { props: { AllPlayers: json } }
}

export default addMatch;
