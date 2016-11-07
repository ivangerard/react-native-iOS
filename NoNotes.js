'use strict'

import React, {Component} from 'react'
import {StyleSheet,Text,View} from 'react-native'

export default class NoNotes extends Component {
  render(){
    var text = '';
    if(this.props.filter){
      text = `No results for ${this.props.filter}`
    }else if (!this.props.isLoading){
      text = 'No Notes Found'
    }
    return(
      <View style ={[styles.container,styles.centerText]}>
        <Text style={styles.noNotesText}>{text}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create ({
  container: {
    flex:1,
    backgroundColor:'white'
  },
  centerText:{
    alignItems:'center'
  },
  noNotesText:{
    marginTop:80,
    color:'#888888'
  }
})
