import React, {Component} from 'react'
import ReactNative, {ListView, Platform, StyleSheet,Text,View,TextInput,TouchableHighlight} from 'react-native'

import NoteScreen from './NoteScreen'
import NoteCell from './NoteCell'
import SearchBar from './SearchBar'
import configNote from './config.notes'
import NoNotes from './NoNotes'


export default class SearchScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading:false,
      filter:'',
      dataSource : new ListView.DataSource ({
          rowHasChanged:(row1,row2) => row1 !== row2
      })
    }
  }
  componentDidMount(){
    this.searchNotes('')
  }

  _urlForQueryAndPage(query){
    if(query){
      return `${configNote.resturl}`
    }else{
      return `${configNote.resturl}`
    }
  }

  searchNotes(query:string) {
    this.setState({filter:query});
    let urltest = this._urlForQueryAndPage(query);
    console.log("Ini URL TEst",urltest)

    fetch(urltest, {
      method: 'GET'
    }).then((response)=>{
      return response.json()
    })
    .catch((err)=>{
      console.log("err",err);
      this.setState({dataSource:this.getDataSource([]),isLoading:false})
    })
    .then((notes)=>{
      console.log("OIIIIIIIIIIII",notes);
        if(this.state.filter != query) {
          return
        }
        this.setState({
          isLoading:false,
          dataSource:this.getDataSource(notes)

        })
        console.log("then data source ",this.state.dataSource);
    })
  }
  onSearchChange(event: Object){
    let filter = event.nativeEvent.txt.toLowerCase();
    this.searchNotes(filter)
  }

  getDataSource(notes:Array<any>) :ListView.DataSource{

    return this.state.dataSource.cloneWithRows(notes)
  }

  selectNote(note: Object){
    if(Platform.os ==='ios'){
      this.props.navigator.push({
        title: note.title,
        component: NoteScreen,
        passProps: note
      })
    }
  }
  renderSeperator(sectionID:number | string,
    rowID:number | string,
    adjacentRowHighlighted:boolean){
      let style = style.rowSeperator;
      if(adjacentRowHighlighted) {
        style = [style,styles.rowSeperatorHide]
      }
      return(
        <View key={'SEP_' + sectionID + '_' + rowID} style={style} />
      )
  }

  renderRow(note :Object,
    sectionID: nummber | string,
    rowID : number | string ,
    // highlightRowFunc:{sectionID: ?number | string,rowID: ?number | string}
      highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
    ){
    return (
      <NoteCell key={note.id}
      onSelect={()=> this.selectNote(note)}
      onHighLight={()=> highlightRowFunc(sectionID,rowID)}
      onUnHighlight={()=> highlightRowFunc(null,null)}
      note={note} />
    )
  }
  render() {

    let content = this.state.dataSource.getRowCount() === 0 ?
      <NoNotes filter={this.state.filter} isLoading={this.state.isLoading} />
    :
    <ListView ref="listview"
      renderSeperator={this.renderSeperator}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps={true}
      showVerticalScrollIndicator={false} />
      console.log("Woyyyyy!!",content);
      console.log("This set ",this.state.dataSource );
    return(
        <View style={styles.container}>
          <SearchBar onSearchChange={this.onSearchChange.bind(this)}
            isLoading={this.state.isLoading}
            onFocus={()=> this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({x:0,y:0})} />
          <View style={styles.seperator}/>{content}
          </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  centerText:{
    alignItems:'center'
  },
  noNotesText:{
    marginTop:80,
    color:'#888888'
  },
  mainSection:{
    flexDirection:'row'
  },
  seperator:{
    height:1,
    backgroundColor:'#eeeeee'
  },
  scrollSpinner:{
    marginVertical:20
  },
  rowSeperator:{
    backgroundColor:'rgba(0,0,0,0.1)',
    height:1,
    marginLeft:4
  },
  rowSeperatorHide:{
    opacity:0.0
  }
})
