class Newspaper {

    doLookup(title) {
        return fetch('/lookup/' + title)
            .then(response => response.json());
    }

    save(postBody) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        
        return fetch('/save/', fetchOptions);
    }

    logout() {
        const fetchOptions = {
            method: 'POST',            
        };
        
        return fetch('/logout/', fetchOptions);
    }

}


export default Newspaper;