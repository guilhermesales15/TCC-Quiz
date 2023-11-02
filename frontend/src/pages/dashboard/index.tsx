import { useState } from "react"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import styles from './styles.module.scss'
import { setupAPIClient } from "@/services/api"
import Modal from 'react-modal'     

import { ModalPergunta } from "@/components/Modal"

import Header from "@/components/ui/Header"
import { FiRefreshCcw } from "react-icons/fi"

export interface Opcao {
    correta: any
    id: number;
    texto: string;
}
  
interface Nivel {
    id: number;
    nome: string;
}
  
export interface Pergunta {
    id: number;
    texto: string;
    nivel: Nivel;
    opcoes: Opcao[];
    banner: string | null;
}

export default function Dashboard({ perguntas }: { perguntas: Pergunta[] }) {
    const { user } = useContext(AuthContext);

    const [listPergunta, setListPergunta] = useState(perguntas || []);

    const [modalItem, setModalItem] = useState<Pergunta | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    function handleOpenModal(id: number) {
        const foundPergunta = listPergunta.find(pergunta => pergunta.id === id);
        if (foundPergunta) {
            setModalItem(foundPergunta);
            setModalVisible(true);
        }
    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>
                    Aventuras Lógicas - Ambiente do professor
                </title>
            </Head>

            <Header />

            <main className={styles.container}>
                <h1>Bem vindo(a) {user?.name}</h1>
                <div className={styles.containerHeader}>
                    <h2> Perguntas Criadas</h2>
                    <button>
                        <FiRefreshCcw size={20} color="#fff" />
                    </button>
                </div>

                <article className={styles.listQuestions}>

                    {listPergunta.length === 0 &&(
                        <h3 className={styles.SemPergunta}>Nenhuma Pergunta cadastrada ...</h3>

                    )}

                    {listPergunta.map(item => (
                        <section key={item.id} className={styles.questionItem}>
                            <button onClick={() => handleOpenModal(item.id)}>
                                <div className={styles.tag}></div>
                                <span>{item.texto}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>

            {modalItem && modalVisible && (
    <ModalPergunta
        isOpen={modalVisible}
        handleClose={handleCloseModal}
        pergunta={modalItem}
    />
)}

           
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/listPergunta');

    return {
        props: {
            perguntas: response.data
        }
    }
});
