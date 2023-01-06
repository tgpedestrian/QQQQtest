
let pageNumber = 0;
function read_all_questionnaire() {
    let ary =[];
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page" class="page-btn">上一页</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page" class="page-btn">下一页</button>';

$.ajax({
    url: "http://localhost:8080/read_all_questionnaire",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
    
        $('#table1').empty()
        $('#table1').append(`<thead><th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th></thead>`);
        let {message,questionnaireList } = response
        // for(let item of questionnaireList){

        //     }

            changePage(1, questionnaireList);
            
    
    var page = document.querySelector('.page_btn'); //要塞按鈕的位置
    
    var btnNum = Math.ceil(questionnaireList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕
    console.log(btnNum + "btnNum")
    
    var str = '';

    // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
    for (var i = 0; i < btnNum; i++) {

        //    str += `<a href="#"><span>${(i + 1)}</span></a>`
           str += `<span>${(i + 1)}</span>`
        
           
        
    };

    // //塞進html元素中的容器
    page.innerHTML = suppage + str + nextpage;

    // //使用 querySelectorAll 選出下面所有的按鈕
    var btn = document.querySelectorAll('.page_btn span')

    // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', changePage.bind(this, (i + 1), questionnaireList))
    }

    // //監聽上一頁、下一頁
    const nextPageBtn = document.querySelector('#next-page');
    const supPageBtn = document.querySelector('#sup-page');
    supPageBtn.addEventListener('click', (e) => {
       e.preventDefault()
        alert(pageNumber+"Api")
        if (pageNumber <= 1) {
            alert("回到第一頁")
            changePage(1, questionnaireList);
        } else {

            //回到當前頁面的上一筆
            changePage(pageNumber - 1, questionnaireList);
        }
    });

    nextPageBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (pageNumber >= btn.length) {
            alert("回到最後一頁")
            changePage(pageNumber, questionnaireList);
        } else {
            //回到當前頁面的下一筆
            changePage(pageNumber + 1, questionnaireList);
        }
    });

    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})}



// })


//刪除問卷
function delete_questionnaire(questionnaireIdList) {
    let objPostData = {
        titleList: questionnaireIdList
    }
$.ajax({
    url: "http://localhost:8080/delete_questionnaire",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        let { message } = response
        alert(message)
        window.location.reload();
    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})
}

//顯示指定問卷的問答內容 req 需有QuestionnaireId
function readQaByQuestionnaireTitle(questionnaireId) {
    
    let objPostData = {
        questionnaireId: questionnaireId,
    }
$.ajax({
    url: "http://localhost:8080/read_Qa_by_title",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        
        // window.location.href="questionnaire/questionnaire2.html"
        let { message ,qaList, title,description,startTime,endTime} = response
        // alert(message)
        // window.location.href='http://127.0.0.1:5501/questionnaire/questionnaire.html'
        let sel = ''
        let nes = ''

        let questionnaireInfo = {title:title,description:description,startTime:startTime,endTime:endTime}
        sessionStorage.setItem('questionnaireInfo', JSON.stringify(questionnaireInfo))
        
        sessionStorage.setItem('questionList',JSON.stringify(qaList))
       
        // window.location.href='questionnaire/questionnaire2.html'
        
    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})
}

//修改問卷
function update_questionnaire(questionnaireId,title,description,startTime,endTime,qaList) {
    let objPostData = {
        questionnaireId:questionnaireId,
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
        qaList: qaList
    }
$.ajax({
    url: "http://localhost:8080/update_questionnaire",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        let { message } = response
        alert(message)
    

        
    },
    error: function (e) {
        console.log(e)
        alert('Failed')
    },
})
}


//搜尋
function search(title, startTime, endTime) {
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page2" class="page-btn">上一页</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page2" class="page-btn">下一页</button>';

    let objPostData = {
    title: title,
    startTime:startTime,
    endTime:endTime
    }
$.ajax({
    url: "http://localhost:8080/search",
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(objPostData),
    success: function (response) {
        let { message ,questionnaireList} = response
        alert(message)

        // $('#table1').empty()
        // $('#table1').append(`<th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th>`);

        // for(let item of questionnaireList){
           
        //     let time = new Date();
        //     let status=""
        //     if(time < new Date(item.startTime) || time > new Date(item.endTime)){
        //             status = '未開放'
        //         }else{
        //         status = '開放'
        //     }
        //     $('#table1').append(`<tbody id="myTbody"><tr><td><input type="checkbox" name="check1" id="ckb_${item.id}_${item.title}"></td><td>${item.id}</td><td><button id="hrefQues_${item.id}" class="test123456">${item.title}</button></td><td>${status}</td><td>${item.startTime}</td><td>${item.endTime}</td>><td><input type="button" value="前往" id="btn_${item.id}"></td></tr></tbody>`);
        //     // var length =  questionnaireList.length  
        //     // sessionStorage.setItem('12345',  JSON.stringify({
        //     //         length: length,
        //     //     })
        //         // )
        //     }
            changePage(1, questionnaireList);
            
    
            var page = document.querySelector('.page_btn'); //要塞按鈕的位置
            
            var btnNum = Math.ceil(questionnaireList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕
            console.log(btnNum + "btnNum")
            
            var str = '';
        
            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
        
                   str += `<a href="#"><span>${(i + 1)}</span></a>`
                
                   
                
            };
        
            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;
        
            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btn span')
        
            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePage.bind(this, (i + 1), questionnaireList))
            }
        
            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page2');
            const supPageBtn = document.querySelector('#sup-page2');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {
                    alert("回到第一頁")
                    changePage(1, questionnaireList);
                } else {
        
                    //回到當前頁面的上一筆
                    changePage(pageNumber - 1, questionnaireList);
                }
            });
        
            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {
                    alert("回到最後一頁")
                    changePage(pageNumber, questionnaireList);
                } else {
                    //回到當前頁面的下一筆
                    changePage(pageNumber + 1, questionnaireList);
                }
            });    
        
        
            
        
        
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
    }
function changePage(page, data) {
    //全域變數:用於得知當前頁數
    pageNumber = page;
    console.log(pageNumber + "頁")
    
    //代表每頁出現 10 筆資料
    var items = 10;

    //按鈕按下 1，會出現 1～10筆資料，但陣列索引值卻是 0～9 的資料，以此類推
    var pageIndexStart = (page - 1) * items
    var pageIndexEnd = page * items

    //每次近來這function先清空
    $('#table1').empty()
    $('#table1').append(`<th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th>`);

    //索引1-10資料
    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= data.length) { break; }
        let num = i + 1;

        //解構，看第幾筆資料

        let item = data[i]
        let time = new Date();
        let status=""
        if(time < new Date(item.startTime) || time > new Date(item.endTime)){
                status = '未開放'
            }else{
            status = '開放'
        }
        openOrClosure = "";
        
            $('#table1').append(`<tbody id="myTbody"><tr><td><input type="checkbox" name="check1" id="ckb_${item.id}_${item.title}"></td><td>${item.id}</td><td><button id="hrefQues_${item.id}" class="test123456">${item.title}</button></td><td>${status}</td><td>${item.startTime}</td><td>${item.endTime}</td>><td><input type="button" value="前往" id="btn_${item.id}"></td></tr></tbody>`);
        }
};