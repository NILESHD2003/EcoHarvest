import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Footer() {
  return (
    <View style = {styles.footer}>
      <Text style = {{color: '#80E618', fontSize: 20, textAlign: 'center',}}>Copyright &copy; EcoHarvest 2024</Text>
    </View>
  )
}   

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
    }
})