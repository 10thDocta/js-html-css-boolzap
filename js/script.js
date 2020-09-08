/* global $ */
$(function () {


    $("#user-menu > a").click(function () {
        var userDrop = $("#user-menu").children(".dropdown");
        $(userDrop).toggleClass("hide");

        $("#user-menu > a > i").toggleClass("menu-active");
    });


    // $("#chat-menu > i").click(function () {
    //     var chatDrop = $("#chat-menu").children(".dropdown");
    //     $(chatDrop).toggleClass("hide");

    //     $("#chat-menu > i").toggleClass("menu-active");
    // });


    $("#input-chat__input").keyup(function () {

        if (event.which == 13) {
            var inputValue = $("#input-chat__input").val();

            if (inputValue != "") {

                var element = $(".template > div.my-message").clone();
                element.prepend(inputValue);
                $(".active-chat").append(element);
                $("#input-chat__input").val("");
                $(".chat-info__member").html("Sta scrivendo...");

                // metodo per scrollare automaticamente in basso
                $(".active-chat").animate({ scrollTop: $(".active-chat").height() }, "fast");

            }

            var rispostaAutomatica = setTimeout(function () {
                var otherElement = $(".template > div.other-message").clone();
                otherElement.prepend("Ciao, come stai?");
                $(".active-chat").append(otherElement);

                // metodo per scrollare automaticamente in basso
                $(".active-chat").animate({ scrollTop: $(".active-chat").height() }, "fast");

                // metodo per stampare la data dell'ultimo messaggio
                var date = new Date();
                var hours = date.getHours();
                var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

                $(".chat-info__member").html(`Ultimo accesso alle ${hours}:${minute}`);

            }, 2500);

        }

    });


    // --------------------- TEST 
    // $("#search-bar__input").on("keyup", function () {
    //     var value = $(this).val().toLowerCase();

    //     $(".chat-group *").filter(function () {
    //         console.log($(this));
    //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    // });



    // $("#search-bar__input").keyup(function () {
    //     var value = $(this).val().toLowerCase();


    //     if (event.which == 13) {
    //         $(".chat-group .chat-title").filter(function () {

    //             if (!$(this).text().toLowerCase().indexOf(value) == -1) {

    //                 $(this).parents(".single-chat").toggle();
    //             }




    //         });
    //     }
    // });

    // --------------------- /TEST






















})