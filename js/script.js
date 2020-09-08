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
    $("#input-chat__input").keyup(function () {

        if (event.which == 13) {
            var inputValue = $("#input-chat__input").val();

            if (inputValue != "") {

                userMessage(inputValue);
                autoMessage();
            }
        }
    });


    // codice per ottenere il valore inserito nella casela di input della chat e stampare a video >> cliccando sulla freccia che compare
    $("#input-chat .fa-paper-plane").click(function () {

        var inputValue = $("#input-chat__input").val();

        if (inputValue != "") {
            userMessage(inputValue);
            autoMessage();
        }
    });


    // funzione per ottenere il dato inserito dall'utente
    const userMessage = inputValue => {
        var element = $(".template > div.my-message").clone();
        element.prepend(inputValue);
        $(".active-chat").append(element);
        $("#input-chat__input").val("");
        $(".chat-info__member").html("Sta scrivendo...");

        // metodo per scrollare automaticamente in basso
        $(".active-chat").animate({ scrollTop: $(".active-chat").height() }, "fast");
    }

    // funzione per generare un messaggio dopo aver stampato a video quello dell'utente
    const autoMessage = () => {
        var rispostaAutomatica = setTimeout(function () {
            var otherElement = $(".template > div.other-message").clone();
            otherElement.prepend("Ciao, come stai?");
            $(".active-chat").append(otherElement);

            // codice per scrollare automaticamente in basso
            $(".active-chat").animate({ scrollTop: $(".active-chat").height() }, "fast");

            // codice per stampare la data dell'ultimo messaggio
            var date = new Date();
            var hours = date.getHours();
            var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

            $(".chat-info__member").html(`Ultimo accesso alle ${hours}:${minute}`);

        }, 2000);
    }

    // codice per la barra di ricerca
    // ad ogni tasto rilasciato 
    $("#search-bar__input").keyup(function () {
        // va a leggere il valore dell'input (trasformato in minuscolo)
        var value = $(this).val().toLowerCase();

        // tramite il metodo .filter() specifico quale selettore deve andare a cercare, in questo caso ".chat-group .chat-title"
        $(".chat-group .chat-title").filter(function () {
            // specifico che deve eseguire il .toggle() sull'elemento ancestrale, tramite .parents(), solamente se quello che c'è tra le parentesì è vero
            $(this).parents(".single-chat").toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });



    // codice per far scomparire e comparire le due differenti icone nella barra in basso per l'immissione del messaggio
    $("#input-chat__input")
        .focusin(function () {

            $(".input-chat .fa-microphone").toggle("fast");
            $(".input-chat .fa-paper-plane").toggle("fast");

        })
        .focusout(function () {

            $(".input-chat .fa-microphone").toggle("fast");
            $(".input-chat .fa-paper-plane").toggle("fast");

        });



















})
/* end document ready */