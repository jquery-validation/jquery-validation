/**
 * jQuery validator plugin for validating Swedish "personnummer"
 * https://github.com/montania/jquery-validate-personnummer
 * 
 * Copyright 2011, Montania System AB
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.  
 *
 * Edited 21-03-2014 by Cristian Andrei to allow only ÅÅMMDDNNNN numbers
 */  

$.validator.addMethod("ssnSE", function (value) {

  // Allow empty values, should be handled by the required attribute
  if ( value.length == 0 ) {
    return true;
  }

  // Remove dash and plus (not needed here)
  // value = value.replace("-", "").replace("+", "");

  // Only 10 digits allowed
  if (!(/[0-9]{10}/.test(value))) {
    return false;
  }

  // Check date
  // Month
  if (parseInt(value.substr(2, 2)) > 12) {
    return false;
  }
  // Day
  if (parseInt(value.substr(4, 2)) > 31) {
    return false;
  }
  
  // Remove check number
  var check = parseInt(value.substr(9, 1), 10);
  value = value.substr(0, 9);

  var result = 0;
  
  // Calculate check number
  for (var i = 0, len = value.length; i < len; i++) {
    
    var tmp = parseInt(value.substr(i, 1), 10);
        
    if ((i % 2) == 0) {
      tmp = (tmp * 2);
    }
    
    if (tmp > 9) {
      result += (1 + (tmp % 10));
    } else {
      result += tmp;
    }
  }
  
  return (((check + result) % 10) == 0);  
});
