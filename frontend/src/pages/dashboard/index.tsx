import { useState } from "react"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import styles from './styles.module.scss'
import { setupAPIClient } from "@/services/api"

import Header from "@/components/ui/Header"
import { FiRefreshCcw } from "react-icons/fi"


interface Opcao {
    id: number;
    texto: string;
  }
  
  interface Nivel {
    id: number;
    nome: string;
  }
  
  interface Pergunta {
    id: number;
    texto: string;
    nivel: Nivel;
    opcoes: Opcao[];
    banner: string |null;
  }

  export default function Dashboard({ perguntas }: { perguntas: Pergunta[] }){
    const {user}= useContext(AuthContext);

    const [listPergunta, setListPergunta] = useState(perguntas || [])

    function handleOpenModal(id: number){
        alert("id da pergunta: " + id)
    }

    return(
       <>
       <Head>
        <title>
        Aventuras Lógicas - Ambiente do professor    
        </title>      
         </Head>

         <Header/>

         <main className={styles.container}>
         <h1>Bem vindo(a) {user?.name}</h1>
            <div className={styles.containerHeader}>
                
                <h2> Perguntas Criadas</h2>
                <button>
                    <FiRefreshCcw size={20} color="#fff"/>
                </button>

            </div>

            <article className={styles.listQuestions}>

                {listPergunta.map(
                    item =>(
                        <section key={item.id} className={styles.questionItem}>
                             <button onClick={()=>handleOpenModal(item.id)}>
                                <div className={styles.tag}></div>
                                <span>{item.texto}</span>
                            </button>
                        </section>
                        
                    )

                )}
            </article>
             


         </main>
        

       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/listPergunta')

    // console.log(response.data)

return{
    props:{
        perguntas: response.data
    }
}
})