
'use strict'

const shipModel = new Ship() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#ship-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const shipData = {}
    formData.forEach((value, key) => {
      shipData[key] = value
    })

    if (shipData.name != '' && shipData.weight != ''&& shipData.country != '' && shipData.number != '')
      shipModel.Create(shipData)

    e.target.reset()
  })
}

// update form
function initUpdateForm(row) {
  const form = window.document.querySelector('#store-update_el-form')
  const closeBtn = window.document.querySelector('#btn_close')

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault()
    form.style.visibility = 'hidden'
  })

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const coll_ships = shipModel.SelectByKey('ships')

    const shipData = {}
    formData.forEach((value, key) => {
      shipData[key] = value
    })

    const res = coll_ships.map((el, index) => {
      console.log(el.id, row.id)
      if (el.id == row.id) return { ...shipData, id: el.id }
      return el
    })

    shipModel.Update(res)

    window.location.reload();
    e.target.reset()
  })
}

function initDelete(row) {
  const formData = JSON.parse(row)

  shipModel.Delete(formData)
}

function initUpdate_el(row) {
  const formData = JSON.parse(row)

  const form = window.document.querySelector('#store-update_el-form')
  form.style.visibility = 'visible'

  initUpdateForm(formData)
}

function addEventToDeleteButtons() {
  const elems = document.querySelectorAll('#btn_delete')

  elems.forEach((item) => {
    // console.log('assign: ', item)
    item.addEventListener('click', function () {
      // console.log('addEventListener here')
      initDelete(item.dataset.item)
    })
  })
}
function addEventToUpdateButtons() {
  const elems = document.querySelectorAll('#btn_update')

  elems.forEach((item) => {
    // console.log('assign: ', item)
    item.addEventListener('click', function () {
      // console.log('addEventListener here', item.dataset.item)

      initUpdate_el(item.dataset.item)
    })
  })
}

function initList() {
  window.jQuery('#ship-list').DataTable({
    data: shipModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Country', data: 'country' },
      { title: 'Number', data: 'number' },
      { title: 'Weight', data: 'weight' },
      {
        data: null,
        title: 'Action',
        wrap: true,
        render: function (item) {
          const def = JSON.stringify(item)
          return `<div>
          <div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-item='${def}'>Delete</button></div>
          <div class="btn-group"> <button type="button"  id="btn_update" class="btn_update btn-primary " data-item='${def}'>Update</button></div>
          </div>`
        },
      },
    ],
  })

  addEventToDeleteButtons()
  addEventToUpdateButtons()
}

function initButtonsEvent() {
  document.addEventListener(
    'shipsListDataChanged',
    function () {
      addEventToDeleteButtons()
      addEventToUpdateButtons()
    },
    false,
  )
}

function initListEvents() {
  document.addEventListener(
    'shipsListDataChanged',
    function (e) {
      const dataTable = window.jQuery('#ship-list').DataTable()

      dataTable.clear()
      dataTable.rows.add(e.detail)
      dataTable.draw()
    },
    false,
  )
}

window.addEventListener('DOMContentLoaded', (e) => {
  initAddForm()
  initList()
  initListEvents()
  initButtonsEvent()
})