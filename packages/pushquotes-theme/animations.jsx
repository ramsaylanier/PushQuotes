var existingAnimateModalOut = Animations.AnimateModalOut;

Animations.AnimateModalOut = function(){
	$('.page').removeClass('edit-mode');
	$('.card').removeClass('edit-mode');
	existingAnimateModalOut();
}