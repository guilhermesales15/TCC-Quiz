import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useContext, useState } from 'react'

import { Inter } from 'next/font/google'
import styles from '@/styles/home.module.scss'

import logoImg from '../../public/TDeam.gif'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { AuthContext } from '@/context/AuthContext'
import {toast} from 'react-toastify'

import Link from 'next/link'

import { canSSRGuest } from '@/utils/canSSRGuest'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { signIn} = useContext(AuthContext);

  const[email, setEmail ]= useState('');
  const[password, setPassword ]= useState('');

  const [loading, setLoading] = useState(false);

  async function HandleLogin (event: FormEvent){
    event.preventDefault();

    if(email==''|| password=='' ){
      toast.error("Email ou senha vazios")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false)
  }

  return (
   <>
   <Head>
    <title>Aventuras Lógicas - Professor</title>
   </Head>
   
    <div className={styles.containerCenter}>
    <Image className={styles.logo} src={logoImg} alt='Logo'/>

    <div className={styles.login}>
      <form onSubmit={HandleLogin}>
        <Input
        placeholder='Insira o seu email'
        type='text'
        value={email}
        onChange={(e) =>setEmail(e.target.value)}
        />  

        <Input
        placeholder='Insira a sua senha'
        type='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />  


        <Button type="submit" loading={loading} >
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

export const getServerSideProps = canSSRGuest(async(ctx) =>{
  return {
    props:{
      
    }
  }
})