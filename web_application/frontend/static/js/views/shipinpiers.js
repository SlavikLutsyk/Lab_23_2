'use strict'

const shipModel = new Ship();
const pierModel = new Pier();
const shipInPiersModel = new shipInPiers() // eslint-disable-line no-undef

function initSelectTag(tagId, model) {
    let collection = model.Select();    
    let selectTag = document.getElementById(tagId);
    for(let i = 0; i < collection.length; ++i) {
        let optionTag = document.createElement('option');
        optionTag.setAttribute('value', collection[i].id);
        optionTag.innerText = collection[i].name;
        selectTag.appendChild(optionTag);
    }
}

function initAddForm() {
    initSelectTag('ship', shipModel);
    initSelectTag('pier', pierModel);

    const form = window.document.querySelector('#shipinpiers-add-form')

    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const shipInPiersData = {}
        formData.forEach((value, key) => {
            shipInPiersData[key] = value
        })

        shipInPiersModel.Create(shipInPiersData)

        e.target.reset()
    })
}
function initList() {
    window.jQuery('#shipinpiers-list').DataTable({
        data: shipInPiersModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Ship', data: 'ship' },
            { title: 'Pier', data: 'pier' },
            { title: 'Delete', data: '' },
            {title: 'Edit', data: ''}
        ],
        columnDefs: [
            {
                render: function(data, type, row) {
                    let ship = shipModel.FindById(data);
                    return ship.name;
                },
                "targets": 1
            },
            {
                render: function(data) {
                    let pier = pierModel.FindById(data);
                    return pier.name;
                },
                "targets": 2
            },
            {
                render: function(data, type, row) {
                    return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
                    
                },
                "targets": 3
            },
            {
              render: function(data, type, row) {
               
                    return '<button type="button" value="edit" onclick="updateObject(this)"> Edit </button>'
                  
            },
                "targets": 4
          }
        ]
    })
}

function initListEvents() {
    document.addEventListener('shipinpiersListDataChanged', function(e) {
        const dataTable = window.jQuery('#shipinpiers-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    shipInPiersModel.Delete(id);
    alert("deletUser")
}
function updateObject(id) {
    const shipInPiersData = shipInPiersModel.FindById(id);
  
    const updateForm = document.createElement('form');
    updateForm.id = 'shipinpiers-update-form';
  
    const shipSelect = document.createElement('select');
    const pierSelect = document.createElement('select');
  
    initSelectTag('ship', shipModel);
    initSelectTag('pier', pierModel);
  
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Update';
  
    updateForm.appendChild(shipSelect);
    updateForm.appendChild(pierSelect);
    updateForm.appendChild(submitButton);
  
    document.body.appendChild(updateForm);
  
    shipSelect.value = shipInPiersData.ship;
    pierSelect.value = shipInPiersData.pier;
  
    updateForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const updatedData = {};
      formData.forEach((value, key) => {
        updatedData[key] = value;
      });
  
      shipInPiersModel.Edit(id, updatedData);
  
      updateForm.remove();
    });
  }


window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})