
$( window ).on( "load", function() {
    
    t=sessionStorage.getItem('uniquetoken')
   
    function showdata(users)
    {
        $("#div").removeClass("display2");
            $("#div").addClass("display1");
        var user_data='';
        $.each(users.data,function(i,user){
            id=user.id
            user_data += '<tr>'
            user_data += '<td>' +user.id+ '</td>'
            user_data += '<td>' +user.username+ '</td>'
            user_data += '<td>' +user.email+ '</td>'
            user_data += '<td>' +user.phone+ '</td>'
            user_data += '<td>' +'<button type="button" class="btn btn-primary" id="button1" onclick="view1('+id+')" data-id="{{id}}"> View</button>'+ '</td>'
            user_data += '<td>' +'<button type="button" class="btn btn-primary" id="delete" onclick="Delete('+id+')" data-id="{{id}}"> Delete</button>'+ '</td>'
            user_data += '</tr>'
        });
        $('#usertable').append(user_data);
    }
    $.ajax({
       
        type:"GET",    
        datatype: 'JSON',
        url: "http://localhost:3000/api/v1/users",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+t
            },
        success:
            function (users){

                showdata(users);

            },
        error:
        function()
        {
            $("#usertable").removeClass("display2");
            $("#usertable").addClass("display1");
        }

        });
});
// /----------------Redirect to view page---------------/
function view1(id)
{
    user_id=id;
    window.location.href = "edit.html?id="+user_id;
}
// /--------------------delete user data--------------
function Delete(id)
{
    user_id=id;
    $.ajax
    ({
        type:"DELETE",    
        datatype: 'JSON',
        url: "http://localhost:3000/api/v1/users/"+$(this).attr("user_id"),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+t
            },
        success:function (users)
        {
            temp=users.data;
            $(temp).remove();
            window.location.reload();
              
        }   
    });
}

