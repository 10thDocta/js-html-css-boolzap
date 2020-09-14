/* global $ */
$(function () {




    $(".user-controls i.fas.fa-circle-notch").click(function () {

        var x = 0;

        for (let i = 0; i < 4; i++) {

            x++;
            console.log(x);

            var chatArchieveTemplate = $(".template-chat__archive > div.single-chat").clone();

            // manipolazione elemento
            // Per manipolare gli elementi del DOM dentro all’elemento clonato con .clone(), possiamo usare il metodo .find(“classe o #”), che va a cercare l’elemento corrispondente. Solo dopo possiamo andare a manipolarne il contenuto.

            chatArchieveTemplate.find(".single-chat_left").parent().addClass("active-archieve-chat");
            chatArchieveTemplate.find(".single-chat_left").parent().attr("data-contatto", x);


            chatArchieveTemplate.find(".single-chat_img").html(`<img src="https://picsum.photos/2${x}0" alt="">`);
            $(".chat-bar .chat-info__img img").attr("src", `https://picsum.photos/2${x}0`);

            chatArchieveTemplate.find(".single-chat_preview .chat-title").text(x);
            $(".chat-bar .chat-info__title").text(x);

            chatArchieveTemplate.find(".single-chat_preview .text-preview").text("Random message");


            // codice per aggiornare inserire l'orario di creazione
            chatArchieveTemplate.find(".single-chat_status .chat-last-update").text(`2${x}`);
            $(".chat-bar .chat-info__member").text(`Ultimo accesso alle ${x}`);


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



    });











});




















