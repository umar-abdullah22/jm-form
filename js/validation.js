
function zf_ValidateAndSubmit() {
	var zipCode = document.forms['form']['zipCode'].value;
	console.log(zipCode)
	if (zipCode.length != 5) {
		document.getElementById('zipCode_error').style.display = 'block';
        document.getElementById('zipCode_error').innerText = 'Please enter a valid 5-digit zip code.';
		return false;
	}
	return true;
}

async function submitForm() {
    var phoneInput = document.forms['form']['phoneNumber'];
    document.getElementById('PhoneNumber_error').style.display = 'none';

    if (!zf_ValidatePhone(phoneInput)) {
        document.getElementById('PhoneNumber_error').style.display = 'block';
        document.getElementById('PhoneNumber_error').innerText = 'Please enter a valid phone number.';
        phoneInput.focus();
        return false;
    }
    if (!zf_ValidateAndSubmit()) return false;
    var form = document.forms['form'];
    var formData = new FormData(form);
    var submitButton = document.getElementById('submitBtn');
    var spinner = document.getElementById('spinner');

    spinner.style.display = 'inline-block';
//     submitButton.disabled = true;

	try {
		const response = await fetch('https://hook.us1.make.com/6fvtkcgjb6scn9q0cipoiw6lhjxww6v2', {
		   method: 'POST',
		   body: formData,
	   });
	   if (response.ok) {
	   setTimeout(() => {
		   form.reset();
		   window.location.href = 'https://www.kitchenmagic.com/thank-you/self-set';
		   
	   },3000)
	   } else {
	       throw new Error('Submission failed');
	   }
    } catch (error) {
        alert(error.message);
      console.log(error.message)
    } finally {
        spinner.style.display = 'none';
//         submitButton.disabled = false;
    }
}

		function zf_CheckMandatory(){
		for(i = 0 ; i < zf_MandArray.length ; i ++) {
		  	var fieldObj=document.forms.form[zf_MandArray[i]];
		  	if(fieldObj) {
				  	if(fieldObj.nodeName != null ){
				  		if ( fieldObj.nodeName=='OBJECT' ) {
								if(!zf_MandatoryCheckSignature(fieldObj)){
									zf_ShowErrorMsg(zf_MandArray[i]);
								 	return false;
								}
							}else if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
							 if(fieldObj.type =='file')
								{
								 fieldObj.focus();
								 zf_ShowErrorMsg(zf_MandArray[i]);
								 return false;
								}
				   	   	  	  fieldObj.focus();
				   	   	  	  zf_ShowErrorMsg(zf_MandArray[i]);
				   	   	  	  return false;
							}  else if( fieldObj.nodeName=='SELECT' ) {// No I18N
				  	   	   	 if(fieldObj.options[fieldObj.selectedIndex].value=='-Select-') {
								fieldObj.focus();
								zf_ShowErrorMsg(zf_MandArray[i]);
								return false;
							   }
							} else if( fieldObj.type =='checkbox' || fieldObj.type =='radio' ){
								if(fieldObj.checked == false){
									fieldObj.focus();
									zf_ShowErrorMsg(zf_MandArray[i]);
									return false;
			   					}
							}
				  	}else{
				  		var checkedValsCount = 0;
						var inpChoiceElems = fieldObj;
							for(var ii = 0; ii < inpChoiceElems.length ; ii ++ ){
						      	if(inpChoiceElems[ii].checked === true ){
						      		checkedValsCount ++;
						      	}
							}
							if ( checkedValsCount == 0) {
									inpChoiceElems[0].focus();
									zf_ShowErrorMsg(zf_MandArray[i]);
									return false;
							 	}
					}
			}
		}
		return true;
	}
	function zf_ValidCheck(){
		var isValid = true;
		for(ind = 0 ; ind < zf_FieldArray.length ; ind++ ) {
			var fieldObj=document.forms.form[zf_FieldArray[ind]];
		  	if(fieldObj) {
		  		if(fieldObj.nodeName != null ){
			  		var checkType = fieldObj.getAttribute("checktype");
			  		if( checkType == "c2" ){// No I18N
			  			if( !zf_ValidateNumber(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c3" ){// No I18N
			  			if (!zf_ValidateCurrency(fieldObj) || !zf_ValidateDecimalLength(fieldObj,10) ) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c4" ){// No I18N
			  			if( !zf_ValidateDateFormat(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c5" ){// No I18N
			  			if (!zf_ValidateEmailID(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c6" ){// No I18N
			  			if (!zf_ValidateLiveUrl(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
							}
			  		}else if( checkType == "c7" ){// No I18N
			  			if (!zf_ValidatePhone(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
							}
			  		}else if( checkType == "c8" ){// No I18N
			  			zf_ValidateSignature(fieldObj);
			  		}
			  	}
		  	}
		}
         	return isValid;
	}
	function zf_ShowErrorMsg(uniqName){
		var fldLinkName;
		for( errInd = 0 ; errInd < zf_FieldArray.length ; errInd ++ ) {
			fldLinkName = zf_FieldArray[errInd].split('_')[0];
			document.getElementById(fldLinkName+"_error").style.display = 'none';
		}
		var linkName = uniqName.split('_')[0];
		document.getElementById(linkName+"_error").style.display = 'block';
	}
	function zf_ValidateNumber(elem) {
	 	var validChars = "-0123456789";
	 	var numValue = elem.value.replace(/^\s+|\s+$/g, '');
	 	if (numValue != null && !numValue == "") {
	 		var strChar;
	 		var result = true;
	 		if (numValue.charAt(0) == "-" && numValue.length == 1) {
	 			return false;
	 		}
	 		for (i = 0; i < numValue.length && result == true; i++) {
	 			strChar = numValue.charAt(i);
	 			if ((strChar == "-") && (i != 0)) {
	 				return false;
	 			}
	 			if (validChars.indexOf(strChar) == -1) {
	 				result = false;
	 			}
	 		}
	 		return result;
	 	} else {
	 		return true;
	 	}
	 }
	 function zf_ValidateDateFormat(inpElem){
	 	var dateValue = inpElem.value.replace(/^\s+|\s+$/g, '');
	 	if( dateValue == "" ){
	 		return true;
	 	}else{
			return( zf_DateRegex.test(dateValue) );
		}
	 }
	 function zf_ValidateCurrency(elem) {
	 	var validChars = "0123456789.";
	 	var numValue = elem.value.replace(/^\s+|\s+$/g, '');
	 	if(numValue.charAt(0) == '-'){
	 		numValue = numValue.substring(1,numValue.length);
	 	}
	 	if (numValue != null && !numValue == "") {
	 		var strChar;
	 		var result = true;
	 		for (i = 0; i < numValue.length && result == true; i++) {
	 			strChar = numValue.charAt(i);
	 			if (validChars.indexOf(strChar) == -1) {
	 				result = false;
	 			}
	 		}
	 		return result;
	 	} else {
	 		return true;
	 	}
	 }
	 function zf_ValidateDecimalLength(elem,decimalLen) {
	 	var numValue = elem.value;
	 	if (numValue.indexOf('.') >= 0) {
	 		var decimalLength = numValue.substring(numValue.indexOf('.') + 1).length;
	 		if (decimalLength > decimalLen) {
	 			return false;
	 		} else {
	 			return true;
	 		}
	 	}
	 	return true;
	 }
	 function zf_ValidateEmailID(elem) {
        var check = 0;
        var emailValue = elem.value;
        if (emailValue != null && !emailValue == "") {
            var emailArray = emailValue.split(",");
            for (i = 0; i < emailArray.length; i++) {
                var emailExp = /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
                if (!emailExp.test(emailArray[i].replace(/^\s+|\s+$/g, ''))) {
                    check = 1;
                }
            }
            if (check == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    function zf_ValidateLiveUrl(elem) {
    	var urlValue = elem.value;
		if(urlValue !== null && typeof(urlValue) !== "undefined") {
			urlValue = urlValue.replace(/^\s+|\s+$/g, '');
			if(urlValue !== "") {
      			var urlregex = new RegExp("^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w:%@]*)|(((w|W){3}\\.)[-.\\w:%@]+)|((\\w+)([-\\w:%@]*)(\\.([-\\w:%@]+))+))(/[-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$"); // This regex is taken from LiveFieldsUtil.isValidWebSiteFieldURL() method.
				return(urlregex.test(urlValue));
			}
        }
        return true;
    }
	function zf_ValidatePhone(inpElem) {
		var phoneFormat = inpElem.value.trim();
		// Regex to validate (xxx) xxx-xxxx format
		var validPhoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
		
		if (!validPhoneRegex.test(phoneFormat)) {
			return false;
		}
		return true;
	}

  function zf_ValidateSignature(objElem) {
  		var linkName = objElem.getAttribute("compname");
  		var canvasElem = document.getElementById("drawingCanvas-"+linkName);
  		var isValidSign = zf_IsSignaturePresent(objElem,linkName,canvasElem);
   		var hiddenSignInputElem = document.getElementById("hiddenSignInput-"+linkName);
		if(isValidSign){
			hiddenSignInputElem.value = canvasElem.toDataURL();
		}else{
			hiddenSignInputElem.value = "";// No I18N
		}
		return isValidSign;
  	}

  	function zf_MandatoryCheckSignature(objElem){
  		var linkName = objElem.getAttribute("compname");
  		var canvasElem = document.getElementById("drawingCanvas-"+linkName);
  		var isValid = zf_IsSignaturePresent(objElem,linkName,canvasElem);
		return isValid;
  	}

  	function zf_IsSignaturePresent(objElem,linkName,canvasElem){
   		var context = canvasElem.getContext('2d'); // No I18N
   		var canvasWidth = canvasElem.width;
   		var canvasHeight = canvasElem.height;
   		var canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);
   		var signLen = canvasData.data.length;
   		var flag = false;
   		for(var index =0; index< signLen; index++) {
   	     	if(!canvasData.data[index]) {
   	       		flag =  false;
   	     	}else if(canvasData.data[index]) {
   		   		flag = true;
   		   		break;
   	     	}
   		}
		return flag;
  	}

	function zf_FocusNext(elem,event) {
	 	if(event.keyCode == 9 || event.keyCode == 16){
	      return;
	    }
	    if(event.keyCode >=37 && event.keyCode <=40){
	       return;
	    }
	    var compname = elem.getAttribute("compname");
	    var inpElemName = elem.getAttribute("name");
	 	if (inpElemName == compname+"_countrycode") {
	 		if (elem.value.length == 3) {
	 			document.getElementsByName(compname+"_first")[0].focus();
	 		}
	 	} else if (inpElemName == compname+"_first" ) {
	 		if (elem.value.length == 3) {
	 			document.getElementsByName(compname+"_second")[0].focus();
	 		}
	 	}
	}

	function showSecondCard() {
		var zipCode = document.forms['form']['zipCode'].value;
		if (zipCode.length == 5 ) {
			document.getElementById('firstCard').style.display = 'none';
			document.getElementById('secondCard').style.display = 'block';
		} else {
			document.getElementById('zipCode_error').style.display = 'block';
			document.getElementById('zipCode_error').innerText = 'Please enter a valid 5-digit zip code.';
		}
	}

	function showFirstCard() {
		document.getElementById('secondCard').style.display = 'none';
			document.getElementById('firstCard').style.display = 'block';
	}

	function startCountdown(targetDate) {
		const endDate = new Date(targetDate);
		const countdownTimer = setInterval(() => {
			const now = new Date().getTime();
			const timeLeft = endDate - now;
	
			if (timeLeft <= 0) {
				clearInterval(countdownTimer);
				document.getElementById('days').innerHTML = '00';
				document.getElementById('hours').innerHTML = '00';
				document.getElementById('minutes').innerHTML = '00';
				document.getElementById('seconds').innerHTML = '00';
				return;
			}
	
			// Time calculations for days, hours, minutes and seconds
			const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	
			// Output the result in the elements with id
			document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
			document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
			document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
			document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
		}, 1000);
	}

	document.addEventListener('DOMContentLoaded', function() {
		var phoneInput = document.querySelector('input[name="phoneNumber"]'); 
	
		phoneInput.addEventListener('input', function(e) {
			var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
			e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
		});
	});
	
	
//pass date as : startCountdown("April 20, 2024 23:59:59");
// startCountdown("April 20, 2024 23:59:59")
	