import Layout from '../components/Layout';
import PlayerContainer from '../components/PlayerContainer';
import {PlayerInterface} from '../src/declarations'


interface PlayerContainerProps {
    AllPlayers: PlayerInterface[],
}

const IndexPage = ({AllPlayers}: PlayerContainerProps) => {
    return ( 
        <>
            <Layout/>
            <PlayerContainer AllPlayers={AllPlayers}/>
        </>
    )
}

// Fetch data from external API
export async function getServerSideProps () {
    const res = await fetch(`http://backend:8000/players`)
    const json = await res.json()
    // Pass data to the page via props
    return { props: { AllPlayers: json } }
}

export default IndexPage
