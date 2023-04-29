const key = 'AIzaSyBMYWEfZOCgkS3kcTBkz-shsPAQmfENdZU';
const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${list}`;
const main = document.querySelector('main');

//youtube api 데이터 호출 url로 부터 데이터 fetching
fetch(url)
	.then((data) => {
		//promise객체로 반환된 데이터를 json형식으로 변환해서 다시 반환
		return data.json();
	})
	.then((json) => {
		//동기적으로 반환된 json데이터에서 배열값을 가져와
		//동적으로 DOM생성
		console.log(json.items);
		let tags = '';

		json.items.forEach((item) => {
			let tit = item.snippet.title;
			let desc = item.snippet.description;
			tit = tit.length > 50 ? tit.substr(0, 50) + '...' : tit;
			desc = desc.length > 200 ? desc.substr(0, 200) + '...' : desc;

			tags += `
        <article>          
          <a class='pic' href=${item.snippet.resourceId.videoId}>
            <img src=${item.snippet.thumbnails.standard.url} alt=${tit} />
          </a>

          <div class='con'>
            <h2>${tit}</h2>
            <p>${desc}</p>
            <span>${item.snippet.publishedAt.split('T')[0]}</span>
          </div>
        </article>
      `;
		});

		main.innerHTML = tags;
	});
