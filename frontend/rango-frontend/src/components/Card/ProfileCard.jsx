import React from 'react';


class ProfileCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data : []
    }
  }
  
  deleteProfile = id => e => {
    fetch('http://127.0.0.1:8000/delete_profile/', {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => response.json())
    .then(res => {
        if (res.code === 200){
          this.componentDidMount()
        }
        console.log(res)
    })
  } 

  demoMethod(page){
    this.props.page(page)
    console.log(page)
  }

  render(){
  return (
    <div>
      {
      this.props.data.map((user,i) => {
        return (
          <article className='mw5 tc bg-white dib br3 pa3 ma3 pa4-ns mv3 ba b--black-10 shadow-5 pc-scroll pointer' key={i}>
          <div className="tc">

           <img 
              src={"http://127.0.0.1:8000" + user.photo}
              className="br-100 h3 w3 dib" 
              alt="profile pic"
              onDoubleClick = {this.deleteProfile(user.id)}
          />
             <h1 className="f4">{user.title}</h1>
             <hr className="mw3 bb bw1 b--black-10" />
           </div>
           <p className="lh-copy measure center f6 black-70">
           {user.content}
           </p>
         </article>
        );
      })
    }

      <div className="pagination">
        <center>
            {[...Array(this.props.pages+1)].map((x, i) =>
              <h2 key={i} onClick={()=>this.demoMethod(i+1)} className="tc">{ i+1 }</h2>
            )}
        </center>
      </div>

    </div>
  );
  }
}


export default ProfileCard;
