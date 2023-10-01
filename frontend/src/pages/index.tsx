import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'
import styles from '@/styles/home.module.scss'

import logoImg from '../../public/TDeam.gif'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
   <Head>
    <title>Aventuras Lógicas - Professor</title>
   </Head>
   
    <div className={styles.containerCenter}>
    <Image className={styles.logo} src={logoImg} alt='Logo'/>

    <div className={styles.login}>
      <form>
        <Input
        placeholder='Insira o seu email'
        type='text'
        />  

        <Input
        placeholder='Insira a sua senha'
        type='password'
        />  


        <Button type="submit" loading={false}>
          Entrar
        </Button>
      </form>  
        
        
      <Link 
        href={"/signUp"}
        className={styles.text}
        >
          Não possui uma conta? Cadastre-se
      </Link>
         
       
      
     
    </div>


    </div>

   </>
  )
}
