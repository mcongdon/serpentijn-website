// Ensure app namespace
var Components = Components || {};

(function ($) {

Components.Main = {

    init: function () {
		Components.FeatureSlider.init();
	}
};


Components.FeatureSlider = {
    
    vars:{
        active:0,
        total:0,
        slideWidth:0,
        slideHeight:0,
        speed: 1500,
        autoRotateSpeed: 8000,
        autoRotateTimerId: 0,  
        isAnimating: false
    }, 
	
	elements: {
		$slider: {}, 
		$slidesContainer: {},
		$slides: {},
	}, 

    init: function() {
        var o = Components.FeatureSlider,  
            v = o.vars,
            el = o.elements;        
        
        el.$slider = $("#feature-slider"); 
        el.$slidesContainer = el.$slider.find(".slide-container"); 
        el.$slides = el.$slidesContainer.find(".slide"); 
        
        v.total = el.$slides.length; 
        
        o.gotoSlide(v.active); 
    }, 
		
    next: function() {
        var o = Components.FeatureSlider,  
            v = o.vars,
            el = o.elements;        
        		
        var next = v.active + 1; 
        o.gotoSlide(next); 
	}, 

    gotoSlide: function(index) {
        var o = Components.FeatureSlider,  
            v = o.vars,
            el = o.elements;        
        
        if (v.isAnimating) { return; }
    
        v.isAnimating = true;

        if (index < 0) {
            index = (v.total - 1); 
        } else if (index >= v.total){
            index = 0; 
        }

        el.$slides.eq(index).fadeIn(v.speed, function(){
            el.$slides.eq(index).find(".call-to-action").fadeIn(400);
        });

        if(v.active != index){
            
            el.$slides.eq(v.active).find(".call-to-action").fadeOut(300, function(){
        
                el.$slides.eq(v.active).fadeOut(v.speed, function(){
                                     
                    el.$slides.eq(v.active).find(".call-to-action").hide(); 
                    
                    el.$slides.eq(v.active).removeClass("active");
                    el.$slides.eq(index).addClass("active");
                    
                    v.active = index; 
                    v.isAnimating = false;        
                    clearTimeout(v.autoRotateTimerId);
                    v.autoRotateTimerId = setTimeout(o.next, v.autoRotateSpeed)                                 
                });                
            }); 

        } else{
            v.active = index; 
            v.isAnimating = false;        
            clearTimeout(v.autoRotateTimerId);
            v.autoRotateTimerId = setTimeout(o.next, v.autoRotateSpeed)
        }


    }

};

$(Components.Main.init);

})(jQuery);
