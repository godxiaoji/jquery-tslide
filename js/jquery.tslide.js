/*
 * jQuery tSlide
 * @Version: 1.0
 * @Author:  Travis
 * @Date:    October 10th, 2012
 * @Website: http://travisup.com/
 */
(function($) {
    $.fn.extend({
        tSlide:init
    });
    
    var opt = {
        time:4000,
        overtime: 200,
        opacity: '0.5',
        mouseevent: 'mouseover',
        classcur: 'current',
        classcon: 't_slide_con',
        classmask: 't_slide_mask',
        classtitle: 't_slide_title',
        classpage: 't_slide_page'
    };
    
    var $obj = {};
    
    var current = 0;
    
    function slide() {
        current = (current+1) % opt.len;
        var left = 0 - current * opt.width;
        $obj.con.stop().animate({left:left}, opt.overtime);
        $obj.title.removeClass(opt.classcur).eq(current).addClass(opt.classcur);
        $obj.page.removeClass(opt.classcur).eq(current).addClass(opt.classcur);
    };
    
    function init(options) {
        if(options) $.extend(opt, options);
        
        $obj.con = $(this).find('.'+opt.classcon).find("ul");
        $obj.mask = $(this).find('.'+opt.classmask);
        $obj.title = $(this).find('.'+opt.classtitle).find("li");
        $obj.page = $(this).find('.'+opt.classpage).find("li");

        opt.width = $(this).find('.'+opt.classcon).width();
        opt.len = $obj.page.length;
        
        $obj.mask.css({'opacity':opt.opacity});
        $obj.title.eq(0).addClass(opt.classcur);
        $obj.page.eq(0).addClass(opt.classcur);

        if(opt.len == 1) {
            return;
        }

        var timer = setInterval(slide, opt.time);

        $(this).hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(slide, opt.time);
        });
        
        $obj.page.each(function(i){
            $(this).bind(opt.mouseevent, function(){
                current = i - 1;
                slide();
            });
        });
    }
})(jQuery);