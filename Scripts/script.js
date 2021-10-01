(function ($) {
    'use strict';

    // Preloader js    
    $(window).on('load', function () {
        $('.preloader').fadeOut(700);
    });

    // Sticky Menu
    $(window).scroll(function () {
        if ($('header').offset().top > 10) {
            $('.top-header').addClass('hide');
            $('.navigation').addClass('nav-bg');
        } else {
            $('.top-header').removeClass('hide');
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    //Hero Slider
    $('.hero-slider').slick({
        autoplay: true,
        autoplaySpeed: 7500,
        pauseOnFocus: false,
        pauseOnHover: false,
        infinite: true,
        arrows: true,
        fade: true,
        prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
        nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
        dots: true
    });
    $('.hero-slider').slickAnimation();

    // venobox popup
    $(document).ready(function () {
        $('.venobox').venobox();
    });


    // filter
    $(document).ready(function () {
        var containerEl = document.querySelector('.filtr-container');
        var filterizd;
        if (containerEl) {
            filterizd = $('.filtr-container').filterizr({});
        }
        //Active changer
        $('.filter-controls li').on('click', function () {
            $('.filter-controls li').removeClass('active');
            $(this).addClass('active');
        });
    });

    //  Count Up
    function counter() {
        var oTop;
        if ($('.count').length !== 0) {
            oTop = $('.count').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.count').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                        }
                    });
            });
        }
    }
    $(window).on('scroll', function () {
        counter();
    });
    var counterAbout = function () {

        $('#section-counter, .ftco-appointment').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
                $('.number').each(function () {
                    var $this = $(this),
                        num = $this.data('number');
                    console.log(num);
                    $this.animateNumber(
                        {
                            number: num,
                            numberStep: comma_separator_number_step
                        }, 7000
                    );
                });

            }

        }, { offset: '95%' });

    }
    counterAbout();

    var contentWayPoint = function () {
        var i = 0;
        $('.ftco-animate').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .ftco-animate.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, { offset: '95%' });
    };
    contentWayPoint();

    $('.appointment_date').datepicker({
        'format': 'm/d/yyyy',
        'autoclose': true
    });

    $('.appointment_time').timepicker();

    // Aos js
    AOS.init({
        once: true
    });

    // Animation
    $(document).ready(function () {
        $('.has-animation').each(function (index) {
            $(this).delay($(this).data('delay')).queue(function () {
                $(this).addClass('animate-in');
            });
        });
    });

})(jQuery);

$('.myform').submit(function (e) {
    var $this = $(this);
    debugger;
    $.ajax({
        type: "GET", // GET & url for json slightly different
        url: "https://tftec.us7.list-manage.com/subscribe/post-json?u=bb66875273995787aa19cd2ec&amp;id=6468c9d1ae&c=?",
        data: $this.serialize(),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: function (err) { alert("Could not connect to the registration server."); },
        success: function (data) {
            debugger;
            if (data.result == "success") {
                //beginMailchimpPost(data);

                window.location.href = "https://www.tftec.com.br/agradecimento.html";
                // Something went wrong, parse data.msg string and display message
            } else {
                //beginMailchimpPost(data);
                var request = data.msg.match(/href="([^"]*)/)[1];

                $.ajax({
                    type: "POST", // GET & url for json slightly different
                    url: request,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    error: function (err) { alert("Could not connect to the registration server."); },
                    success: function (data) {
                        debugger;
                        if (data.result == "success") {
                            //window.location.href = "https://www.tftec.com.br/agradecimento.html";
                            // Something went wrong, parse data.msg string and display message
                        } else {
                        }
                    }
                });

                window.location.href = "https://www.tftec.com.br/agradecimento.html";
                // It worked, so hide form and display thank-you message.
            }
        }
    });
    return false;
});

function beginMailchimpPost(data) {
    debugger;
    var mailchimp = {};
    mailchimp.dc = 'us5';
    mailchimp.id = '6468c9d1ae';
    var url = '//' + mailchimp.dc + '.api.mailchimp.com/3.0/lists/' + mailchimp.id + '/members/tags';
    var tagName = "desafio";
    var tagStatus = "active";

    payload = '{\
  "tags": [\
    {\
     "name":"' + tagName + '",\
     "status":"' + tagStatus + '"\
    }\
   ]\
}'
        ;

    var params = JSON.stringify(payload);
    $.ajax({
        url: url,
        method: 'POST',
        data: params,
        dataType: 'jsonp',
        contentType: 'application/json; charset=utf-8',
        error: function (res, text) {
            console.log('Err', res);
        },
        success: function (res) {
            console.log('Success', res);
        }
    });
}