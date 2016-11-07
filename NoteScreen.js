'use strict'
import React, {Component} from 'react'
import ReactNative, {ListView, Platform, StyleSheet,Text,View,TextInput,TouchableHighlight,ScrollView} from 'react-native'

export default class NoteScreen extends Component {
  constructor(props){
    super(props)
  }
  render(){
    console.log("NOte Screen", this.props.note.content);
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
        
          <View style={styles.rightPane}>
            <Text style={styles.noteTitle}>{this.props.note.title}</Text>
          </View>
          <View style={styles.seperator}/>
          <Text>{this.props.note.content}</Text>
        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  contentContainer:{
    padding:10
  },
  rightPane:{
    justifyContent:'space-between',
    flex:1
  },
  noteTitle:{
    flex:1,
    fontSize:16,
    fontWeight:'500'
  },
  mainSection:{
    flexDirection:'row',
  },
  detailsImage:{
    width:134,
    height:200,
    backgroundColor:'#eaeaea',
    marginRight:10
  },
  seperator:{
    backgroundColor:'rgba(0,0,0,0.1)',
    height:StyleSheet.harilineWidth,
    marginVertical:10
  }

})
