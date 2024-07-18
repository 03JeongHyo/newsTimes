const API_KEY='adb6c25b08ca44d49fbb42e6e76b75f5';
let newsList = [];

const getLatestNews = async () =>{
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
      );
    const response = await fetch(url);
    const data = await response.json(); // await는 async와 사용
    newsList = data.articles;
    render();
    console.log("Ss",newsList);

};

const render=()=>{
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
