const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.port || 5660;
const fs = require('fs');
const path = require('path');
const { title } = require('process');

const party_songs = [
    {id:1 , title: 'Blue Eyes 3' , filepath: "1.mp3"},
    {id:2 , title: 'Chull feat badshah' , filepath: "2.mp3"},
    {id:3 , title: 'daaru_party_1' , filepath: "Daaru_Party_1.mp3" },
    {id:4 , title: 'get up jawani' , filepath: "Get Up Jawani.mp3"},
    {id:5 , title: 'jaguar' , filepath: "Jaguar.mp3"},
    {id:6 , title: 'kala chashma 2' , filepath: "Kala Chashma 2.mp3" },
    {id:7 , title: 'morni banke bhadhai ho' , filepath: "Morni Banke Badhaai Ho.mp3"},
    {id:8 , title: 'nacho nacho 8' , filepath: "Nacho Nacho 8.mp3" },
    {id:9 , title: 'patola' , filepath: "Patola.mp3"},
    {id:10 , title: 'saiyaan ji' , filepath: "Saiyaan Ji.mp3"},
    {id:10 , title: 'saawan mein lag gyi aag' , filepath: "Saawan Mein Lag Gayee Aag.mp3" },
    
]
const retro_songs = [
    {id:1 , title: 'song 1' , filepath: "retro_songs/Aao Huzoor Tumko - Kismat.mp3"},
    {id:2 , title: 'song 2' , filepath: "retro_songs/Ajib Dastan Hai Yeh.mp3"},
    {id:3 , title: 'song 3' , filepath: "retro_songs/Chupke Chupke Raat Din - Nikaah 128 Kbps.mp3"},
    {id:4 , title: 'song 4' , filepath: "retro_songs/Lag Ja Gale Se Phir - Woh Kaun Thi 128 Kbps.mp3"},
    {id:5 , title: 'song 5' , filepath: "retro_songs/Piya Tose Naina Lage Re 128 Kbps.mp3"},
    {id:6 , title: 'song 6' , filepath: "retro_songs/Tum Bin Jaoon Kahan - Pyar Ka Mausam 128 Kbps.mp3"},

]
const bollywood_songs = [
    {id:1 , title: 'song 1' , filepath: "bollywood_songs/Dance ka Bhoot(PagalWorld.com.se).mp3"},
    {id:2 , title: 'song 2' , filepath: "bollywood_songs/Deva Deva(PagalWorld.com.se).mp3"},
    {id:3 , title: 'song 3' , filepath: "bollywood_songs/Guli Mata(PagalWorld.com.se).mp3"},
    {id:4 , title: 'song 4' , filepath: "bollywood_songs/Janiye(PagalWorld.com.se).mp3"},
    {id:5 , title: 'song 5' , filepath: "bollywood_songs/Manike(PagalWorld.com.se).mp3"},
    {id:6 , title: 'song 6' , filepath: "bollywood_songs/Tere Hawaale(PagalWorld.com.se).mp3"},
    {id:7 , title: 'song 7' , filepath: "bollywood_songs/Tere Vaaste Main Falak Se Chand Launga(PagalWorld.com.se).mp3"},
    {id:8 , title: 'song 8' , filepath: "bollywood_songs/Tum Kya Mile(PagalWorld.com.se).mp3"},
    {id:9 , title: 'song 9' , filepath: "bollywood_songs/What Jhumka(PagalWorld.com.se).mp3"},
]
const english_songs = [
    {id:1 , title: 'song 1' , filepath: "english_songs/Anyone(PaglaSongs).mp3"},
    {id:2 , title: 'song 2' , filepath: "english_songs/As-It-Was(PagalWorld).mp3"},
    {id:3 , title: 'song 3' , filepath: "english_songs/Calm Down Calm Down(PaglaSongs).mp3"},
    {id:4 , title: 'song 4' , filepath: "english_songs/Cold Water(Mr-Jatt1.com).mp3"},
    {id:5 , title: 'song 5' , filepath: "english_songs/Dandelions(PaglaSongs).mp3"},
    {id:6 , title: 'song 6' , filepath: "english_songs/Fly By Midnight - Automatic (feat. Jake Miller) (Official Video).mp3"},
    {id:7 , title: 'song 7' , filepath: "english_songs/Heat-Waves(PagalWorld).mp3"},
    {id:8 , title: 'song 8' , filepath: "english_songs/Sunflower (Spider-Man_ Into the Spider-Verse)(PagalWorld).mp3"},
    {id:9 , title: 'song 9' , filepath: "english_songs/Until-I-Found-You(PagalWorld).mp3"},

]
app.use(bodyparser.json());

app.get('/partysongs' , (req , res)=>{
    res.json(party_songs);
})
app.get('/retrosongs' , (req , res)=>{
    res.json(retro_songs);
})
app.get('/bollywoodsongs' , (req , res)=>{
    res.json(bollywood_songs);
})
app.get('/englishsongs' , (req , res)=>{
    res.json(english_songs);
})
app.get('/play' , (req , res)=>{
    const axios = require('axios');
    const apiUrl = 'http://localhost:5660/englishsongs'; // Replace with the API endpoint URL
    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        console.log(data); // Process the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
})

app.get('/songs' , (req, res)=>{
    const songid = req.params.id;
    const song = party_songs.find(s => s.id === songid);
    console.log(song)
    if (!song) {
    return res.status(404).json({ error: 'Song not found' });
  }
    res.json(song)
})
app.get('/playaudio' , (req , res)=>{
    const songId = req.params.id;

    const audioFilePath = path.join(__dirname, `${songId}.mp3`);
    console.log(audioFilePath)
    const audioStream = fs.createReadStream(audioFilePath);
    audioStream.pipe(res);
   
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});