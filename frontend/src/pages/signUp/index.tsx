import Head from 'next/head'
import Image from 'next/image'
import { useState, FormEvent, useContext} from 'react'

import { Inter } from 'next/font/google'
import styles from '@/styles/home.module.scss'
import {toast} from 'react-toastify'

import logoImg from  "../../../public/TDeam.gif"
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/context/AuthContext'

import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function signUp() {
  const {signUp} = useContext(AuthContext)

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const[loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name===""|| password ===""){
      toast.error("Email ou senha vazios")
      return;
    }

    setLoading(true)

    let data ={
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
   <>
   <Head>
    <title>Aventuras Lógicas - Professor</title>
   </Head>
   
    <div className={styles.containerCenter}>
    <Image src={logoImg} alt='Logo'/>

    <h1 className={styles.text}>Cadastro Professor</h1>

    <div className={styles.login}>
      <form onSubmit={handleSignUp}>
        <Input
        placeholder='Insira o seu nome completo'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />  

        <Input
        placeholder='Insira o seu email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />  


        <Input
        placeholder='Insira a sua senha'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />  


        <Button type="submit" loading={loading}>
          Entrar
        </Button>
      </form>  
        
        
      <Link 
        href={"/"}
        className={styles.text}
        >
           Já possui uma conta? Faça o login
      </Link>
         
       
      
     
    </div>


    </div>

   </>
  )
}
