
/* ======= Model ======= */
var model = {
    currentOption: null,
    options: [
        {
            clickCount: 0,
            name: 'Tabby',
            imgSrc: 'img/434164568_fea0ad4013_z.jpg',
            imgAlt: 'Tabby'
        },
        {
            clickCount: 0,
            name: 'Scaredy',
            imgSrc: 'img/22252709_010df3379e_z.jpg',
            imgAlt: 'Scaredy'
        },
        {
            clickCount: 0,
            name: 'Tiger',
            imgSrc: 'img/4154543904_6e2428c421_z.jpg',
            imgAlt: 'Tiger'
        },
        {
            clickCount: 0,
            name: 'Shadow',
            imgSrc: 'img/1413379559_412a540d29_z.jpg',
            imgAlt: 'Shadow'
        },
        {
            clickCount: 0,
            name: 'Sleepy',
            imgSrc: 'img/9648464288_2516b35537_z.jpg',
            imgAlt: 'Sleepy'
        }
    ]
};


/* ======= Controller ======= */
var controller = {
    
    init: function () {
        model.currentOption = model.options[0];
        
        optionView.init();
        optionListView.init();
        adminView.init();
    },
    
    getCurrentOption: function () {
        return model.currentOption;
    },
    
    getOptions: function () {
        return model.options;
    },
    
    setCurrentOption: function (option) {
        model.currentOption = option;
    },
    
    incrementCounter: function () {
        model.currentOption.clickCount++;
        optionView.render();
    },
    
    setNewValues: function (values) {
        model.currentOption.clickCount = values.newCount;
        model.currentOption.name = values.newName;
        model.currentOption.imgSrc = values.newUrl;
        model.currentOption.imgAlt = values.newName;
        
        optionView.render();
    }
}


/* ======= View ======= */
var optionView = {
    
    init: function () {
        this.optionWrap = document.querySelector('.selectedOption');
        this.optionName = this.optionWrap.querySelector('.name');
        this.optionImg = this.optionWrap.querySelector('img');
        this.optionClickCount = this.optionWrap.querySelector('.count');
        
        this.optionImg.addEventListener('click', function () {
            controller.incrementCounter(); 
        });
        
        this.render();
    },
    
    render: function () {
        var currentOption = controller.getCurrentOption();
        this.optionName.textContent = currentOption.name;
        this.optionImg.src = currentOption.imgSrc;
        this.optionImg.alt = currentOption.imgAlt;
        this.optionClickCount.textContent = currentOption.clickCount;
    }
};

var optionListView = {
    
    init: function () {
        this.optionListWrap = document.querySelector('.list');
        
        this.render();
    },
    
    render: function () {
        var option, listItem, i,
            options = controller.getOptions();
        
        for (i = 0; i < options.length; i++) {
            option = options[i];
            listItem = document.createElement('li');
            listItem.textContent = option.name;
            
            listItem.addEventListener('click', (function(optionCopy) {
                return function () {
                    controller.setCurrentOption(optionCopy);
                    optionView.render();
                };
            })(option));
            
            this.optionListWrap.appendChild(listItem);
        }
    }
};

var adminView = {
    
    init: function () {
        this.adminWrap = document.querySelector('.admin-area'); 
        var adminMenu = this.adminWrap.querySelector('.admin-menu'),
            inputName = this.adminWrap.querySelector('.input-name'),
            inputUrl = this.adminWrap.querySelector('.input-url'),
            inputCount = this.adminWrap.querySelector('.input-count');
        this.btnToggle = this.adminWrap.querySelector('.admin-toggle');
        this.btnCancel = this.adminWrap.querySelector('.admin-cancel');
        this.btnSave = this.adminWrap.querySelector('.admin-save');
        
        var clearFields = function () {
            inputName.value = '';
            inputUrl.value = '';
            inputCount.value = '';
        };
        
        this.btnToggle.addEventListener('click', function () {
            adminMenu.classList.toggle('hidden');
            clearFields();
        });
        
        this.btnCancel.addEventListener('click', function () {
            adminMenu.classList.toggle('hidden');
            clearFields();
        });
        
        this.btnSave.addEventListener('click', function () {
            var values = {
                newName: document.querySelector('.input-name').value, 
                newUrl: document.querySelector('.input-url').value, 
                newCount: document.querySelector('.input-count').value
            };
            controller.setNewValues(values); 
            adminMenu.classList.toggle('hidden');
            clearFields();
        });
    }
}

controller.init();
