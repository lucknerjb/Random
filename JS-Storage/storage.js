/**
 * JS Object "Jobs"
 * Storage engine for job applicant's resume information
 * Allows us to implement a basic storage solution so that there is only one call made to the DB when the applicant profile is saved
 */

var Jobs = {
	index: window.localStorage.getItem("Jobs:index"),
	$table: window.localStorage.getItem("profile-table"),
	$search_form: document.getElementById("SearchForm"),
	$results_form: document.getElementById("ResultsForm"),
	$button_save: document.getElementById("addToProfile"), 
	$button_discard: document.getElementById("btnClearForm"),

	init: function() {
		//Initialize the storage index
		if(!Jobs.index){
			window.localStorage.setItem("Jobs:index", Jobs.index = 1);
		}

		//Initialize the form = add event listeners for add and remove buttons
		Jobs.$results_form.reset();
		Jobs.$button_discard.addEventListener("click", function(event) {
			Jobs.$results_form.reset();
			Jobs.$results_form.id_entry.value = 0;

			event.preventDefault();
		}, true);

		Jobs.$results_form.addEventListener("submit", function(event) {
			var entry = {
				id: parseInt(this.id_entry.value), 
				job_title: Jobs.$search_form.SearchJobTitle.value, 
				job_company: Jobs.$search_form.SearchJobCompany.value, 
				job_start_date: Jobs.$search_form.SearchStartDate.value, 
				job_end_date: Jobs.$search_form.SearchEndDate.value
			};

			if (entry.id == 0){	// Add
				Jobs.storeAdd(entry);
				Jobs.tableEdit(entry);
			}else{	// Edit
				Jobs.storeEdit(entry);
				Jobs.tableEdit(entry);
			}

			this.reset();
			this.id_entry.value = 0;
			event.preventDefault();
		}, true);
	},

	//Storage actions
	storeAdd: function(entry) {},
	storeEdit: function(entry) {},
	storeDelete: function(entry) {},

	//Table display actions
	tableAdd: function(entry) {},
	tableEdit: function(entry) {},
	tableRemove: function(entry) {},
};

//Initialize the jobs object
Jobs.init();
