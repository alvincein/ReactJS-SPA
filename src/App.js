import React, { Component } from 'react'
import './App.css';
import API from './utils/API.js';
import BrowserModal from './BrowserModal.js'
import { CopyrightOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd'


export default class App extends Component{

// Initialize Component

constructor(props){
    super(props)


    // Set initial states

    this.state = {
        communityTiles: [],
        feedSponshorships : [],
        collective: [],
        href : "",
        modalVisible: false
    }

    this.showModal = this.showModal.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
}

// Fetch Data

componentDidMount(){

    // Obtain data and assign them to states
    API.get("/communitytiles.json")
        .then(response => {
            this.setState({ communityTiles : response.data })
            // Merge Data to a collective List
            this.updateCollectiveData(response.data)
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })

    API.get("/feedsponsorships.json")
        .then(response => {
            this.setState({ feedSponshorships : response.data })
            // Merge Data to a collective List
            this.updateCollectiveData(response.data)
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
}

// Getters

// Returns image url
getImage(item) {
    if(item.hasOwnProperty('mediaImageUri'))
        return item.mediaImageUri;
    else if (item.hasOwnProperty('coverTileUri'))
        return item.coverTileUri;
}

// Returns card title
getName(item) {
    if(item.hasOwnProperty('name'))
        return item.name;
    else if (item.hasOwnProperty('brandName'))
        return item.brandName;
}

// Returns card info
getInfo(item) {
    if(item.hasOwnProperty('brandInfo'))
        return item.brandInfo;
}

// Returns card's charity
getCharity(item){
    if(item.charityDonationIncentive !== undefined)
        return "Charity: " + item.charityDonationIncentive.charityName + 
        " (" + item.charityDonationIncentive.amount*100 + "%)"
}

// Setters

setCurrentHref(url){
    console.log(url)
    if (url !== undefined)
        this.setState({ href : url }, () => this.showModal())
}

//Modal Actions

// Shows or hides modal
setModalVisible(visible){
    this.setState({ modalVisible : visible })
}

// Shows modal
showModal(){
    this.setModalVisible(true);
}

// Sets a tile as clickable if is community type
urlAvailable(item){
    if(item.categoryType !== undefined && item.categoryType === "community")
        return "pointer"
}

// Set Community icon if tile is a community type
isCommunityType(item){
    if(item.categoryType !== undefined && item.categoryType === "community")
        return  <Tooltip title="Community Tile">
                    <CopyrightOutlined />
                </Tooltip>
}

// Updates collective List
updateCollectiveData(data) {
    data.forEach(element => {
        var joined = this.state.collective.concat(element)
        this.setState({ collective : joined })
    });

}

    render() {
        return (
            <div className="App">
                <BrowserModal
                    visible={this.state.modalVisible}
                    setModalVisible={this.setModalVisible}
                    url={this.state.href}
                />
                    <h1><b>Sample Page</b></h1>
                    <ul className="container">

                            {this.state.collective.map((item,i) => 

                                <li className="item-container" key={i}>
                                    <div 
                                        style={{ 
                                            cursor : this.urlAvailable(item)}} 
                                            onClick={() => this.setCurrentHref(item.url)}>
                                        <img 
                                            src={this.getImage(item)} 
                                            alt="img" 
                                            className="image"/>
                                        <div className="text-container">
                                            <h4 className="title">
                                                <b>{this.getName(item) + " "} </b>
                                                {
                                                    this.isCommunityType(item)
                                                }
                                            </h4>
                                            <p>{this.getInfo(item)}</p>
                                            <h6><i>{this.getCharity(item)}</i></h6>
                                        </div>
                                    </div>
                                </li>

                            )}
                    </ul>
            </div>
        );
    }
}
