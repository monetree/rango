import React from 'react';

const elasticSearch = (event) => {
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
})
}


const Search = () => {
    return (
        <div>
            <input
                className="db ma3 q center border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                type="text"
                name="q"
                id="q"
                onChange = {elasticSearch}
            />
        </div>
    )
}

export default Search;