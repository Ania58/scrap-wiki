const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap' // the href attributes from Wikipedia might be relative
const alphabet =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const alphabetObject = {}

const  filterByNumber = (letter) =>{
    let data = []
    for (const [key,values] of Object.entries(alphabetObject)) {
           
                
        if (Number(key) ) {
             
            return data =  values.map(value =>  `<li><a href="https://es.wikipedia.org/wiki/${value}">${value}</a></li> `)
        }else{
            break;
        }
        
    }
}
const  filterByLetter = (letter) =>{
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
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
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
                const word =link.split('/wiki/').join('')
                const firstLetter = link.split('/wiki/').join('')[0].toLowerCase()
                
                !alphabetObject[firstLetter] ?  alphabetObject[firstLetter] = [word] : alphabetObject[firstLetter].push(word)   
            });

            
           
            
            res.send(`
                <h1>${pageTitle}</h1>
                <hr>
                <br>
                <p>${texts} </p>
                <br>
                <br>
                <div style=" display: flex; flex-direction: column; flex-wrap: wrap; height: 500px;">
                <h3>0-9</h3>
                <ul>
                    ${filterByNumber(0)}
                </ul>
                <h3>A</h3>
                <ul>
                ${filterByLetter('A')}
                </ul>

                <h3>B</h3>
                <ul> 
                 ${filterByLetter('B')}
                 </ul>
                <h3>C</h3>
                <ul>
                 ${filterByLetter('C')}
                 </ul>
                <h3>D</h3>
                <ul>
                 ${filterByLetter('D')}
                 </ul>
                 <h3>F</h3>
                <ul>
                 ${filterByLetter('F')}
                 </ul>
                 <h3>G</h3>
                <ul>
                 ${filterByLetter('G')}
                 </ul>
                 <h3>J</h3>
                <ul>
                 ${filterByLetter('J')}
                 </ul>
                 <h3>K</h3>
                <ul>
                 ${filterByLetter('K')}
                 </ul>
                 <h3>L</h3>
                <ul>
                 ${filterByLetter('L')}
                 </ul>
                 <h3>M</h3>
                <ul>
                 ${filterByLetter('M')}
                 </ul>
                 <h3>N</h3>
                <ul>
                 ${filterByLetter('N')}
                 </ul>
                 <h3>R</h3>
                <ul>
                 ${filterByLetter('R')}
                 </ul>
                 <h3>S</h3>
                <ul>
                 ${filterByLetter('S')}
                 </ul>
                 <h3>T</h3>
                <ul>
                 ${filterByLetter('T')}
                 </ul>
                 <h3>W</h3>
                <ul>
                 ${filterByLetter('W')}
                 </ul>
                
                `)
        }
    })
})

app.listen(3000, () => {
    console.log('Express listening on port http://localhost:3000');
    
})