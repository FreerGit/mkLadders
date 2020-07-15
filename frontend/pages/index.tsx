import Link from 'next/link';
import Layout from '../components/Layout';
import PlayerContainer from '../components/PlayerContainer';
import {PlayerInterface} from '../src/declarations'


interface PlayerContainerProps {
    AllPlayers: PlayerInterface[],
}

const IndexPage = ({AllPlayers}: PlayerContainerProps) => {
    console.log(AllPlayers + 'gjfdshaglkjfhgkfldg')

    return ( 
        <>
        <Layout>
            <h1>Hello Next.js </h1>
        </Layout>
        <PlayerContainer AllPlayers={AllPlayers}>

        </PlayerContainer>
        </>
    )
}

// Fetch data from external API
export async function getServerSideProps () {
    const res = await fetch(`http://backend:8000/players`)
    const json = await res.json()
    console.log(json)
    // Pass data to the page via props
    return { props: { AllPlayers: json } }
  }

export default IndexPage
