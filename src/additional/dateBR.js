jQuery.validator.addMethod("dateBR", function(value, element) {            
                    if(value.length!=10) return false;
                    var data        = value;
                    var dia         = data.substr(0,2);
                    var barra1      = data.substr(2,1);
                    var mes         = data.substr(3,2);         
                    var barra2      = data.substr(5,1);
                    var ano         = data.substr(6,4);         
                    if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12) return false; 
                    if((mes==4||mes==6||mes==9||mes==11) && dia==31) return false;
                    if(mes==2 && (dia>29||(dia==29 && ano%4!=0))) return false;
                    if(ano < 1900)  return false;
                    
                    return true;        
}, "Informe uma data válida");
