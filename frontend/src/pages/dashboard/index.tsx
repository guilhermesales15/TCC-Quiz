import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import styles from './styles.module.scss'

import Header from "@/components/ui/Header"

export default function Dashboard(){
    const {user}= useContext(AuthContext);

    return(
       <>
       <Head>
        <title>
        Aventuras Lógicas - Ambiente do professor    
        </title>      
         </Head>

         <Header/>
        <h1 className={styles.welcome}>Bem vindo(a) {user?.name}</h1>

       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{
return{
    props:{

    }
}
})