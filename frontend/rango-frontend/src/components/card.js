import React from 'react';
import SignIn from './signin';
// import SignUp from './SignUp';

class Card extends React.Component {
  render() {
    return (
			<div>
				<article className="br3 bg-light-green ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
					<div className="pa2 ph3-ns pb3-ns">
						<SignIn />
					</div>
				</article>
			</div>
    )
	}
}


export default Card;