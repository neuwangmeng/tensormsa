  import React from 'react'
import NN_HeaderComponent from './NNLayout/NN_HeaderComponent'
import NN_SectionComponent from './NNLayout/NN_SectionComponent'
import NN_FooterComponent from './NNLayout/NN_FooterComponent'
import NN_InfoListComponent from './NNConfiguration/NN_InfoListComponent'
import NN_ModalComponent from './NNLayout/NN_ModalComponent';
import MainSectionComponent from './NNLayout/MainSectionComponent';
import ReportRepository from './repositories/ReportRepository';
import Api from './utils/Api';
import NN_InfoNewComponent from './NNConfiguration/NN_InfoNewComponent'
import NN_InfoDetailComponent from './NNConfiguration/NN_InfoDetailComponent'
import NN_InfoApplicationList from './NNConfiguration/NN_InfoApplicationList'
import NN_InfoMonitering from './NNConfiguration/NN_InfoMonitering'
import NN_InfoMoniteringDetail from './NNConfiguration/NN_InfoMoniteringDetail'
import NN_InfoSetup from './NNConfiguration/NN_InfoSetup'

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
            this.state = {  
                        NN_InfoList : <MainSectionComponent />,
                        NN_ID : null,
                        NN_TYPE : null,
                        NN_DATAVALID : null,
                        NN_CONFIG : null,
                        NN_CONFVALID : null,
                        NN_TRAIN : null,
                        NN_DATATYPE : null,
                        NN_TITLE : null,
                        netBaseInfo : null,
                        footerArea : <NN_FooterComponent netBaseInfo='Copyrights ⓒ POSCO ICT. All rights reserved.'/>
                         };
            this.getHeaderEvent = this.getHeaderEvent.bind(this);
            this.setActiveItem = this.setActiveItem.bind(this);
        }
    componentDidMount(){
        this.getCommonMenuInfo();// 화면에 들어 올때 검색을 해준다.
    }

    getCommonMenuInfo(params) {
        this.props.reportRepository.getCommonMenuInfo(params).then((tableData) => {
          if(tableData.length < 1){
            this.props.reportRepository.postCommonRuleInfo(params).then((tableData) => {
              }); 
          }
        });   
    }

    getChildContext() {
          return {NN_ID        : this.state.NN_ID,
                  NN_TYPE      : this.state.NN_TYPE,
                  NN_DATAVALID : this.state.NN_DATAVALID,
                  NN_CONFIG    : this.state.NN_CONFIG,
                  NN_CONFVALID : this.state.NN_CONFVALID,
                  NN_TRAIN     : this.state.NN_TRAIN,
                  NN_DATATYPE  : this.state.NN_DATATYPE,
                  NN_TITLE : this.state.NN_TITLE};
    }

    setActiveItem(item1, item2, item3, item4, item5, item6, item7, item8) {
        this.setState({NN_ID        : item1,
                       NN_TYPE      : item2,
                       NN_DATAVALID : item3,
                       NN_CONFIG    : item4,
                       NN_CONFVALID : item5,
                       NN_TRAIN     : item6,
                       NN_DATATYPE  : item7,
                       NN_TITLE     : item8
                });
        this.setFootContents(item1, item2, item8);
    }

    setFootContents(item1, item2, item8) {
      let footContens = 'Copyrights ⓒ POSCO ICT. All rights reserved.'
      // if(item1){
      //       footContens = ' 1. Network Id : ' + item1;
      //       footContens += ' | 2. Title : ' + item8;
      //       footContens += ' | 3. Net Type : ' + item2;
      //   }

        this.setState({footerArea:<NN_FooterComponent netBaseInfo={footContens}/> })
    }

    getHeaderEvent(i){
        if(this.state.NN_ID){
            this.props.reportRepository.getCommonNNInfo(this.state.NN_ID).then((nnBaseInfo) => {
            this.getHeaderSwitch(i);
            });  
        }else{
            this.getHeaderSwitch(i);
        }
    }

    getHeaderSwitch(i){
        switch (i) {
          case 0:
              return this.getMainInfo(); 
          case 1:
              return this.getNetInfo();
          case 2:
              return this.setNetInfo(); 
          case 3:
              return this.getMonitering();
          case 33:
              return this.getMoniteringDirect();
          case 34:
              return this.getMoniteringDetail();
          case 4:
              return this.getApplicationList(); 
          case 5:
              return this.setSetup(); 
          case 6:
              return this.getNetInfoDetail();
          }
    }

    getMainInfo(){
        this.setState({NN_InfoList: <MainSectionComponent getHeaderEvent={this.getHeaderEvent}/>});    
    }

    getNetInfo(){
       this.setState({NN_InfoList: <NN_InfoListComponent getHeaderEvent={this.getHeaderEvent} 
                                                         setActiveItem={this.setActiveItem} 
                                                         addNewNNInfo={this.addNewNNInfo} />});
    }
    
    setNetInfo(){
        this.setState({NN_InfoList: <NN_InfoNewComponent getHeaderEvent={this.getHeaderEvent} 
                                                         setActiveItem={this.setActiveItem} /> }); 
    }

    getMonitering(){
        this.setState({NN_InfoList: <NN_InfoMonitering getHeaderEvent={this.getHeaderEvent}
                                                       setActiveItem={this.setActiveItem}   /> });  
    }

    getMoniteringDirect(){
        this.setState({NN_InfoList: <NN_InfoMonitering getHeaderEvent={this.getHeaderEvent}
                                                        setActiveItem={this.setActiveItem}
                                                       nn_id={this.state.NN_ID} /> });  
    }

    getMoniteringDetail(){
        this.setState({NN_InfoList: <NN_InfoMoniteringDetail getHeaderEvent={this.getHeaderEvent}
                                                        setActiveItem={this.setActiveItem}
                                                       nn_id={this.state.NN_ID} /> });  
    }

    getApplicationList(){
            this.setState({NN_InfoList: <NN_InfoApplicationList  getHeaderEvent={this.getHeaderEvent}/> });   
    }

    setSetup(){
        this.setState({NN_InfoList: <NN_InfoSetup getHeaderEvent={this.getHeaderEvent}/> });   
    }

    getNetInfoDetail(){
       this.setState({NN_InfoList: <NN_InfoDetailComponent getHeaderEvent={this.getHeaderEvent} 
                                                            nn_id={this.state.NN_ID}
                                                            nn_type = {this.state.NN_TYPE}
                                                            autoParam = {this.state.NN_DATAVALID}
                                                            /> });  
    }
    

    render() {
        return (
            <div>
				<NN_HeaderComponent getHeaderEvent={this.getHeaderEvent} /> 
				<NN_SectionComponent NN_InfoList={this.state.NN_InfoList} getHeaderEvent={this.getHeaderEvent} />
				{this.state.footerArea}                              
			</div>
        )
    }
}

HomeComponent.childContextTypes = {
  NN_ID        : React.PropTypes.string,
  NN_TYPE      : React.PropTypes.string,
  NN_DATAVALID : React.PropTypes.string,
  NN_CONFIG    : React.PropTypes.string,
  NN_CONFVALID : React.PropTypes.string,
  NN_TRAIN     : React.PropTypes.string,
  NN_DATATYPE  : React.PropTypes.string,
  NN_TITLE     : React.PropTypes.string
}

HomeComponent.contextTypes = {
    NN_ID        : React.PropTypes.string,
    NN_TYPE      : React.PropTypes.string,
    NN_DATAVALID : React.PropTypes.string,
    NN_CONFIG    : React.PropTypes.string,
    NN_CONFVALID : React.PropTypes.string,
    NN_TRAIN     : React.PropTypes.string,
    NN_DATATYPE  : React.PropTypes.string,
    NN_TITLE     : React.PropTypes.string
};

HomeComponent.defaultProps = {
    reportRepository: new ReportRepository(new Api())
};