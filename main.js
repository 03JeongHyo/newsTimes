const API_KEY='adb6c25b08ca44d49fbb42e6e76b75f5';
let newsList = [];
const menu = document.querySelectorAll(".menu button");//메뉴 들고오기
menu.forEach(menu=>menu.addEventListener("click",(event)=> getNewsByCategory(event)))//item을 읽어옴


const getNews = async () => {
    try {
        const response = await fetch(url);
        if (response.status !== 200) { // 상태 코드가 200이 아닌 경우
            const errorData = await response.json();
            showError(`Error: ${errorData.message}`);
            return;
        }
        const data = await response.json(); // await는 async와 사용
        newsList = data.articles;
        render();
    } catch (error) {
        showError('error');
    }
};

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr$apiKey=&{API_KEY}`)

const getLatestNews = async () =>{
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr$apiKey=&{API_KEY}`
      );
      getNews();
};

const getNewsByKeyword=async()=>{
    const keyword = document.getElementById("searchInput").value;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
    getNews();
};

const getNewsByCategory= async(event)=>{
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    getNews();
};

const render=()=>{
    if (newsList.length === 0) {
        document.getElementById("news-board").innerHTML = '<p>No matches for your search</p>';
        return;
    }

    const newsHTML = newsList.map((news)=>
        `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img" src="${news.urlToImage}"/>  
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${news.description}
                </p>
                <div>
                    ${news.source.name}*${news.publishedAt}
                </div>
            </div>
        </div>`
        ).join("");

    console.log("html", newsHTML);
    document.getElementById("news-board").innerHTML =newsHTML //어디에다 뉴스를 붙일지, 여러개 뉴스 만들기
}




getLatestNews();
