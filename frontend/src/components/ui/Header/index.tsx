import { useContext } from 'react'

import styles from './styles.module.scss'
import Link from 'next/link'

import {FiLogOut} from 'react-icons/fi'


import { AuthContext } from '@/context/AuthContext'

export default function Header(){

    const {signOut} = useContext(AuthContext)

    return(
        <header className={styles.container}>
            <div className={styles.content}>
                <Link href={"/dashboard"} >
                    <img src='/TDeam.gif' width={200} height={200}/>
                </Link>

                <nav className={styles.menu}>
                    <Link href={"/signUpAluno"} className={styles.link}>
                        Cadastrar Aluno
                    </Link>

                    <Link href={"/question"} className={styles.link}>
                        Perguntas
                    </Link>

                    <button onClick={signOut}>
                      <FiLogOut color="#fff" size={24}/>  
                    </button>


                </nav>
            </div>
                
        </header>
    
    )
}