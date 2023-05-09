'use strict'

const pierModel = new Pier() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#pier-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const pierData = {}
    formData.forEach((value, key) => {
      pierData[key] = value
    })

    if (pierData.name != '' && pierData.number != '' && pierData.quantity != '')
      pierModel.Create(pierData)

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
    const coll_piers = pierModel.SelectByKey('piers')

    const pierData = {}
    formData.forEach((value, key) => {
      pierData[key] = value
    })

    const res = coll_piers.map((el, index) => {
      console.log(el.id, row.id)
      if (el.id == row.id) return { ...pierData, id: el.id }
      return el
    })

    pierModel.Update(res)

    window.location.reload();
    e.target.reset()
  })
}

function initDelete(row) {
  const formData = JSON.parse(row)

  pierModel.Delete(formData)
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
  window.jQuery('#pier-list').DataTable({
    data: pierModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Number', data: 'number' },
      { title: 'Quantity', data: 'quantity' },
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
    'piersListDataChanged',
    function () {
      addEventToDeleteButtons()
      addEventToUpdateButtons()
    },
    false,
  )
}

function initListEvents() {
  document.addEventListener(
    'piersListDataChanged',
    function (e) {
      const dataTable = window.jQuery('#pier-list').DataTable()

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