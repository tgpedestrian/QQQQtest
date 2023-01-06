let quesId =sessionStorage.getItem('readQuesId')
// readQaByQuestionnaireTitle(quesId)
let qaList = JSON.parse(sessionStorage.getItem('questionList'))
let queInfo = JSON.parse(sessionStorage.getItem('questionnaireInfo'))

// let qaList = sessionFileList
let que = queInfo
$(document).ready(function() {
   
    // let aa=0
    // let quesId =sessionStorage.getItem('readQues')
    
    // readQaByQuestionnaireTitle(quesId)
    // sessionStorage.removeItem('questionList')
    // sessionStorage.removeItem('questionnaireInfo')

   $('#queName').val(que.title)
   $('#textName').val(que.description)
   $('#strDate').val(que.startTime)
   $('#endDate').val(que.endTime)
   read_all_users(que.title)
   ans_statistics(quesId)
    $.each(qaList, function(index,value){
        $('#epName').val(value.questionnaireTitle)
        // $('#textName').val(item.)
        if(value.oneOrMany == true){
            sel = '多選'
        }else{
            sel = '單選'
        }

        if(value.necessary == true){
            nes = '必填'
        }else{
            nes = '非必填'
        }
        $('#question-list').append(`<tr id="tableRow_${value.questions}"><td><input type="checkbox" name="check1" id="checkboxQusUpdate_${value.questions}"></td<td></td><td id="td1"> ${value.questions}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="updateButton_${value.questions}_${value.id}">編輯</button></td></tr>`);

       
    })
       console.log(qaList); 
    
    })

    $('#changeIntCreate').on('click',function(e){
    
        let queName = $('#queName').val();
        if (check_title_duplicate(queName)) {
            return ;
        }  else {
     
        
        let textName = $('#textName').val();
        let strDate =  $('#strDate').val(); 
        let endDate = $('#endDate').val();
        sessionStorage.setItem('queSessionFile1', JSON.stringify({
            title: queName,
            description: textName,
            startTime:strDate,
            endTime:endDate
        })
        )
        }
        // create_questionnaire(queName, textName, strDate, endDate)
    })



    $(document).on('click','button[id*=updateButton_]',function(e){
        e.preventDefault() 
        let selQuestion = $(this).prop('id').split('_')[1]
    // console.log(selQuestion);
    // console.log($(this).parent('td').parent('tr').index());
    let indexNum = $(this).parent('td').parent('tr').index() - 1
    sessionStorage.setItem('index1',indexNum)
    // let indexNum = sessionFileList.map(x => x.questions).indexOf(selQuestion)
    let updateQes = qaList[indexNum]
    
    // let index = sessionFileList.findIndex((obj => obj.questions === selQuestion))
    console.log(indexNum);
    $('#tab2Question').val(updateQes.questions);
    // if(updateQes.oneOrMany == true){
    //     $('#sel11').val(true)
    // }else{
    //     $('#sel11').val(false)
    // }
    if(updateQes.oneOrMany){
        $('#sel11').val('true')
    }else{
        $('#sel11').val('false')
    }

    
        if(updateQes.necessary){
            $("#check123").prop("checked",true)
        }else {
            $("#check123").prop("checked",false)
        }
        $('#epNameOptions').val(updateQes.ans); 
    
    
     // 將create鈕外觀改成update 新增href屬性 值為被點選的Id
    $('#intRevise').show();
    $('#intCreateBtn2').hide();
        
        
    
    })

    $('#intRevise').on('click',function(e){
        e.preventDefault()
    
        indexNum = sessionStorage.getItem('index1')
    
        // let checkQuestion = sessionFileList.map(x => x.questions).indexOf($('#tab2Question').val())
        // // console.log(checkQuestion)
        // if(checkQuestion != -1){
        //     alert('問題名稱重複123456')
        //     return false
        // }
    

    qaList[indexNum].questions = $('#tab2Question').val();
    qaList[indexNum].ans = $('#epNameOptions').val();
    if($('#sel11').val() === 'true'){
        qaList[indexNum].oneOrMany = true
    }else{
        qaList[indexNum].oneOrMany = false
    }
    
    if($("#check123").is(":checked")){
        qaList[indexNum].necessary = true
    }else{
        qaList[indexNum].necessary = false
    }
    
    
    console.log(qaList);
    $('#question-list').empty()
    let sel1 = ''
    let nes1 = ''
    
    $('#question-list').append(`
        <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>問題</th>
                        <th>種類</th>
                        <th>必填</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    `)
    for(let item of qaList){
    
        if(item.oneOrMany === true){
            sel1 = '多選'
        }else{
            sel1 = '單選'
        }
    
        if(item.necessary){
            nes1 = '必填'
        }else{
            nes1 = '非必填'
        }
        
        $('#question-list').append(`<tr id="tableRow_${item.questions}"><td><input type="checkbox" name="check1" id="checkboxQus_${item.questions}"></td<td></td><td id="td1"> ${item.questions}  </td><td id="td2"> ${sel1} </td><td id="td3"> ${nes1} </td><td id="td4"><button id="updateButton_${item.questions}">編輯</button></td></tr>`);
    }
    
        $('#intRevise').hide();
        $('#intCreateBtn2').show();
        sessionStorage.removeItem('index')
        sessionStorage.setItem('questionList',JSON.stringify(qaList))
        // cleanString()
    })

    $('#changeIntCreate2').on('click',function(e){

        e.preventDefault()

        let questions = $('#tab2Question').val();
    if($('#sel11').val() === 'true'){
        selectedOption = true
    }else{
        selectedOption = false
    }
    if(required11=$("#check123").is(":checked")){
        required11=true
    }else{
        required11=false
    }
    let options = $('#epNameOptions').val(); 
    let checkQuestion = qaList.map(x => x.questions).indexOf(questions)
    
    // console.log(checkQuestion)
    if(checkQuestion != -1){
        alert('問題名稱重複123456')
        return false
    }
    qaList.push({questions:questions, ans:options, oneOrMany:selectedOption, necessary:required11});
    // 將問題存入 Session  
    sessionStorage.setItem('questionList',JSON.stringify(qaList))
    // console.log(sessionFileList)
    let sel='';
    let nes = '';
    if(selectedOption === 'true'){
        sel = '多選'
    }else{
        sel = '單選'
    }

    if(required11){
        nes = '必填'
    }else{
        nes = '非必填'
    }
    
    $('#question-list').append(`<tr id="tableRow_${questions}"><td><input type="checkbox" name="check1" id="checkboxQus_${questions}"></td<td></td><td id="td1"> ${questions}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="btnChange1_${questions}">編輯</button></td></tr>`);
    
    })

    $('#changeIntCreate3').on('click',function(e){

        e.preventDefault()

        // let sessionData = JSON.parse(sessionStorage.getItem('queSessionFile1'));
        let qaList2 = JSON.parse(sessionStorage.getItem('questionList'))
        let title =  $('#queName').val();
        let description =  $('#textName').val();
        let startTime = $('#strDate').val();
        let endTime = $('#endDate').val();

        console.log(description);
console.log(startTime);

        
console.log(qaList2);
        update_questionnaire(quesId,title,description,startTime,endTime,qaList2) 
    })


    $(document).on('click','button[id*=GotofeedbackBtn_]',function(e){
        $('#testtesttt').hide()
        $('#userInfo').show()
        $('#topic1').empty()
       $.each(qaList, function(index,value){
        let num = index + 1
        $('#topic1').append(`<p>${num}. ${value.questions}</p>`)
        let allAns = value.ans.split(';')
        for(let item of allAns){
            $('#topic1').append(`<input type="checkbox" id="${value.questions}_${item}"><label>${item}</label>`)
            
            console.log(item);
        }
        
       })
       $('#topic1').append(`<br><br><button id="backFeedbackBtn">返回</button>`)
       let usersId = $(this).prop('id').split('_')[1]
       read_user_info(usersId)


       $('#backFeedbackBtn').on('click',function(e){
        e.preventDefault()
        $('#userInfo').hide()
        $('#testtesttt').show()
        console.log('222');

        })
    })




    