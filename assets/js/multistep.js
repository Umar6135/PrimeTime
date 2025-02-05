
$(function () {

    $.validator.methods.smartCaptcha = function (value, element, param) {

        return value == param;

    };

    $(".errorsContainer").hide();
    $("#smart-form3").validate({

        /* @validation states + elements 
    
        ------------------------------------------- */

        errorClass: "state-error",
        validClass: "state-success",
        errorElement: "li",

        /* @validation rules 
    
        ------------------------------------------ */

        rules: {

            leistung: {
                required: true
            },
            qm: {
                required: false
            },
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            mobile: {
                required: true,
                number: true,
            },
            street: {
                required: true,
            },
            postle: {
                required: true,
            },
            stadt: {
                required: true,
            },
            comment: {
                required: true,
            },

            generalTerms: {
                required: true
            }
        },

        /* @validation error messages 
    
        ---------------------------------------------- */

        messages: {
            leistung: {
                required: 'Bitte Leistung auswÃ¤hlen'
            },
            name: {
                required: 'Bitte Namen eingeben'
            },
            adress: {
                required: 'Bitte Anschrift eingeben'
            },
            email: {
                required: 'Bitte E-Mail Adresse eingeben',
                email: 'Bitte gÃ¼ltige E-Mail Adresse eingeben'
            },
            street: {
                required: 'Bitte StraÃŸe inklusive Hausnummer eingeben',
            },
            postle: {
                required: 'Bitte Postleitzahl eingeben',
            },
            stadt: {
                required: 'Bitte Stadt eingeben',
            },
            comment: {
                required: "Bitte Nachricht eingeben",
            },

            mobile: {
                required: 'Bitte Telefonnummer eingeben',
                number: 'Bitte nur Zahlen ohne Leerzeichen eingeben'
            },

            generalTerms: {
                required: 'Bitte DatenschutzerklÃ¤rung zustimmen'
            }

        },



        /* @validation highlighting + error placement  
    
        ---------------------------------------------------- */


    });

});


$(function () {


    // Select Dropdown
    $('html').on('click', function () {
        $('.select .dropdown').hide();
    });
    $('.select').on('click', function (event) {
        event.stopPropagation();
    });
    $('.select .select-control').on('click', function () {
        $(this).parent().next().toggle();
    })
    $('.select .dropdown li').on('click', function () {
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    })



    $(".step-box-content ").on('click', function () {

        $(".step-box-content").removeClass("active");
        $(this).addClass("active");
    });

    $(".services-select-option li").on('click', function () {

        $(".services-select-option li").removeClass("active");
        $(this).addClass("active");
    });

    $(".opti-list ul li").on('click', function (e) {
        $(this).find('input[type=checkbox]').prop("checked", !$(this).find('input[type=checkbox]').prop("checked"));

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });

    $('input[type=checkbox]').click(function (e) {
        e.stopPropagation();
        return true;
    });

    $(".plan-icon-text").on('click', function () {
        $(this).find('input[type=radio]').prop("checked", true);
        $(".plan-icon-text").removeClass("active");
        $(this).addClass("active");
    });



    //multi form ===================================
    //DOM elements
    const DOMstrings = {
        stepsBtnClass: 'multisteps-form__progress-btn',
        stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
        stepsBar: document.querySelector('.multisteps-form__progress'),
        stepsForm: document.querySelector('.multisteps-form__form'),
        stepFormPanelClass: 'multisteps-form__panel',
        stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
        stepPrevBtnClass: 'js-btn-prev',
        stepNextBtnClass: 'js-btn-next'
    };


    //remove class from a set of items
    const removeClasses = (elemSet, className) => {

        elemSet.forEach(elem => {

            elem.classList.remove(className);

        });

    };

    //return exect parent node of the element
    const findParent = (elem, parentClass) => {

        let currentNode = elem;

        while (!currentNode.classList.contains(parentClass)) {
            currentNode = currentNode.parentNode;
        }

        return currentNode;

    };

    //get active button step number
    const getActiveStep = elem => {
        return Array.from(DOMstrings.stepsBtns).indexOf(elem);
    };

    //set all steps before clicked (and clicked too) to active
    const setActiveStep = activeStepNum => {

        //remove active state from all the state
        removeClasses(DOMstrings.stepsBtns, 'js-active');
        removeClasses(DOMstrings.stepsBtns, 'current');

        //set picked items to active
        DOMstrings.stepsBtns.forEach((elem, index) => {
            if (index <= activeStepNum) {
                elem.classList.add('js-active');
                $(elem).addClass(index);

            }

            if (index == activeStepNum) {
                elem.classList.add('current');
            }


        });
    };

    //get active panel
    const getActivePanel = () => {

        let activePanel;

        DOMstrings.stepFormPanels.forEach(elem => {

            if (elem.classList.contains('js-active')) {

                activePanel = elem;

            }

        });

        return activePanel;

    };

    //open active panel (and close unactive panels)
    const setActivePanel = activePanelNum => {

        const animation = $(DOMstrings.stepFormPanels, 'js-active').attr("data-animation");

        //remove active class from all the panels
        removeClasses(DOMstrings.stepFormPanels, 'js-active');
        removeClasses(DOMstrings.stepFormPanels, animation);
        removeClasses(DOMstrings.stepFormPanels, 'animate__animated');

        //show active panel
        DOMstrings.stepFormPanels.forEach((elem, index) => {
            if (index === activePanelNum) {

                elem.classList.add('js-active');
                // stepFormPanels
                elem.classList.add('animate__animated', animation);

                setTimeout(function () {
                    removeClasses(DOMstrings.stepFormPanels, 'animate__animated', animation);
                }, 1200);

                setFormHeight(elem);

            }
        });

    };


    //set form height equal to current panel height
    const formHeight = activePanel => {

        const activePanelHeight = activePanel.offsetHeight;

        DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

    };

    const setFormHeight = () => {
        const activePanel = getActivePanel();

        formHeight(activePanel);
    };

    //STEPS BAR CLICK FUNCTION
    DOMstrings.stepsBar.addEventListener('click', e => {

        //check if click target is a step button
        const eventTarget = e.target;

        if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
            return;
        }

        //get active button step number
        const activeStep = getActiveStep(eventTarget);

        //set all steps before clicked (and clicked too) to active
        // setActiveStep(activeStep);

        //open active panel
        // setActivePanel(activeStep);
    });

    //PREV/NEXT BTNS CLICK
    DOMstrings.stepsForm.addEventListener('click', e => {

        const eventTarget = e.target;

        //check if we clicked on `PREV` or NEXT` buttons
        if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
            return;
        }

        //find active panel
        const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

        let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);


        //set active step and active panel onclick
        if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
            if (eventTarget.classList.contains('twostepback')) {
                activePanelNum -= 2;

            }
            else {
                activePanelNum--;
            }

            setActiveStep(activePanelNum);
            setActivePanel(activePanelNum);

        } else if (eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)) {

            var form = $('#wizard');
            form.validate();


            var parent_fieldset = $('.multisteps-form__panel.js-active');
            var next_step = true;

            parent_fieldset.find('.required').each(function () {
                next_step = false;
                var form = $('.required');
                form.validate();
                $(this).addClass('custom-select is-invalid');
            });

            if (next_step === true || form.valid() === true) {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                activePanelNum++;
                setActiveStep(activePanelNum);
                setActivePanel(activePanelNum);
            }


        }


    });

    //SETTING PROPER FORM HEIGHT ONLOAD
    window.addEventListener('load', setFormHeight, true);

    //SETTING PROPER FORM HEIGHT ONRESIZE
    window.addEventListener('resize', setFormHeight, true);

    $('#multistepsform').on('shown.bs.modal', function () {
        setFormHeight();
    });
})
$(document).ready(function () {


    $('input[name="typeidentifier"]').on('click', function () {
        var checkedInput = $('input[name="typeidentifier"]:checked');
        if (checkedInput.length > 0) {
            $('#step0-nbtn').addClass('active js-btn-next');

            if (checkedInput.val() === "Unternehmen") {
                $('#company-input').addClass('d-block');
                $('#type-indiviual').addClass('d-none').removeClass('d-block');
                $('#type-company').addClass('d-block').removeClass('d-none');
                $('.destination-company-name-input').addClass('d-block');
                $('.addFormStep').removeClass('addFormPrivate');
                $('#step0-nbtn.js-btn-next').click(); // Click on the button with id "oil"
            } else {
                $('.destination-company-name-input').addClass('d-none')
                $('#type-indiviual').addClass('d-block').removeClass('d-none');
                $('#type-company').addClass('d-none').removeClass('d-block');
                $('.addFormStep').addClass('addFormPrivate');

                // /*---------------  Private No Offer ---------------------*/
                // $('#NoOffer').addClass('d-block');
                // $('#PrivateOffer').addClass('d-none');
                // $('.multistep-3  .form__action').addClass('d-none');
                // setTimeout(function () {
                //     window.location.href = 'https://unterhaltsreinigung-roland.de/';
                // }, 10000);
                // /*---------------  Private No Offer End ---------------------*/



                $('#step0-nbtn.js-btn-next').click(); // Click on step1-nbtn


            }
        } else {
            $('#step0-nbtn').removeClass('active js-btn-next');
        }

        $('#step0-nbtn').toggleClass('disable', !$('#step0-nbtn').hasClass('active')).attr('aria-disabled', !$('#step0-nbtn').hasClass('active'));
    });






    $('input[name="cleaningPlace"], input[name="indcleanPlace"]').on('click', function () {
        if ($('input[name="cleaningPlace"]:checked').val() === 'sonstiges' || $('input[name="indcleanPlace"]:checked').val() === 'sonstiges') {
            $('[id="webaddress"]').addClass("d-block");
            $('#step1-nbtn').addClass("d-block");
            $('#step1-nbtn').addClass('disable').attr('aria-disabled', 'true');


        } else {
            $('[id="webaddress"]').removeClass("d-block");
            $('#step1-nbtn').addClass('active js-btn-next').click();

        }
        $('#step1-bkbtn').on('click', function () {
            $('[id="webaddress"]').removeClass("d-block").val("");
            $('#weblink').val('');
            $('#indweblink').val('');
            // Modify the class of the element with ID "step1-nbtn"
            $('#step1-nbtn').removeClass("d-block active js-btn-next").addClass("d-none");
        });

    });



    $('input[name="checkbox[]"]').on('click', function () {
        if ($('input[name="checkbox[]"]:checked').length > 0 || $('#checkboxInput').val() !== '') {

            $('#step2-nbtn').addClass('active js-btn-next d-block').removeClass('disable');

            if ($('input[name="checkbox[]"][value="sonstiges"]').is(':checked')) {

                if ($('#checkboxInput').val() !== '') {
                    $('#step2-nbtn').addClass('active js-btn-next').removeClass('disable').attr('aria-disabled', 'false');
                }
                else {
                    $('#step2-nbtn').removeClass('active js-btn-next').addClass('disable').attr('aria-disabled', 'true');
                    $('[id="checkboxsonstiges"]').addClass("d-block");
                }
            } else {
                $('[id="checkboxsonstiges"]').removeClass("d-block");
                $('#checkboxInput').val('');
            }
        } else {
            $('#step2-nbtn').removeClass('active js-btn-next').addClass('disable').attr('aria-disabled', 'true');
        }



    });

    $('#checkboxInput').on('input', function () {
        if ($(this).val().trim() == '') {
            $(this).removeClass('active').addClass('gui-input');
            $('#step2-nbtn').removeClass('active js-btn-next').addClass('disable');
        } else {
            $(this).addClass('active').removeClass('gui-input');
            $('#step2-nbtn').addClass('active js-btn-next').removeClass('disable');
        }
    });



    $('input[name="location"]').on('click', function () {
        console.log("clicked")
        if ($('input[name="location"]:checked').val() === 'sonstiges') {
            $('[id="loc-sontige"]').addClass("d-block");
            $('#step3-nbtn').addClass("d-block");
            $('#step3-nbtn').addClass('disable').attr('aria-disabled', 'true');


        } else {
            $('[id="loc-sontige"]').removeClass("d-block");
            $('#step3-nbtn').addClass('active js-btn-next').click();

        }
        $('#step3-bkbtn').on('click', function () {
            $('[id="loc-sontige"]').removeClass("d-block").val("");
            $('#loc-sontige-input').val('');
            // Modify the class of the element with ID "step1-nbtn"
            $('#step3-nbtn').removeClass("d-block active js-btn-next").addClass("d-none");
        });

    });










    $('input[name="NoOfWash"]').on('click', function () {
        console.log("clicked")
        if ($('input[name="NoOfWash"]:checked').val() === 'sonstiges') {
            $('[id="NoOfWash-sontige"]').addClass("d-block");
            $('#step4-nbtn').addClass("d-block");
            $('#step4-nbtn').addClass('disable').attr('aria-disabled', 'true');


        } else {
            $('[id="NoOfWash-sontige"]').removeClass("d-block");
            $('#step4-nbtn').addClass('active js-btn-next').click();

        }
        $('#step4-bkbtn').on('click', function () {
            $('[id="NoOfWash-sontige"]').removeClass("d-block").val("");
            $('#NoOfWash-sontige-input').val('');
            // Modify the class of the element with ID "step1-nbtn"
            $('#step4-nbtn').removeClass("d-block active js-btn-next").addClass("d-none");
        });

    });



    $('input[name="Niche"], input[name="name"] , input[name="channel-link"]').on('input', function () {
        if ($('input[name="typeidentifier"]:checked').val() === 'Unternehmen') {
            if ($('input[name="Niche"]').val().trim() !== '' &&
                $('input[name="name"]').val().trim() !== '' &&
                $('input[name="channel-link"]').val().trim() !== '' ){
                $('#step8-nbtn').addClass('active js-btn-next').removeClass('disable');
            } else {
                $('#step8-nbtn').removeClass('active js-btn-next');
            }
        }
        else {
            if ($('input[name="name"]').val().trim() !== '' &&
                $('input[name="Niche"]').val().trim() !== '' &&
                $('input[name="channel-link"]').val().trim() !== '') {
                $('#step8-nbtn').addClass('active js-btn-next').removeClass('disable');
            } else {
                $('#step8-nbtn').removeClass('active js-btn-next');
            }
        }

    });




    $('input[name="name"], input[name="company-name"] , input[name="street"], input[name="postle"], input[name="stadt"]').on('input', function () {
        if ($('input[name="typeidentifier"]:checked').val() === 'Unternehmen') {
            if ($('input[name="street"]').val().trim() !== '' &&
                $('input[name="name"]').val().trim() !== '' &&
                $('input[name="company-name"]').val().trim() !== '' &&
                $('input[name="postle"]').val().trim() !== '' &&
                $('input[name="stadt"]').val().trim() !== '') {
                $('#step8-nbtn').addClass('active js-btn-next').removeClass('disable');
            } else {
                $('#step8-nbtn').removeClass('active js-btn-next');
            }
        }
        else {
            if ($('input[name="name"]').val().trim() !== '' &&
                $('input[name="postle"]').val().trim() !== '' &&
                $('input[name="stadt"]').val().trim() !== '') {
                $('#step8-nbtn').addClass('active js-btn-next');
            } else {
                $('#step8-nbtn').removeClass('active js-btn-next');
            }
        }

    });


    $('textarea[name="comment"]').on('input', function () {
        if ($(this).val().trim() !== '') {
            $('#step5-nbtn').addClass('active js-btn-next').removeClass('disable');
   console.log("wszdxf")
        } else {
            $('#step5-nbtn').removeClass('active js-btn-next');
        }
    });

    $('#step5-nbtn').on('click', function () {
        $('.multistep-7').addClass('timer-delay');
        $('.timer').addClass('d-block');
        $('.multisteps-form__progress').addClass('d-none');


        setTimeout(function () {
            $('.multistep-7').removeClass('timer-delay');
            $('.timer').removeClass('d-block');
            $('.multisteps-form__progress').removeClass('d-none');

        }, 4000);


    });


    $('input[name="creator"], input[name="name"] ,  input[name="Company"], input[name="Address"], input[name="Postal"] , input[name="City"]').on('input', function () {
        if ($('input[name="typeidentifier"]:checked').val() === 'Unternehmen') {
            if ($('input[name="creator"]').val().trim() !== '' &&
                $('input[name="name"]').val().trim() !== '' &&
                $('input[name="Company"]').val().trim() !== '' &&
                $('input[name="Address"]').val().trim() !== '' &&
                $('input[name="Postal"]').val().trim() !== '' &&
                $('input[name="City"]').val().trim() !== '')  {
                $('#step9-nbtn').addClass('active js-btn-next').removeClass('disable');
            } else {
                $('#step9-nbtn').removeClass('active js-btn-next');
            }

        }
        else {
            if ($('input[name="creator"]').val().trim() !== '' &&
                $('input[name="name"]').val().trim() !== '' &&
                $('input[name="Company"]').val().trim() !== '' &&
                $('input[name="Address"]').val().trim() !== '' &&
                $('input[name="Postal"]').val().trim() !== '' &&
                $('input[name="City"]').val().trim() !== '') {
                $('#step9-nbtn').addClass('active js-btn-next').removeClass('disable');
            } else {
                $('#step9-nbtn').removeClass('active js-btn-next');
            }

        }
    });





    $('input[name="email"]').on('input', function () {
        var inputValue = $(this).val().trim();

        if (inputValue !== '' && isValidEmail(inputValue)) {
            $('#step13-nbtn').addClass('active js-btn-next').removeClass('disable');
        } else {
            $('#step13-nbtn').removeClass('active js-btn-next');
        }
    });



    function isValidEmail(email) {
        // Use a regular expression to check if the input is a valid email address

        var emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z0-9]{1,}$/;
        var atIndex = email.indexOf('@');
        var dotIndex = email.indexOf('.', atIndex);

        return emailRegex.test(email) && dotIndex !== -1 && dotIndex !== atIndex + 1;
    }



    $('#customer').on('input', function () {
        if ($(this).val().trim() !== '') {
            $('#step2-nbtn').addClass('active js-btn-next');
            $('#step2-nbtn').removeClass('disable');

        } else {
            $('#step2-nbtn').removeClass('active js-btn-next');
            $('#step2-nbtn').addClass('disable');

        }
    });


});

$(document).ready(function () {
    $('#indweblink, #weblink').on('input', function () {
        if ($(this).val().trim() == '') {
            $(this).removeClass('active').addClass('gui-input');
            $('#step1-nbtn').removeClass('active js-btn-next').addClass('disable');

        } else {
            $(this).addClass('active').removeClass('gui-input');
            $('#step1-nbtn').addClass('active js-btn-next').removeClass('disable');

        }
    });
    $('#loc-sontige-input').on('input', function () {
        if ($(this).val().trim() == '') {
            $(this).removeClass('active').addClass('gui-input');
            $('#step3-nbtn').removeClass('active js-btn-next').addClass('disable');

        } else {
            $(this).addClass('active').removeClass('gui-input');
            $('#step3-nbtn').addClass('active js-btn-next').removeClass('disable');

        }
    });
    $('#NoOfWash-sontige-input').on('input', function () {
        if ($(this).val().trim() == '') {
            $(this).removeClass('active').addClass('gui-input');
            $('#step4-nbtn').removeClass('active js-btn-next').addClass('disable');

        } else {
            $(this).addClass('active').removeClass('gui-input');
            $('#step4-nbtn').addClass('active js-btn-next').removeClass('disable');

        }
    });







    $("#twostepback").click(function () {
        var element = $(this);
        setTimeout(function () {
            element.removeClass("twostepback");
        }, 500); // 500 milliseconds = 0.5 seconds
    });

});



$(document).ready(function () {
    $("#smart-form3").submit(function (e) {
        e.preventDefault();  // Prevent default form submission
        
        if ($("#smart-form3").valid()) {  // Ensure form is valid
            var formData = $(this).serialize();  // Serialize form data

            $.ajax({
                url: "multistep-form/php/smartprocess",  // Submission URL
                type: "POST",
                data: formData,
                success: function (response) {
                    $("#thankyou").modal("show");

                    // Check and log type identifier value
                    var typeIdentifierValue = $("input[name='typeidentifier']:checked").val();
                    

                    // Log the selected location value
                    var location = $("input[name='location']:checked").val();
                    console.log("Location captured right before check:", location);  // Debugging log

                    
                },
                error: function (xhr, status, error) {
                    console.log("Error submitting the form.");
                    console.log(error);
                }
            });
        }
    });

    $(".modal-header .close").click(function () {
        $("#thankyou").modal("hide");
    });

    var modalOpen = false;
    $('#thankyou').on('show.bs.modal', function () {
        modalOpen = true;
        setTimeout(function () {
            if (modalOpen) {
                window.location.href = "https://unterhaltsreinigung-roland.de/";
            }
        }, 5000);  // Change to 5 seconds for testing
    });

    $('#thankyou').on('hide.bs.modal', function () {
        modalOpen = false;
    });
});



$(document).ready(function () {

    function checkInputs() {

        // Your existing validation logic
        if ($('input[name="typeidentifier"]:checked').val() === 'Unternehmen') {

            if (
                $('input[name="company-building-name"]').val().trim() !== '' &&
                $('input[name="company-building-street"]').val().trim() !== '' &&
                $('input[name="company-building-postle"]').val().trim() !== '' &&
                $('input[name="company-building-stadt"]').val().trim() !== ''
            ) {
                $('#step9-nbtn').addClass('active js-btn-next');
            }
        }
        else {
            if (
                $('input[name="company-building-street"]').val().trim() !== '' &&
                $('input[name="company-building-postle"]').val().trim() !== '' &&
                $('input[name="company-building-stadt"]').val().trim() !== ''
            ) {
                $('#step9-nbtn').addClass('active js-btn-next');
            }
        }
        if (
            $('input[name="company-building-name"]').val().trim() == '' &&
            $('input[name="company-building-street"]').val().trim() == '' &&
            $('input[name="company-building-postle"]').val().trim() == '' &&
            $('input[name="company-building-stadt"]').val().trim() == ''
        ) {
            $('#step9-nbtn').removeClass('active js-btn-next');
        }
    }

    // Listen for checkbox change
    $('#copyData').on('change', function () {
        if ($(this).is(':checked')) {
            if ($('input[name="typeidentifier"]:checked').val() === 'Unternehmen') {


                // Copy data from source to destination
                var companyName = $('#company-name').val();
                var street = $('#location-input').val();
                var postle = $('#postle').val();
                var stadt = $('#stadt').val();

                // Paste data into destination fields
                $('#destination-company-name').val(companyName);
                $('#destination-location-input').val(street);
                $('#destination-postle').val(postle);
                $('#destination-stadt').val(stadt);
                checkInputs();
            }
            else {
                var street = $('#location-input').val();
                var postle = $('#postle').val();
                var stadt = $('#stadt').val();

                // Paste data into destination fields
                $('#destination-location-input').val(street);
                $('#destination-postle').val(postle);
                $('#destination-stadt').val(stadt);
                checkInputs();
            }
        } else {
            // If the checkbox is unchecked, clear the destination fields
            $('#destination-company-name').val('');
            $('#destination-location-input').val('');
            $('#destination-postle').val('');
            $('#destination-stadt').val('');
            checkInputs();

        }
    });
});


$(document).ready(function () {

    function checkAllInputs() {
        var parentContainer = $('#contentToAppend');
        var allBlocks = parentContainer.find('.step-inner-content');
        var allFilled = true;

        allBlocks.each(function () {
            var currentBlock = $(this);
            var allInputs;

            if ($('input[name="typeidentifier"]:checked').val() === 'Unternehmen') {
                allInputs = currentBlock.find('input[name="company-building-name1[]"], input[name="company-building-street1[]"], input[name="company-building-postle1[]"], input[name="company-building-stadt1[]"]');
            } else {
                allInputs = currentBlock.find('input[name="company-building-street1[]"], input[name="company-building-postle1[]"], input[name="company-building-stadt1[]"]');
            }

            allInputs.each(function () {
                if ($(this).val().trim() === '') {
                    allFilled = false;
                    return false; // Exit the loop early if any input is empty
                }
            });
        });

        if (allFilled) {
            $('#step11-nbtn').addClass('active js-btn-next');

        } else {
            $('#step11-nbtn').removeClass('active js-btn-next');
        }
    }

    // Use event delegation for dynamically added inputs
    $(document).on('input', '#contentToAppend input[name="company-building-name1[]"], #contentToAppend input[name="company-building-street1[]"], #contentToAppend input[name="company-building-postle1[]"], #contentToAppend input[name="company-building-stadt1[]"]', checkAllInputs);


    var maxItems = 9; // Maximum number of items allowed
    var itemCount = 0;
    var itemNum = 2;


    function updateItemNum() {
        $('.addFormStep .step-inner-content').each(function (index) {
            $(this).find('h2 span').text(index + 2);
        });
    }

    $('#AddMoreItem').on('click', function () {
        if (itemCount < maxItems) {
            itemNum++
            var htmlContent = `
                            <div class="step-inner-content last__step__form text-center p-relative">

                <a class="deleteItemBtn"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg></a>

                    <h2>Reinigungsobjekt # <span>${itemNum}</span></h2>
                    <p>Bitte geben Sie hier die Adresse des zu reinigenden GebÃ¤udes an.</p>



                    <div class="form-inner-area mb-4 destination-data dynamic-content">
                        <div class="row">

                            <div class="col-12">
                                <div class="smart-forms text-start destination-company-name-input ">

                                    <label class="field-label ">
                                        Unternehmen :

                                    </label>
                                    <label class="field-label prepend-icon">

                                        <input type="text" class="gui-input form-control pac-target-input"
                                            name="company-building-name1[]" id="destination-company-name">

                                        <span class="field-icon">
                                            <svg id="Layer_1" enable-background="new 0 0 468 468" width="17" height="17"
                                                fill="rgb(130,130,130)" viewBox="0 0 468 468"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path d="m104.884 131.227h71.492v30.017h-71.492z">
                                                            </path>
                                                        </g>
                                                        <g>
                                                            <path d="m104.884 199.484h71.492v30.017h-71.492z">
                                                            </path>
                                                        </g>
                                                        <g>
                                                            <path d="m104.884 267.74h71.492v30.017h-71.492z">
                                                            </path>
                                                        </g>
                                                        <g>
                                                            <path d="m104.884 335.997h71.492v30.017h-71.492z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <path
                                                            d="m249.46 405.983v-245.267l156.74-.183v165.459h30v-180.485c0-8.188-6.841-15.009-15.018-15.009l-186.74.218c-8.277.01-14.982 6.726-14.982 15.009v260.258h-157.66v-296.996l157.66-42.413v34.075h30v-53.652c0-9.71-9.511-17.018-18.895-14.494l-187.66 50.483c-6.551 1.763-11.105 7.706-11.105 14.494v308.503h-31.8v30.017h468v-30.017z">
                                                        </path>
                                                        <g>
                                                            <path d="m406.2 353.008h30v27.961h-30z">
                                                            </path>
                                                        </g>
                                                        <g>
                                                            <g>
                                                                <path d="m291.624 199.484h71.492v30.017h-71.492z">
                                                                </path>
                                                            </g>
                                                            <g>
                                                                <path d="m291.624 267.74h71.492v30.017h-71.492z">
                                                                </path>
                                                            </g>
                                                            <g>
                                                                <path d="m291.624 335.997h71.492v30.017h-71.492z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>

                                        </span> </label>

                                </div>

                                <div class="smart-forms text-start">

                                    <label class="field-label ">
                                        StraÃŸe inklusive Hausnummer :

                                    </label>
                                    <label class="field-label prepend-icon">

                                        <input type="text" class="gui-input form-control pac-target-input"
                                            name="company-building-street1[]" id="destination-location-input">

                                        <span class="field-icon">

                                            <svg version="1.1" id="Capa_1" height="17" width="17"
                                                fill="rgb(130,130,130)" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                                                xml:space="preserve">

                                                <g>

                                                    <g>

                                                        <path
                                                            d="M256,0C156.748,0,76,80.748,76,180c0,33.534,9.289,66.26,26.869,94.652l142.885,230.257c2.737,4.411,7.559,7.091,12.745,7.091c0.04,0,0.079,0,0.119,0c5.231-0.041,10.063-2.804,12.75-7.292L410.611,272.22C427.221,244.428,436,212.539,436,180C436,80.748,355.252,0,256,0z M384.866,256.818L258.272,468.186l-129.905-209.34C113.734,235.214,105.8,207.95,105.8,180c0-82.71,67.49-150.2,150.2-150.2S406.1,97.29,406.1,180C406.1,207.121,398.689,233.688,384.866,256.818z">
                                                        </path>

                                                    </g>

                                                </g>

                                                <g>

                                                    <g>

                                                        <path
                                                            d="M256,90c-49.626,0-90,40.374-90,90c0,49.309,39.717,90,90,90c50.903,0,90-41.233,90-90C346,130.374,305.626,90,256,90z M256,240.2c-33.257,0-60.2-27.033-60.2-60.2c0-33.084,27.116-60.2,60.2-60.2s60.1,27.116,60.1,60.2C316.1,212.683,289.784,240.2,256,240.2z">
                                                        </path>

                                                    </g>

                                                </g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                                <g></g>

                                            </svg>

                                        </span> </label>

                                </div>
                                <div class="d-flex justify-content-between adress-input">

                                    <div class="smart-forms pr-1 text-start">
                                        <label class="field-label">
                                            Postleitzahl :
                                        </label> <label class="field-label prepend-icon ">


                                            <input type="text" class="gui-input ps-2 form-control pac-target-input"
                                                name="company-building-postle1[]" id="destination-postle">

                                        </label>
                                    </div>
                                    <div class="smart-forms pl-1 text-start">
                                        <label class="field-label">
                                            Stadt :
                                        </label> <label class="field-label prepend-icon">
                                            <input type="text" class="gui-input ps-2 form-control pac-target-input"
                                                name="company-building-stadt1[]" id="destination-stadt">

                                        </label>
                                    </div>

                                </div>


                            </div>




                        </div>


                    </div>


                </div>       
 `;

            $('#contentToAppend').append(htmlContent);

            itemCount++;
            updateItemNum();

            var currentHeight = $('.multistepform__desktop').height();

            var additionalHeight = 500; // Change this value to your desired additional height

            var newHeight = currentHeight + additionalHeight;

            $('.multistepform__desktop').height(newHeight);
        } else {
            $("#Limit").addClass('d-block')
        }
        checkAllInputs();
    });
    $(document).on('click', '.deleteItemBtn', function () {
        var item = $(this).closest('.step-inner-content');
        var itemHeight = item.outerHeight(true);
        item.remove();
        itemCount--;
        updateItemNum();


        var currentHeight = $('.multistepform__desktop').height();
        var newHeight = currentHeight - itemHeight;
        $('.multistepform__desktop').height(newHeight);
    });


    $('input[name="moreCLeaning"]').on('click', function () {
        if ($('input[name="moreCLeaning"]:checked').val() === 'nein') {
            $('#email-Bbtn').addClass('twostepback');
            $('[id="moreCLeaning"]').removeClass("d-block");
            $('#step11-nbtn').addClass('active js-btn-next').click();


        } else {
            $('[id="moreCLeaning"]').removeClass("d-block");
            $('#step10-nbtn').addClass('active js-btn-next').click();
            checkAllInputs();



        }
        if ($('input[name="moreCLeaning"]:checked').val() === 'ja') {
            $('#email-Bbtn').removeClass('twostepback');
        }
        $('#step10-bkbtn').on('click', function () {
            $('#step10-nbtn').removeClass("d-block active js-btn-next").addClass("d-none");
        });

    });
    $(document).on('click', '#email-Bbtn.twostepback', function () {
        $('#step11-nbtn').removeClass('active js-btn-next');
    });


});








$('#datepicker').datepicker({
    language: 'en',
    onSelect: function (formattedDate, date, inst) {
        $('#selectedDateInput').val(formattedDate);
        $('#clNextbtn').addClass('active js-btn-next d-block').removeClass('disable').attr('aria-disabled', 'false');
        $('.date-validation').removeClass('d-block');
        var currentDatetime = new Date().toISOString().slice(0, 16);
        $("#datetime").val(currentDatetime);
    }
});
