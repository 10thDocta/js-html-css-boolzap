/* global $ */
$(function () {

    // codice per far comparire il menu dell'utente
    $("#user-menu > a").click(function () {
        var userDrop = $("#user-menu").children(".dropdown");
        $(userDrop).toggleClass("hide");

        $("#user-menu > a > i").toggleClass("menu-active");
    });

    // codice per far comparire il menu della chat
    // $("#chat-menu > i").click(function () {
    //     var chatDrop = $("#chat-menu").children(".dropdown");
    //     $(chatDrop).toggleClass("hide");

    //     $("#chat-menu > i").toggleClass("menu-active");
    // });


    // codice per ottenere il valore inserito nella casela di input della chat e stampare a video >> tramite il tasto invio
    $(document).on("keyup", "#input-chat__input", function () {

        if (event.which == 13) {
            var inputValue = $("#input-chat__input").val();

            if (inputValue != "") {

                userMessage(inputValue);
                autoMessage();
            }
        }
    });


    // codice per ottenere il valore inserito nella casela di input della chat e stampare a video >> cliccando sulla freccia che compare
    $("#input-chat .fa-paper-plane, #input-chat .fa-paper-plane::before").click(function () {

        var inputValue = $("#input-chat__input").val();

        if (inputValue != "") {
            userMessage(inputValue);
            autoMessage();
        }
    });


    const getTime = () => {
        var date = new Date();
        var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
        var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        return `${hours}:${minute}`;
    }

    // funzione per ottenere il dato inserito dall'utente
    const userMessage = inputValue => {
        var element = $(".template-chat__baloon > div.chat-message").clone();
        element.addClass("my-message");
        element.prepend(inputValue);
        element.find(".time-message").text(getTime());

        $(".active-chat.active").append(element);

        // $(".active-chat").append(element);
        $("#input-chat__input").val("");
        $(".chat-info__member").html("Sta scrivendo...");

        // metodo per scrollare automaticamente in basso
        $(".active-chat.active").animate({ scrollTop: $(".active-chat.active").prop("scrollHeight") }, "fast");
    }

    // funzione per generare un messaggio dopo aver stampato a video quello dell'utente
    const autoMessage = () => {
        var rispostaAutomatica = setTimeout(function () {
            var otherElement = $(".template-chat__baloon > div.chat-message").clone();
            otherElement.addClass("other-message");

            otherElement.prepend("Ciao, come stai?");
            otherElement.find(".time-message").text(getTime());

            $(".active-chat.active").append(otherElement);

            // codice per scrollare automaticamente in basso
            $(".active-chat.active").animate({ scrollTop: $(".active-chat.active").prop("scrollHeight") }, "fast");

            // codice per stampare la data dell'ultimo messaggio
            $(".chat-info__member").html(`Ultimo accesso alle ${getTime()}`);




            var activeChatId = $(".active-chat.active").attr("data-contatto");
            $(".chat-group .single-chat[data-contatto=" + activeChatId + "]").find(".chat-last-update").text(`${getTime()}`);








        }, 2000);
    }

    // codice per la barra di ricerca
    // ad ogni tasto rilasciato 
    $("#search-bar__input").keyup(function () {
        // va a leggere il valore dell'input (trasformato in minuscolo)
        var value = $(this).val().toLowerCase();

        // tramite il metodo .filter() specifico quale selettore deve andare a cercare, in questo caso ".chat-group .chat-title"
        $(".chat-group .chat-title").filter(function () {
            // specifico che deve eseguire il .toggle() sull'elemento ancestrale, tramite .parents(), solamente se quello che c'è tra le parentesì di toggle è falso
            $(this).parents(".single-chat").toggle($(this).text().toLowerCase().includes(value))
        });
    });

    // codice per la barra di ricerca nella chat attiva
    // ad ogni tasto rilasciato 
    $("#search-bar_active-chat__input").on("input", function () {
        // va a leggere il valore dell'input (trasformato in minuscolo)

        var value = $(this).val().toLowerCase();

        // tramite il metodo .filter() specifico quale selettore deve andare a cercare, in questo caso ".chat-group .chat-title"
        $(".active-chat *").filter(function () {
            // specifico che deve eseguire il .toggle() sull'elemento ancestrale, tramite .parents(), solamente se quello che c'è tra le parentesì è vero
            $(this).not(".time-message").toggle($(this).text().toLowerCase().includes(value))
        });



    });



    // codice per far scomparire e comparire le due differenti icone nella barra in basso per l'immissione del messaggio
    $("#input-chat__input").focusin(function () {

        $(".input-chat .fa-microphone").toggle("fast");
        $(".input-chat .fa-paper-plane").toggle("fast");

    });
    $("#input-chat__input").focusout(function () {

        $(".input-chat .fa-microphone").toggle(400);
        $(".input-chat .fa-paper-plane").toggle(400);

    });





    /* ------ Codice per creare una nuova chat ------ */

    // al click su "Nuovo Gruppo" o "Crea una stanza" mostro la modale
    $(".user-controls .dropdown #new-chat, .user-controls .dropdown #new-group").click(function () {

        $("#modal_input").val("");
        console.log($("#modal_input").val());
        $(".modal_full_page").css("display", "flex");
    });

    var x = 0;

    $("#modal_input").keyup(function () {
        if (event.which === 13) {
            var modalInput = $("#modal_input").val();
            console.log(modalInput);

            if (modalInput != "") {
                x++;
                $(".modal_full_page").css("display", "none");

                var chatArchieveTemplate = $(".template-chat__archive > div.single-chat").clone();

                // manipolazione elemento
                // Per manipolare gli elementi del DOM dentro all’elemento clonato con .clone(), possiamo usare il metodo .find(“classe o #”), che va a cercare l’elemento corrispondente. Solo dopo possiamo andare a manipolarne il contenuto.

                chatArchieveTemplate.find(".single-chat_left").parent().addClass("active-archieve-chat");
                chatArchieveTemplate.find(".single-chat_left").parent().attr("data-contatto", x);


                chatArchieveTemplate.find(".single-chat_img").html(`<img src="https://picsum.photos/2${x}0" alt="">`);
                $(".chat-bar .chat-info__img img").attr("src", `https://picsum.photos/2${x}0`);

                chatArchieveTemplate.find(".single-chat_preview .chat-title").text(modalInput);
                $(".chat-bar .chat-info__title").text(modalInput);

                chatArchieveTemplate.find(".single-chat_preview .text-preview").text("Random message");


                // codice per aggiornare inserire l'orario di creazione
                chatArchieveTemplate.find(".single-chat_status .chat-last-update").text(`${getTime()}`);
                $(".chat-bar .chat-info__member").text(`Ultimo accesso alle ${getTime()}`);


                $(".chat-group").find(".active-archieve-chat").removeClass("active-archieve-chat");

                $(".chat-group").prepend(chatArchieveTemplate);


                // codice per creare una nuova chat a DESTRA
                var newChatTemplate = $(".template-new-chat > div.active-chat").clone();

                newChatTemplate.addClass(`active ${x}`);
                newChatTemplate.attr("data-contatto", x);

                $(".chat-box").each(function () {
                    $(this).children(".active-chat").removeClass("active");
                    $(this).children(".active-chat").not(".active").hide();
                });

                $(".chat-box").prepend(newChatTemplate);

            }
        }
    });




    // codice per chiudere la modale al click sul bottone chiudi
    $("#modal_btn__close").on("click", function () {

        if ($(".modal_full_page").css("display") == "flex") {
            $(".modal_full_page").toggle();
        }
    });

    // codice per aprire e chiudere il menu dell'utente e mostrare e nascondere il tondo grigio attorno ai 3 puntini
    $(".user-controls .dropdown__item").on("click", function () {

        if ($(this).parent(".dropdown").css("display") != "none") {
            $(this).parent(".dropdown").toggleClass("hide");
            $("#user-menu > a > i").toggleClass("menu-active");
        }
    });

    // codice per mostrare il menu di ogni messaggio, al click sulla freccia in basso
    $(".chat-controls i.fas.fa-search").click(function () {
        $(".chat-controls .chat-search-box").toggle();
    });



    /* ------------------------------------------------ */
    /* ------ TEST ------ */

    $(document).on("click", ".chat-message__baloon-menu i.fas.fa-chevron-down", function () {
        $(this).next().toggleClass("hide");

    });

    $(document).on("mouseleave", ".chat-message__baloon-menu .dropdown", function () {
        $(this).toggleClass("hide");
    });

    $(document).on("click", "#delete_message a", function () {
        $(this).parents(".chat-message").remove();
    });

    /* ------ END TEST ------ */



    // codice sul cick a SINISTRA in ogni singola chat "single-chat"
    $(document).on("click", ".single-chat", function () {

        $(".chat-group").find(".active-archieve-chat").removeClass("active-archieve-chat");

        $(this).addClass("active-archieve-chat");

        // test
        var dataContatto = $(this).attr("data-contatto");

        $(".chat-box").each(function () {
            $(this).children(".active-chat").removeClass("active");
            $(this).children(".active-chat").not(".active").hide();
        });
        $(".active-chat[data-contatto=" + dataContatto + "]").addClass("active").show();

        var img = $(this).find("img").attr("src");
        var name = $(this).find(".chat-title").text();
        var time = $(this).find(".chat-last-update").text();



        $(".chat-bar .chat-info__img img").attr("src", img);
        $(".chat-bar .chat-info__title").text(name);
        $(".chat-bar .chat-info__member").text(`Ultimo accesso alle ${time}`);



    });















    // test








})
/* end document ready */