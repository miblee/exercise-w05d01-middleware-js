// console.log('HTML');
// var $greeting = document.querySelector('#greeting');

// var handleGreeting = function(evt){
//   $greeting.textContent = 'Hello!';
// }


// $greeting.addEventListener('click', handleGreeting);


var $greeting = $('#greeting').on('click', function(){
  $(this).text('Hello from main.js');
})
