import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useState } from 'react'

//form validation
import * as Yup from 'yup'

// const PasswordSchema = Yup.object().shape({
//   passwordLength: Yup.number()
//   .min(4,"Should be minimum of 4 character")
//   .max(4,"Should be  maximum of 16 character")
//   .required('Length is required')
// })


export default function index() {


  const [ password, setPassword] = useState("")
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)

  const [LowerCase, setLowerCase] = useState(true)
  const [UpperCase, setUpperCase] = useState(false)
  const [symbols, setsymbols] = useState(false)
  const [numbers, setnumbers] = useState(false)

  const generatePasswsordstring = (passwordLength: number) =>{
    //
  }

  
  const creatPassword = (character:string, passwordLength:number)=>{
    let result = ''
    for (let i = 0; i < passwordLength;){
     const characterIndex = Math.floor( Math.random()*character.length) 
     result += character.charAt(characterIndex);
    }
    return result
    console.log('madan')

  }

  const resetPasswordstate = () =>{
    //
  }
  return (
   
    <View>x
      <Text>index</Text>
    </View>
  )
}

const styles = StyleSheet.create({})