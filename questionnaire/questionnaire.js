// 問卷預設_開始時間當日，結束時間+7天
$(document).ready(function() {
    var strToday = new Date();
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    $('#strDate').attr('min', strToday.toISOString().substring(0, 10));
    $('#strDate').val(strToday.toISOString().substring(0, 10));
    $('#endDate').val(endDate.toISOString().substring(0, 10));

    $("#li-tab1").click(function() {
        $("#li-tab3, #li-tab4").prop("disabled", true);
    })
});
//問卷_開始日期不能大於結束日期  
$('#strDate').change(function() {
    var strDay = new Date($(this).val());
    var endDate = new Date($('#endDate').val());

    if (strDay > endDate) {
    $('#endDate').val($(this).val());
    }   
});
//問卷_結束日期不能小於開始日期
$('#endDate').change(function() {
    
    var strDay = new Date($('#strDate').val());
    var endDate = new Date($(this).val());

    if (endDate < strDay) {
    $('#strDate').val($(this).val());
    }
});
///////////////-----------問卷--------------////////////////
$('#intCreate1').on('click',function(e){
    
    let queName = $('#queName').val();
    if (check_title_duplicate(queName)) {
        return ;
    }  else {
 
    
    let textName = $('#textName').val();
    let strDate =  $('#strDate').val(); 
    let endDate = $('#endDate').val();
    sessionStorage.setItem('queSessionFile', JSON.stringify({
        title: queName,
        description: textName,
        startTime:strDate,
        endTime:endDate
    })
 )}

    // $('#li-tab2').toggle();
    // $('#li-tab2').find('a').trigger('click');
    
    // create_questionnaire(queName, textName, strDate, endDate)
})
//////////////////////////////////////////
// var config={active: 2, disabled: [0,3]};
// $("#tab").tabs(config);



////////////////////////////////////////////////////////////

// $('#backBtn').on('click',function(e){
// e.preventDefault()
//     $('#li-tab1').trigger('click')
// })

///////////////////////////////////

let sessionFileList = [];
//////////////-------題目加入到暫存--------------////////////////
$('#intCreateBtn2').on('click', function(e) {
    e.preventDefault(); 
    let questions = $('#tab2Question').val();
    let selectedOption = $('#sel11').val();
    if(required11=$("#check123").is(":checked")){
        required11=true
    }else{
        required11=false
    }
    let options = $('#epNameOptions').val(); 
    let checkQuestion = sessionFileList.map(x => x.questions).indexOf(questions)
    // console.log(checkQuestion)
    if(checkQuestion != -1){
        alert('問題名稱重複123456')
        return false
    }
    sessionFileList.push({questions:questions, ans:options, oneOrMany:selectedOption, necessary:required11});
    // 將問題存入 Session  
    sessionStorage.setItem('qaList',JSON.stringify(sessionFileList)); 
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
    cleanString() ;
})
//清空input
function cleanString(){
    document.getElementById("tab2Question").value = "";
    document.getElementById("epNameOptions").value = "";
    document.getElementById("check123").checked = false;
    document.getElementById("sel11").value = false;
}

//////////////-------題目表單送出--------------//////////////
$('#intCreate2').on('click', function(e) {

    let sessionData = JSON.parse(sessionStorage.getItem('queSessionFile'));
    let title = sessionData.title;
    let description = sessionData.description;
    let startTime = sessionData.startTime;
    let endTime = sessionData.endTime;
    let qaList = JSON.parse(sessionStorage.getItem('qaList'))
    console.log(sessionData);
    create_questionnaire2(title, description, startTime, endTime, qaList)
}
);


///////////////-----------題目修改--------------////////////////
$(document).on('click','button[id*=btnChange1]',function(e){
    e.preventDefault() 
    let selQuestion = $(this).prop('id').split('_')[1]
// console.log(selQuestion);
// console.log($(this).parent('td').parent('tr').index());
let indexNum = $(this).parent('td').parent('tr').index() - 1
sessionStorage.setItem('index',indexNum)
// let indexNum = sessionFileList.map(x => x.questions).indexOf(selQuestion)
let updateQes = sessionFileList[indexNum]

// let index = sessionFileList.findIndex((obj => obj.questions === selQuestion))
console.log(indexNum);
$('#tab2Question').val(updateQes.questions);
    $('#sel11').val(updateQes.oneOrMany);
    if(updateQes.necessary){
        $("#check123").prop("checked",true)
    }
    $('#epNameOptions').val(updateQes.ans); 


 // 將create鈕外觀改成update 新增href屬性 值為被點選的Id
$('#intRevise').show();
$('#intCreateBtn2').hide();
    
    

})

/////////////////////////////////////
$('#intRevise').on('click',function(e){
    e.preventDefault()

    indexNum = sessionStorage.getItem('index')

    // let checkQuestion = sessionFileList.map(x => x.questions).indexOf($('#tab2Question').val())
    // // console.log(checkQuestion)
    // if(checkQuestion != -1){
    //     alert('問題名稱重複123456')
    //     return false
    // }

sessionFileList[indexNum].questions = $('#tab2Question').val();
sessionFileList[indexNum].ans = $('#epNameOptions').val();
sessionFileList[indexNum].oneOrMany = $('#sel11').val();
if($("#check123").is(":checked")){
    sessionFileList[indexNum].necessary = true
}else{
    sessionFileList[indexNum].necessary = false
}


console.log(sessionFileList);
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
for(let item of sessionFileList){

    if(item.oneOrMany === 'true'){
        sel1 = '多選'
    }else{
        sel1 = '單選'
    }

    if(item.necessary){
        nes1 = '必填'
    }else{
        nes1 = '非必填'
    }
    
    $('#question-list').append(`<tr id="tableRow_${item.questions}"><td><input type="checkbox" name="check1" id="checkboxQus_${item.questions}"></td<td></td><td id="td1"> ${item.questions}  </td><td id="td2"> ${sel1} </td><td id="td3"> ${nes1} </td><td id="td4"><button id="btnChange1_${item.questions}">編輯</button></td></tr>`);
}

    $('#intRevise').hide();
    $('#intCreateBtn2').show();
    sessionStorage.removeItem('index')
    // cleanString()
})

///////////題目刪除//////////////////
$('#deleteQusBtn').on('click',function(e){
    e.preventDefault()
    
    let delIds = []
    $('[id*=checkboxQus]:checked').each(function(){
        if($(this).prop('checked') == true){
            // console.log($(this).prop('id'));
            // $(this).prop('id').split('_')[1]
            delIds.push($(this).prop('id').split('_')[1])
        }
        for(let item of delIds){
            $('#tableRow_'+ item).remove()
            sessionFileList = sessionFileList.filter(function(x){
                return x.questions !== item
            })
        }
        sessionStorage.setItem('qaList',JSON.stringify(sessionFileList));
        console.log(delIds);
        console.log(sessionFileList);
    })
})

////////////////顯示指定問卷的問答內容/////////
$(document).on('click','button[id*=hrefQues]',function(e){
    e.preventDefault()
    // $(this).prop('href', 'questionnaire/questionnaire2.html')
    let quesId = $(this).prop('id').split('_')[1]
    console.log(quesId);
    sessionStorage.setItem('readQuesId',quesId)
    readQaByQuestionnaireTitle(quesId)
    // sessionStorage.setItem('readQuesId',quesId)
    // readQaByQuestionnaireTitle(quesId)
    // readQaByQuestionnaireTitle(questionnaireId)
    window.location.href="Revisebackstage/Revisebackstage.html"
    // $(document).ready(function() {
    //     // let aa=0
    //     let{
    //     quesId
    // }
    //     =JSON.parse(sessionStorage.getItem('readQues'))
    //     console.log(quesId);
        
    //     readQaByQuestionnaireTitle()
    // // readQaByQuestionnaireTitle($(this).prop('id').split('_')[1])
    // // readQaByQuestionnaireTitle(quesId)
    // console.log('aaa');
// }
    
})
// $(document).ready(function() {
    
//     // let aa=0
//     let quesId =sessionStorage.getItem('readQues')
//     if(quesId){
//     readQaByQuestionnaireTitle(quesId)
//     console.log(quesId);
       
//     }
//     })

//////////////////////////////////////





