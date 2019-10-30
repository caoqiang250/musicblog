/**
 * @license e-Calendar v0.9.3
 * (c) 2014-2016 - Jhonis de Souza
 * License: GNU
 */

(function ($) {

    var eCalendar = function (options, object) {
        // Initializing global variables
        let month_now = new Date().getMonth();
        let year_now = new Date().getFullYear();

        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            let eventItem = $('div.c-event-item[data-event-day="' + d + '"]');
            eventItem.addClass('c-event-over');
            //当鼠标指向日期显示相关事项，其余的元素隐藏
            //当选中元素有多个时同级选择会选择所有
            eventItem.siblings().css("display","none");
            //所以需要重新把选中元素显示
            eventItem.css("display","block");
            //让事项栏面板滑动出现
            let eventGridEle = $('.c-event-grid');
            //终止该元素之前的动画
            eventGridEle.stop();
            //开始执行当前动画
            eventGridEle.css('display', 'block');
            eventGridEle.animate({width : '300px' }, 200, function() {
            });
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            let eventItem = $('div.c-event-item[data-event-day="' + d + '"]');
            eventItem.removeClass('c-event-over');
            //当鼠标移开显示所有事项
            eventItem.siblings().css("display","block");
            //让事项栏面板滑动消失
            let eventGridEle = $('.c-event-grid');
            //终止该元素之前的动画
            eventGridEle.stop();
            //开始执行当前动画
            eventGridEle.animate({width : '0px' }, 200, function() {
                $(this).css('display', 'none');
            });
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
        };

        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                $.ajax({url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                });
            }
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cBody = $('<div/>').addClass('c-grid').css('width', '300px');//指定宽度避免面板被压缩
            var cEvents = $('<div/>').addClass('c-event-grid').css('width', '0px').css('display', 'none');//初始化隐藏
            var cEventsBody = $('<div/>').addClass('c-event-body');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cBody.append(cPrevious);
            cBody.append(cMonth);
            cBody.append(cNext);
            var dayOfWeek = settings.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                if (dayOfWeek > 6) {
                    dayOfWeek = 0;
                }
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                cWeekDay.html(settings.weekDays[dayOfWeek]);
                cBody.append(cWeekDay);
                dayOfWeek++;
            }
            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDay.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-day').addClass('c-today').attr('title', '今天');
                    }else if (dMonth <= month_now && dYear == year_now){//本年内日期判断是否本日之前
                        if(day < dDay && dMonth == month_now){
                            cDay.addClass('c-previous-day');
                        }else if(day > dDay && dMonth == month_now){
                            cDay.addClass('c-next-day');
                        }else if(dMonth < month_now){
                            cDay.addClass('c-previous-day');
                        }
                    }else if(dYear < year_now){//判断是否之前的年份
                        cDay.addClass('c-previous-day');
                    }else if (dMonth >= month_now && dYear == year_now){//本年内日期判断是否本日之后
                        if(day > dDay && dMonth == month_now){
                            cDay.addClass('c-next-day');
                        }else if(day < dDay && dMonth == month_now){
                            cDay.addClass('c-previous-day');
                        }else if(dMonth > month_now){
                            cDay.addClass('c-next-day');
                        }
                    }else if(dYear > year_now){//判断是否之后的年份
                        cDay.addClass('c-next-day');
                    }

                    for (var j = 0; j < settings.events.length; j++) {
                        var d = settings.events[j].datetime;
                        if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent);
                        }
                    }
                    cDay.html('<span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; position: relative; bottom: 7px;">' + (day++) + '</span>');
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
            var eventList = $('<div/>').addClass('c-event-list');
            for (var i = 0; i < settings.events.length; i++) {
                var d = settings.events[i].datetime;
                if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getDate(), 2) + '/' + lpad(d.getMonth() + 1, 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item');
                    var title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title + '<br/>');
                    var description = $('<div/>').addClass('description').html(settings.events[i].description + '<br/>');
                    item.attr('data-event-day', d.getDate());
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                    item.append(title).append(description);

                    // Add the url to the description if is set
                    if( settings.events[i].url !== undefined )
                    {
                        /**
                         * If the setting url_blank is set and is true, the target of the url
                         * will be "_blank"
                         */
                        type_url = settings.events[i].url_blank !== undefined && 
                                   settings.events[i].url_blank === true ? 
                                   '_blank':'';
                        description.wrap( '<a href="'+ settings.events[i].url +'" target="'+type_url+'" ></a>' );
                    }

                    eventList.append(item);
                }
            }
            $(instance).addClass('calendar').css('width', '601px'); //指定原始宽度
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
        }

        return print();
    };

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };

    // plugin defaults
    // $.fn.eCalendar.defaults = {
    //     weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    //     months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    //     textArrows: {previous: '<', next: '>'},
    //     eventTitle: '事项',
    //     url: '',
    //     events: [
    //         {title: '12月', description: '12月', datetime: new Date(2019, 11, 12, 17)}, //11-代表12月
    //         // {title: 'Tênis de Mesa', description: 'BRA x ARG - Semifinal', datetime: 'Sat Aug 24 2019 08:00:00 GMT+0800 (中国标准时间)'},
    //         {title: 'Ginástica Olímpica', description: 'Classificatórias de equipes', datetime: new Date(2016, new Date().getMonth(), 31, 16)}
    //     ],
    //     firstDayOfWeek: 0
    // };

}(jQuery));