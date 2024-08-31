const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap' // the href attributes from Wikipedia might be relative
const alphabet =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const alphabetObject = {}

app.get('/',(req,res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            const pageTitle = $('h1').text()
            const p = $('p')

            //console.log(p);
            

            const links = [];
            const titles = [];
            const images = [];
            const texts = [];

            $('#mw-pages a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)

                //console.log(links);
                
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
            console.log('------------------------');8   
            links.forEach(link => {
                //console.log(link.split('/wiki/').join('')[0]);
                const word =link.split('/wiki/').join('')
                const firstLetter = link.split('/wiki/').join('')[0].toLowerCase()
                
                !alphabetObject[firstLetter] ?  alphabetObject[firstLetter] = [word] : alphabetObject[firstLetter].push(word)
                
                

                
            });
            console.log('------------------------');
            console.log(alphabetObject);
            
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Subcategorias</h2>
                <p>${texts} </p>
                <h3>
                <ul>
                    ${links.sort().map(link => `<li><a href="https://es.wikipedia.org${link}">${link}</a></li>`).join('')} 
                </ul>
                `)
        }
    })
})

app.listen(3000, () => {
    console.log('Express listening on port http://localhost:3000');
    
})