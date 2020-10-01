
import SpotList from '../components/SpotList';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, AsyncStorage, Image, View, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';

export default function List() {
    const [sangue, setSangue] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('sangue').then(storagedSangue => {
            const sangueArray = storagedSangue.split(',').map(sangue => sangue.trim());

            setSangue(sangueArray);
        })
    },[]);
    
   return (
       <SafeAreaView style={styles.container}>
           <Image style={styles.logo} source={logo} />

            <ScrollView>
                {sangue.map(sangue => <SpotList Key={sangue} sange={sangue} />)}
            </ScrollView>

           <SpotList />
       </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height:46,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10

    },
});