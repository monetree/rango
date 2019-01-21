import React from 'react';
import './Api.scss';
import ProfileCard from 'components/Card/ProfileCard.jsx';
import Modal from 'react-awesome-modal';
// import Search from 'components/Search/Search';

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            content: '',
            img: '',
            data: [],
            pages: 0,
            page:0

        }
    }

    OnFileChange = (event) => {
        this.setState({img: event.target.files[0]});
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onContentChange = (event) => {
        this.setState({content: event.target.value})
    }

    resetForm = () => {
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('img').value = '';
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    } 


    componentDidMount() {
        fetch(`http://127.0.0.1:8000/get_profile/?page=${this.state.page}`)
          .then(response => response.json())
          .then(res =>{
            this.setState({ data: res });  
            this.setState({ pages: res[res.length-1].pages });
            console.log(this.state.page)   
        });
      }
    

    SubmitProfile = (event) => {
        let formData = new FormData();
        formData.append('img',this.state.img);
        formData.append('title',this.state.title);
        formData.append('content',this.state.content);
        fetch('http://127.0.0.1:8000/post_profile/', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*'
              },
              body:formData,
          })
          .then(response => response.json())
          .then(res => {
              if (res.code === 200){
                this.componentDidMount()
                this.resetForm()
                this.closeModal()
              }
              console.log(res);
          })
    }


    elasticSearch = (event) => {
        fetch('http://127.0.0.1:8000/search/', {
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                q: event.target.value 
            })
    })
    .then(response => response.json())
    .then(res => {
        console.log(res)
        this.setState({ data: res })
    });  
    }





    render(){
        return (
            <div className="api-body">
                <section>
                    <div className="tc pa2">
                        <input
                            type="button"
                            className="br2 center ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            value="Post"
                            onClick={() => this.openModal()} 
                        />
                        <input
                            className="db ma3 q center border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                            type="text"
                            name="q"
                            id="q"
                            onChange = {this.elasticSearch}
                        />
                        </div>
                        <Modal 
                            visible={this.state.visible}
                            width="400"
                            height="300"
                            effect="fadeInDown"
                            onClickAway={() => this.closeModal()}
                        >
                        <div className="mv3 pa3">
                    
						<label className="db fw6 lh-copy f6" htmlFor="password">Title</label>
						<input
							className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
							type="text"
							name="title"
							id="title"
							onChange={this.onTitleChange}
						/>
					</div>
                    <div className="mv3 pa3 mt-1">
                        <label htmlFor="comment" className="f6 b db mb2">Contents </label>
                        <textarea 
                            id="content" 
                            name="content" 
                            className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" 
                            aria-describedby="content-desc"
                            onChange={this.onContentChange}>
                        </textarea>
					</div>
                    <div className="mv3 pa3 mt-1">
                    <input
                        type="file"
                        multiple = {false}
                        id="img"
                        name="img"
                        ref={(input) => { this.inpuElement = input; }}
                        accept=".jpg,.jpeg,.png,.pdf,.doc"
                        onChange={this.OnFileChange}
                        />
                    <input
                        type="button"
                        className="br2 center ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        value="Submit"
                        onClick={this.SubmitProfile} 
                        />
                    </div>
                    </Modal>
                </section>

               <ProfileCard 
                data={this.state.data}
                pages={this.state.pages}
                page={this.state.page}
                />
            </div>
        )
    }
}


export default Api;