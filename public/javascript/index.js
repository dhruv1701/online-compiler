$("#run").click(function(){
    var data=$("#bada").val();
    var input=$("#chotu").val();
    console.log(data);
    $.post("http://localhost:8080/run",{text: data,input:input},function(data1){
        console.log("kasjhd");
    });
    
});
