var classes = ["Free"];

var init = function(){
  $("#newclass").keyup(function(event){
    if(event.keyCode == 13){
        $("#addclass").click();
    }
  });
  
  for(i=0;i<=document.getElementsByClassName("class-selection").length;i++){
      var newoption = document.createElement("OPTION");
      newoption.innerHTML = "Free Period";
      document.getElementsByClassName("class-selection")[i].appendChild(newoption);
      document.getElementsByClassName("class-selection")[i].onchange = function(){cellcolor(this,this.value)};
  }
}

var randomcolor = function(){
    var possiblehexadigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    var randomhexadigit = function(){
      var randomforpossiblehexadigits = Math.floor((Math.random() * 16) + 0);
      return possiblehexadigits[randomforpossiblehexadigits];
    }
    var randomcolor = '#' + randomhexadigit() + randomhexadigit() + randomhexadigit() + randomhexadigit() + randomhexadigit() + randomhexadigit();
    
    var randomcolor = Please.make_color({saturation:.7});
    return randomcolor;
  }

var newclass = function(){
  if(document.getElementById("newclass").value != "" && document.getElementById("newclass").value != null){
    var classtobeadded = document.getElementById("newclass").value;
    classes.push(classtobeadded);
    var newclasselement = document.createElement("LI");
    newclasselement.innerHTML = '<input type="color" value="'+randomcolor()+'" class="list-colorblock" onchange="classcolor(this);"/><p>' + classtobeadded + '</p><div class="classdelete" onclick="deleteclass(this.parentElement)">x</div>';
    document.getElementById("classlist").appendChild(newclasselement);
    
    document.getElementById("newclass").value = "";
    
    for(i=0;i<=document.getElementsByClassName("class-selection").length;i++){
      var newoption = document.createElement("OPTION");
      newoption.innerHTML = classtobeadded;
      document.getElementsByClassName("class-selection")[i].appendChild(newoption);
    }
    
  }
}

var deleteclass = function(classtobe){
  var classname = classtobe.value;
  document.getElementById("classlist").removeChild(classtobe);
  
  var index = classes.indexOf(classname);
  if (index !== -1) {
    classes.splice(index, 1);
  }
  
  for(i=0;i<=document.getElementsByClassName("class-selection").length;i++){
      for(s=0;s<=document.getElementsByClassName("class-selection")[i].getElementsByClassName("option").length;s++){
        if(document.getElementsByClassName("class-selection")[i].getElementsByClassName("option")[s].textContent == classname){
          document.getElementsByClassName("class-selection")[i].removeChild(getElementsByClassName("option")[s]);
        }
      }
  }
}

var classcolor = function(element){
  var classname = element.parentElement.getElementsByTagName("p")[0].textContent;
  var classcolor = element.value;
  for(i=0;i<=document.getElementsByTagName("select").length;i++){
    if(document.getElementsByTagName("select")[i].value == classname){
      document.getElementsByTagName("select")[i].parentElement.style.backgroundColor = classcolor;
    }
  }
}

var cellcolor = function(element, selection){
//  console.log("changing color");
  for(i=0;i<=document.getElementsByTagName("li").length;i++){
//    console.log("li");
    if(document.getElementsByTagName("li")[i].getElementsByTagName("p")[0].textContent == selection){
      var classcolor = document.getElementsByTagName("li")[i].getElementsByClassName("list-colorblock")[0].value;
//      console.log(classcolor);
      element.parentElement.style.backgroundColor = classcolor;
    }
    if(selection == "Free Period"){
      element.parentElement.style.backgroundColor = "transparent";
    }
  }
}

var helperhide = function(){
  document.getElementById("helper").style.display = "none";
  document.getElementById("dropdowncenter").style.webkitFilter = "blur(0px)";
  document.body.style.backgroundColor = "#ffffff";
}

var classeswithcolors = [{"title":"Free Period", "color":"#ffffff"},{"title":"Break", "color":"#ffffff"}];
var save = function(){
  var classeshtml = document.getElementsByTagName("li");
  for(i=0;i<=classeshtml.length;i++){
    var thisclasstitle = classeshtml[i].getElementsByTagName("p")[0].textContent;
    var thisclasscolor = classeshtml[i].getElementsByClassName("list-colorblock")[0].value;
    console.log("Class: " + thisclasstitle + ", Color: " + thisclasscolor);
    var thisclassjsondocument = {"title":thisclasstitle, "color": thisclasscolor};
    classeswithcolors.push(thisclassjsondocument);
    console.log(thisclassjsondocument);
  }
  console.log(classeswithcolors);
  document.getElementById("invisiclassesjson").value = classeswithcolors;
}