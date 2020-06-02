$(function(){
  Payjp.setPublicKey('pk_test_177d9ddb319e3af144dc305d');
  
  $("#card_number").keyup(function(){
    const pattern        = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47]{13}|(?:2131|1800|35[0-9]{3})[0-9]{11})$/;
    const cardNumber     = $(this).val();
    const cardNumberNext = $(this).next();
    if(cardNumber.match(pattern) == null || cardNumber === "") {
      if(!cardNumberNext.hasClass("error-class2")){
        $(this).css("border", "1px solid red");
        $(this).after(`<div class=error-class2>有効な値を入力してください</div>`);
      }else{
        $(this).css("border", "1px solid red");
      }  
    }else{
      $(this).css("border", "1px solid #00BFFF")
      cardNumberNext.remove();
    }
  });
  $(".form__upper__group > select").on("change", function(){
    const nowTime         = new Date();
    const nowYear         = nowTime.getFullYear();
    const nowMonth        = nowTime.getMonth();
    const selectYear      = $("#exp_year").val();
    const selectMonth     = $("#exp_month").val();
    const selectMonthNext = $("#error_zone").next();
    if(selectYear < nowYear || selectYear == nowYear && selectMonth < nowMonth){
      if(!selectMonthNext.hasClass("error-class2")){
        $("#error_zone").after(`<div class=error-class2>有効期限が過ぎています</div>`);
        $("#exp_year").css("border", "1px solid  red");
        $("#exp_month").css("border", "1px solid red");
      }
    }else {
      selectMonthNext.remove(".error-class2");
      $("#exp_year").css("border", "1px solid #00BFFF");
      $("#exp_month").css("border", "1px solid #00BFFF");
    }
  });
  
  $("#cvc").keyup(function(){
    const pattern = /^\d{3,4}$/;
    const cvcNumber      = $(this).val();
    const cvcNumberNext = $(this).next();
    if(cvcNumber.match(pattern) == null || cvcNumber === "") {
      if(!cvcNumberNext.hasClass("error-class2")){
        $(this).css("border", "1px solid red");
        $(this).after(`<div class=error-class2>有効な値を入力してください</div>`);
      }else{
        $(this).css("border", "1px solid red");
      }  
    }else{
      $(this).css("border", "1px solid #00BFFF")
      cvcNumberNext.remove();
    }
  });
  $("#charge-form").click(function() {
    const btnAfterColor = new Object();
    btnAfterColor.backgroundColor = "#3ccace";
    btnAfterColor.color = "white";
    const form = $("#payjp__form");
    form.find("input[type=submit]").prop("disabled", true);
    $(".btn-default").css(btnAfterColor);
    const card = {
      number: $("#cardNumber").val(),
      cvc: $("#cvc").val(),
      exp_month: $("#exp_month").val(),
      exp_year: $("#exp_year").val(),
    };
    Payjp.createToken(card, function(status, response) {
      if (response.error){
        alert(`登録に失敗しました。\n存在しないクレジットカードです。`);
        $("#charge-form").prop('disabled', false);
      }   
      else {
        alert("登録に成功しました。");
        $("#cardNumber").removeAttr("name");
        $("#cvc").removeAttr("name");
        $("#exp_month").removeAttr("name");
        $("#exp_year").removeAttr("name");
        const token = response.id;
        form.append($('<input type="hidden" name="payjpToken" />').val(token));
        form.submit();
      };
    });
  });
});