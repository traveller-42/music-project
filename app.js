const searchSong = async() =>{
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try{ 
        const res =await fetch(url);
        const data =await res.json();
        displaySong(data.data) 
    }
    catch(error){
        displayError("Something Went Wrong,please try again later...");
    }
}
const displaySong = songs =>{
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML="";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList='single-result row align-items-center my-3 p-3';
        songDiv.innerHTML=`
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
         </div>
         <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
         </audio> 
         <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
         </div>`
        songContainer.appendChild(songDiv);
    });
}
const getLyric = async(artist , title) => {
    const url =`https://api.lyrics.ovh/v1/${artist}/${title}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics);
    }
    catch(error){
        displayError("Something Went Wrong,please try again later...");
    }
} 
const displayLyric =lyrics=>{
    const lyricDiv = document.getElementById('song-lyrics');
    lyricDiv.innerText=lyrics;
}
const displayError = error=>{
    const errorTag = document.getElementById('error-message');
    errorTag.innerText=error;
}