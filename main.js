const API_KEY='adb6c25b08ca44d49fbb42e6e76b75f5';  //adb6c25b08ca44d49fbb42e6e76b75f5
let newsList = [];
const menu = document.querySelectorAll(".menu button");//메뉴 들고오기
menu.forEach(menu=>menu.addEventListener("click",(event)=> getNewsByCategory(event)))//item을 읽어옴
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`)
let totalResults = 0;
let page = 1;
let pageSize = 10;
let groupSize = 5;



const getNews = async () => {
    try {
        url.searchParams.set("page",page)// &page = page , page라는 파라미터 세팅, 그 값은 page이다.
        url.searchParams.set("pageSize",pageSize);

        const response = await fetch(url);  
        const data = await response.json(); //await는 async와 사용
        console.data = ("data", data);
        if (response.status === 200) { // 상태 코드가 200인 경우, 정상적인 경우
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.log("error", error.message);
        errorRender(error.message);
    }
};


const getLatestNews = async () =>{
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
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

const errorRender = (errorMessage)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML=errorHTML;
};
const paginationRender = ()=>{

    const totalPages= Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);

    //first, last page
    let lastPage = pageGroup * groupSize;
    if(lastPage>totalPages){
        lastPage=totalPages;
    }

    let firstPage = lastPage - (groupSize-1)<=0? 1:lastPage - (groupSize-1);
    if (totalPages <= groupSize) {
        lastPage = totalPages;
        firstPage = 1;
    }

    let paginationHTML= '';
    if (page >1){
        paginationHTML +=
    `<li class="page-item" onclick="moveToPage(1)">
      <a class="page-link" href="#js-bottom"><i class="fa-solid fa-backward"></i></a>

    <li class="page-item" onclick="moveToPage(${page - 1})">
      <a class="page-link" href="#"><i class="fa-solid fa-arrow-left"></i></a>
    </li>`;
    }

    for(let i = firstPage; i<=lastPage; i++){
        paginationHTML += `<li class="page-item ${i=== page? "active": ""
        }"onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }
    if (page < totalPages) {
    paginationHTML +=
    `<li class="page-item"onclick="moveToPage(${page+1})">
      <a class="page-link" href="#"><i class="fa-solid fa-arrow-right"></i></a>
    </li>
    <li class="page-item" onclick="moveToPage(${totalPages})">
                         <a class="page-link" href="#js-bottom"><i class="fa-solid fa-forward"></i></a>
                       </li>`;
    }
    document.querySelector(".pagination").innerHTML = paginationHTML
};

const moveToPage=(pageNum)=>{
    console.log("moveToPage",pageNum);
    page = pageNum;
    getNews();
};


getLatestNews();
/*<li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>*/