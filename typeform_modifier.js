$(document).ready(function() {
    // Генерируем randomValue один раз при загрузке страницы
    const randomValue = Math.random().toString(36).substring(2, 15);

    $('.sqs-add-to-cart-button-inner').on('click', function(event) {
        //event.preventDefault();
        //event.stopPropagation();
        setTimeout('initNewForm()', 1)
        //initNewForm();
    });

    function initNewForm() {
        if ($('#dynamicPopup').length === 0) {
            $('body').append(`
                <div class="modal fade" id="dynamicPopup"  tabindex="-1" role="dialog" aria-labelledby="dynamicPopupLabel" aria-hidden="true" style="display: none;z-index: 1050;">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="dynamicPopupLabel">Step 1</h5>
                                <button type="button" class="close" id="closePopup" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="stepForm">
                                    <div id="step1">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" class="form-control" id="name" required>
                                        </div>
                                    </div>
                                    <div id="step2" style="display:none;">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input type="email" class="form-control" id="email" required>
                                        </div>
                                    </div>
                                    <div id="step3" style="display:none;">
                                        <div class="form-group">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="description" required></textarea>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary" id="nextStep">Next Step</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                                
            `);
            document.getElementById("nextStep").addEventListener("click", function() {
                // Получаем значения из полей первой формы
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const description = document.getElementById("description").value;

                // Устанавливаем значения во вторую форму
                document.getElementById("text-yui_3_17_2_1_1730209060327_10375-field").value = name;
                document.getElementById("email-yui_3_17_2_1_1730209060327_11077-field").value = email;
                document.getElementById("textarea-yui_3_17_2_1_1730209060327_11816-field").value = description;
            });
        }

        $('#dynamicPopup').css('display', 'block').addClass('show');

        // Обработка закрытия попапа
        $(document).on('click', '#closePopup', function() {
            $('#dynamicPopup').removeClass('show').css('display', 'none'); // Скрыть попап
        });

        // Переход на шаги
        let currentStep = 1;
        let name = '';
        let email = '';
        let description = '';

        $(document).on('click', '#nextStep', function() {
            if (currentStep === 1) {
                name = $('#name').val();
                if (name) {
                    // Отправка данных первого шага
                    $.ajax({
                        type: 'POST',
                        url: 'https://mgr8cnbvn9.execute-api.us-east-1.amazonaws.com/dev',
                        data: JSON.stringify({ name: name, randomValue: randomValue, email: email, description: description, step: 'Step 1' }),
                        contentType: 'application/json'
                    });
                    currentStep++;
                    $('#step1').hide();
                    $('#step2').show();
                    $('#dynamicPopupLabel').text('Step 2');
                } else {
                    alert('Please fill out all fields.');
                }
            } else if (currentStep === 2) {
                email = $('#email').val();
                if (email) {
                    // Отправка данных второго шага
                    $.ajax({
                        type: 'POST',
                        url: 'https://mgr8cnbvn9.execute-api.us-east-1.amazonaws.com/dev',
                        data: JSON.stringify({ name: name, randomValue: randomValue, email: email, description: description, step: 'Step 2' }),
                        contentType: 'application/json'
                    });
                    currentStep++;
                    $('#step2').hide();
                    $('#step3').show();
                    $('#dynamicPopupLabel').text('Step 3');
                } else {
                    alert('Please fill out all fields.');
                }
            } else if (currentStep === 3) {
                description = $('#description').val();
                if (description) {
                    // Отправка данных третьего шага
                    $.ajax({
                        type: 'POST',
                        url: 'https://mgr8cnbvn9.execute-api.us-east-1.amazonaws.com/dev',
                        data: JSON.stringify({ name: name, randomValue: randomValue, email: email, description: description, step: 'Step 3' }),
                        contentType: 'application/json'
                    });
                    alert('Form submitted successfully!');

                    currentStep = 1;
                    $('#dynamicPopup').remove(); // Удаляем попап после отправки
                    //$('#dynamicPopup').removeClass('show').css('display', 'none');
                } else {
                    alert('Please fill out all fields.');
                }
            }
        });
    }
});