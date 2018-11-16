import React from 'react';

class ProfileCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
        console.log(this.state.title)
    }

    onContentChange = (event) => {
        this.setState({content: event.target.value})
        console.log(this.state.content)
    }

    render(){
        return (
            <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
            <div className="tc">
                <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib" alt="profile pic" />
                <input
                    className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="title"
                    onChange={this.onTitleChange}
                />
                <hr className="mw3 bb bw1 b--black-10" />
            </div>
                <label htmlFor="comment" className="f6 b db mb2">Content </label>
                <textarea 
                id="content"
                name="content" 
                className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" 
                aria-describedby="contents"
                onChange={this.onContentChange}
                >
                </textarea>
                <input
                        className="button br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Submit"
                        onClick={this.onResetPassword}
                />
            </article>
        )
    }
}


export default ProfileCard;