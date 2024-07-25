import React, {useState} from "react";
import Github from "../images/icone-github-grise.png";

function Home(){
    const [mode, setMode] = useState("search");
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [crawlState, setCrawlState] = useState("");
    async function handleSubmit(event){
        const url = "https://localhost:8443";
        event.preventDefault();
        setData([]);
        if(mode==="crawl" || mode==="deepcrawl"){
            setCrawlState("Crawling...please be patient");
        }
        let request ="";
        if(mode==="search"){
            request =`/search?query=${search}`;
        }
        else if(mode==="crawl"){
            request = `/crawl?url=${search}`;
        }
        else{
            request = `/deepcrawl?url=${search}`;
        }
        const data = await fetch(url + request, {  
            method:"GET",
            headers:{
                "Content-Type":"application/JSON"
            }
        });
        const parsedData = await data.json();
        if(typeof(parsedData)!=Array)setData(["Unknown error, please try again."])
        setCrawlState("");
        setData(parsedData);
    };
    function handleChange(event){
        const {name, value} = event.target;
        setSearch(value);
        console.log(value);
    }
    
    return(
        <div>
            <div style={{marginTop:"30px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <a a href="https://github.com/thatboytemi/JavaSearchEngine" target="_blank">
                        <img src={Github} alt="github-logo" style={{width:"60px"}}></img>
                    </a>
            </div>
            
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop: "50px"}}>
                <p class="hind-semibold">
                    <span style={{color:"blue"}}>J</span> <span style={{color:"red"}}>A</span> <span style={{color:"yellow"}}>V</span> <span style={{color:"green"}}>A</span> <span>Search Engine</span>
                </p> 
            </div>
            {crawlState!=="Crawling...please be patient"?<div style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px"}}>
                <button onClick={()=>{setMode("search")}} type="button" class="btn btn-outline-primary" style={{marginRight:"10px", color:(mode==="search")?"white":"blue", backgroundColor:(mode==="search")?"blue":"white"}}>Search</button>
                <button onClick={()=>{setMode("crawl")}} type="button" class="btn btn-outline-secondary" style={{marginRight:"10px", color:(mode==="crawl")?"white":"gray", backgroundColor:(mode==="crawl")?"gray":"white"}}>Crawl</button>
                <button onClick={()=>{setMode("deepcrawl")}} type="button" class="btn btn-outline-danger" style={{color:(mode==="deepcrawl")?"white":"red", backgroundColor:(mode==="deepcrawl")?"red":"white"}}>Deep Crawl</button>
            </div>:<div></div>}
            <div class="bar">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} class="searchbar" type="text" title="Search"/>
                </form>
            </div>
            <div className="note">
                <p> {crawlState}</p>
            </div>
            {data.map((entry, i) =>{
                const temp = entry.split("##DELIMETER##");
                return (
                    <div className="note">
                        <p> {temp[0]} <a href={temp[1]} target="_blank"> {temp[1]}</a> </p>
                    </div>
                )
            })}
        </div>
        
    );
}

export default Home;