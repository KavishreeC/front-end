// /---------------------show data---------------------/
$( window ).on( "load", function() {
    token = sessionStorage.getItem('uniquetoken')
    function GetURLParameter(sParam)
        {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) 
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) 
                {
                    return sParameterName[1];
                }
             }
        }
    var user_id = GetURLParameter('id');
 
    // console.log("succes",user_id);
    // console.log("token",t);
    view(user_id);
    function view(btn1)
    {
       
      
        btn=btn1;
        function showdata(temp)
        {
            $("#div").removeClass("display2");
            $("#div").addClass("display1");
            var show_data='';
            u=temp.data;
            id=u.id
            show_data += '<ul>'
            show_data += '<li>'+'user id      : '+' '+u.id+ '</li>'
            show_data += '<li>'+'user name    : ' +''+u.username+ '</li>'
            show_data += '<li>' +'user email  : ' +''+u.email+ '</li>'
            show_data += '<li>' +'user phone  : ' +''+u.phone+ '</li><br/>'
            show_data += '<span>' +'<button type="button" class="btn btn-primary" id="editbtn" onclick="edit('+id+')" data-id="{{id}}"> Edit</button>  '+ '</span>'
            show_data += '<span>' +'<button type="button" class="btn btn-primary" id="backbtn" onclick="back()"> Back</button>'+ '</span>'
            show_data += '</ul>'
            // console.log("success",temp);
            $('#showtable').append(show_data);
        }
        $.ajax
        ({
            type:"GET",    
            datatype: 'JSON',
            url: "http://localhost:3000/api/v1/users/"+$(this).attr("btn"),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+token
                },
            success:function (temp){
            showdata(temp);
            },
            error:
            function()
            {
                
                $("#show").removeClass("display2");
                $("#show").addClass("display1");
            }
           
        });
    }
});
     
    // ..................................edit...............
// function edit(id)
// {
//     get_id=id;
//     window.location.href = "update.html?id="+get_id;

// }


// -------------------------------edit-----------------------------------------------
function edit(id)
{
   
    token = sessionStorage.getItem('uniquetoken')
    $(".form").addClass("display2");
    userid=id;
    
    $save=$(".savebtn");
    $cancel=$(".cancel");
    $cancel.html('<button type="button" class="btn btn-primary" onclick="cancel()">Cancel</button>');
    $save.html('<button type="button" class="btn btn-primary" onclick="save('+userid+')">Save</button>');
    $.ajax
    ({
        type:"GET",    
        datatype: 'JSON',
        url: "http://localhost:3000/api/v1/users/"+$(this).attr("userid"),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+token
            },
        success:
        function (temp){
            editdata(temp);
        },
        
    });
    function editdata(temp)
    {
        var show_data='';
        u=temp.data;
        id=u.id,
        name=u.username,
        email=u.email,
        phone=u.phone
        console.log("edit data",id,email,name,phone);
        $("#id").val(id);
        $("#username").val(name);
        $("#email").val(email);
        $("#phone").val(phone)
    }
}

function save(id)
{
    token = sessionStorage.getItem('uniquetoken')
    u_id=id;
    
    console.log("save",token)
    $form=$(".form")
    var user = 
    {
      id: $form.find('input#id').val(),
      username: $form.find('input#username').val(),
      email: $form.find('input#email').val(),
      phone: $form.find('input#phone').val(),
    }
    console.log("getting from data",user)
    $.ajax({
        type:"PUT",    
        datatype: 'JSON',
        url: "http://localhost:3000/api/v1/users/"+$(this).attr("u_id"),
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer "+token
            },
        data:user,
        success:
        function (temp){
            display(temp);
            $(".form").removeClass("display2");
            $(".form").addClass("display1");
        },
        error: function()
        {
           alert("error updating order")
        }
    });
    function display(temp)
    {
        var show_data='';
        u=temp.data;
        id=u.id
        show_data += '<ul>'
        show_data += '<li>'+'user id      : '+' '+u.id+ '</li>'
        show_data += '<li>'+'user name    : ' +''+u.username+ '</li>'
        show_data += '<li>' +'user email  : ' +''+u.email+ '</li>'
        show_data += '<li>' +'user phone  : ' +''+u.phone+ '</li><br/>'
        show_data += '<span>' +'<button type="button" class="btn btn-primary" id="button1" onclick="edit('+id+')" data-id="{{id}}"> Edit</button>  '+ '<span>'
        show_data += '<span>' +'<button type="button" class="btn btn-primary" id="button1" onclick="back()"> Back</button>'+ '</span>'
        show_data += '</ul>'
        $('#showtable').html(show_data);
    }
}
// /-------------------save-------------------/
function back()
{
  window.location.href="sample.html"
}

function cancel()
{
    $(".form").removeClass("display2");
    $(".form").addClass("display1");
}