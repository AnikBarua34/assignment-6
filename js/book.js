// on click function 
const getBook = () => {
    const inputField = document.getElementById('input-value')
    const inputText = inputField.value


    // clearing input value after search 
    inputField.value = '';

    // taking the api 
    const url = (`https://openlibrary.org/search.json?q=${inputText}`)
    fetch(url)
        .then(res => res.json())

        .then(data => displayBooks(data))

}


// declaring function for display books 
const displayBooks = data => {

    const divSection = document.getElementById('div-section')

    // clearing all items 
    divSection.innerHTML = '';

    // if items not available 
    if (data.length === 0)
        alert("No Books Found in our STORE, Please Check spelling or Search another Book.")

    // show total number of result 

    if (data.numFound == 0) {
        const showResult = document.getElementById('show-result')

        showResult.innerText = 'No Results found';
    }
    else {
        const rootData = data.docs;
        const dataSlice = rootData.slice(1, 22);

        // using for each loop

        dataSlice.forEach(book => {
            const newDiv = document.createElement('div')

            // adding New Div contents 

            newDiv.innerHTML = `
        <div class="col mx-auto">
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/ ${book.cover_i}-M.jpg" class="card-img-top width-50" alt="...">
                <div class="card-body">
                    <h3 class="card-title"> ${book.title} </h3>
                    <p class="card-text"> Author's Name : ${book.author_name} </p>
                    <p class=" Publisher card-text"> Book Publisher's Name : ${book.publisher} </p>
                    <p class="card-text"> First publishing year : ${book.first_publish_year} </p>
                    <button class="btn"> Buy Now </button>
                </div>
            </div>
        </div>
                            `
            divSection.appendChild(newDiv);

            // taking div section for showing searched result 

            const showResult = document.getElementById('show-result')
            showResult.innerHTML = `${data.numFound}`;
        });
    }
}

