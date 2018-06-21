
"use strict";

var studentItems = $('.student-item');
var studentSearch = '<div class = "student-search"><input id = "search" placeholder = "Find students..."><button>Search</button></div>';
var pagination = '<div class = "pagination"><ul></ul></div>';
var studentList = pageSplitter(studentItems)

$('.page-header.cf').append(studentSearch);

function pageSplitter(list){

	var oldList = list.slice();
	var pagesArray = [];
	while (oldList.length){
		pagesArray.push(oldList.splice(0,10));
	}
	return pagesArray;

}
function showPage(pageNumber, pageList) {
// first hide all students on the page
$(".student-list li").hide();
// then loop through all students in our student list argument
$.each(pageList, function(index, page){
	if(pageNumber == index){
		$.each(page, function(i,listItem){
		$(listItem).fadeIn('fast');
	});
	}
});
}




function appendPageLinks(pageList) {
// determine how many pages for this student list
$('.page').append(pagination)
var numPages = pageList.length;
for(var i = 1; i<= numPages; i++){
	var buttons = '<li><a href = "#">' + i + '</a></li>';
	$('.pagination ul').append(buttons);
}
$('.pagination ul li a').first().addClass('active');

//Add listeners
$(".pagination ul li a").on("click", function(e){
	var pageSelection = parseInt($(this)[0].text) -1;
	showPage(pageSelection, pageList);
	$(".pagination ul li a").removeClass();
	$(this).addClass("active");
	e.preventDefault();
});
}

//Search function. Search by name or email.

function searchList() {
	var searchTerm = $('#search').val().toLowerCase().trim();

		var filteredStudents = studentItems.filter(function(i){
			var studentEmail = $(this).find('.email').text();
			var studentNames = $(this).find('h3').text();
			if(studentNames.indexOf(searchTerm)>-1 || studentEmail.indexOf(searchTerm)> -1){
				return true;
			}
			return false;

		});
		if(filteredStudents.length == 0){
			$('.page-header h2').text('No Results');
		}else{
			$('.page-header h2').text('STUDENTS');
		}
		var paginatedStudents = pageSplitter(filteredStudents);
		$('.pagination').remove();
		if(filteredStudents.length>=10){
			appendPageLinks(paginatedStudents)
		}
		showPage(0, paginatedStudents);

}

appendPageLinks(studentList);
showPage(0, studentList);

//Event Handlers

$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);
