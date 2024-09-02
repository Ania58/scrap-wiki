const axios = require('axios') // Importing Axios, a library for making HTTP requests.
const cheerio = require('cheerio')// Importing Cheerio, a library for parsing HTML and XML. It allows jQuery-like manipulation of the document.
const express = require('express')
const app = express()

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap' // the href attributes from Wikipedia might be relative
const alphabet =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const  filterByNumber = (alphabetObject) =>{ //to filter out entries from alphabetObject that are categorized under a numeric key 
    let data = []
    for (const [key,values] of Object.entries(alphabetObject)) { // Converts the alphabetObject into an array of key-value pairs.
           
                
        if (!isNaN(key) ) {
             
            return data =  values.map(value =>  `<li><a href="https://es.wikipedia.org/wiki/${value}">${value}</a></li>`).join('') //Converts each value to an HTML list item
        }
    }
        
}

const  filterByLetter = (alphabetObject, letter) =>{ //If a key in alphabetObject matches the provided letter (case-insensitive), it returns an HTML string containing the corresponding list items.
    let data = []
    for (const [key,values] of Object.entries(alphabetObject)) {
           
                
        if (key === letter.toLowerCase() ) {
            console.log(letter);
            return data =  values.map(value =>  `<li><a href="https://es.wikipedia.org/wiki/${value}">${value}</a></li>`).join('')
        }
       
    }
    return ''
}



app.get('/',(req,res) => {
    const alphabetObject = {}  // An object to store rappers' names categorized by the first letter
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data // Store the HTML content from the response
            const $ = cheerio.load(html) // Load the HTML into Cheerio for parsing
            const pageTitle = $('#mw-pages h2').text()
            const p = $('#mw-pages p')

            //console.log(p);
            

            const links = [];
            const titles = [];
            const images = [];
            const texts = [];

            $('#mw-pages a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)

                console.log(links);
                
            })

            $(p).each((index,element) => {
                const text = $(element).text()
                texts.push(text)   
                //console.log(texts);
                
            })

            $('img').each((index,element) => {
                const image = $(element).attr('src')
                images.push(image)

                //console.log(images);
                
            })
            
            
            links.forEach(link => {
                //console.log(link.split('/wiki/').join('')[0]);
                const word =link.split('/wiki/').join('') // Remove "/wiki/" from link to get the page name
                const firstLetter = link.split('/wiki/').join('')[0].toLowerCase() // Get the first letter and convert to lowercase
                
                !alphabetObject[firstLetter] ?  alphabetObject[firstLetter] = [word] : alphabetObject[firstLetter].push(word)  
                //If alphabetObject[firstLetter] does not exist, it creates a new array with the current word and assigns it to alphabetObject[firstLetter]. If alphabetObject[firstLetter] already exists, it adds the word to the existing array using the push method.
            });

            
           
            
            res.send(`
                <h1>${pageTitle}</h1>
                <hr>
                <br>
                <p>${texts.join(' ')} </p>
                <br>
                <br>
                <div style=" display: flex; flex-direction: column; flex-wrap: wrap; height: 500px;">
                <h3>0-9</h3>
                <ul>
                    ${filterByNumber(alphabetObject, 0)}
                </ul>
                <h3>A</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'A')}
                </ul>

                <h3>B</h3>
                <ul> 
                    ${filterByLetter(alphabetObject, 'B')}
                 </ul>
                <h3>C</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'C')}
                 </ul>
                <h3>D</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'D')}
                 </ul>
                 <h3>F</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'F')}
                 </ul>
                 <h3>G</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'G')}
                 </ul>
                 <h3>J</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'J')}
                 </ul>
                 <h3>K</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'K')}
                 </ul>
                 <h3>L</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'L')}
                 </ul>
                 <h3>M</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'M')}
                 </ul>
                 <h3>N</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'N')}
                 </ul>
                 <h3>R</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'R')}
                 </ul>
                 <h3>S</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'S')}
                 </ul>
                 <h3>T</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'T')}
                 </ul>
                 <h3>W</h3>
                <ul>
                    ${filterByLetter(alphabetObject, 'W')}
                 </ul>
                
                `)
        }
    }).catch(error => {
        console.error(error); // Log any errors that occur during the request
        res.status(400).send('Error fetching data'); // Send a 400 response on error
    });
})


app.listen(3000, () => {
    console.log('Express listening on port http://localhost:3000');
    
})