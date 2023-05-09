'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const dockListService = require('../services/Dock.all')
const dockCreateService = require('../services/dock.create')
const dockUpdateService = require('../services/dock.update')
const dockBuIdService = require('../services/dock.byId')
const dockDeleteService = require('../services/dock.delete')

const productListService = require('../services/product.all')
const productCreateService = require('../services/product.create')

function _getMockDock(id = null) {
  return {
    id: 1,
    name: '',
    address: 1,
    capacity: 1,
    The_minimum_draft_of_the_ship:1
  }
}

module.exports = {
  index(req, res) {
    res.render('pages/dock/index')
  },
  async dockList(req, res) {
    try {
      const dockList = await dockListService()
      res.render('pages/dock/list', {
        docks: dockList,
      })
    } catch (error) {
      res.render('pages/dock/list', {
        docks: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createDockForm(req, res) {
    res.render('pages/dock/add')
  },
  postCreateDock: [
    // body('name')
    //   .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    // body('sku')
    //   .isLength({ min: 1 }).trim().withMessage('Code field must be specified.'),
    // sanitizeBody('name').escape(),
    // sanitizeBody('sku').escape(),
    async (req, res) => {
      // const success = true
      const dockData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const dock = await dockCreateService(dockData)
          req.flash('info', `Dock "${dock.name}" is Added`)
          res.redirect('/dock/list')
        } catch (error) {
          res.render('pages/dock/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/dock/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updateDockForm(req, res) {
    const entity = await dockBuIdService(req.params.id)

    res.render('pages/dock/update', { dock: entity })
  },
  async putUpdateDock(req, res) {
    const success = true
    const dockData = req.body
    const dockId = req.params.id
    const mockDock = _getMockDock(dockId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedDock = await dockUpdateService({
        ...dockData,
        id: dockId,
      })
      req.flash('info', `Dock "#${dockId} ${dockData.name}" is Updated`)
      res.redirect('/dock/list')
    } else {
      res.render('pages/docl/update', {
        dock: mockDock,
        newDock: dockData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deleteDockFrom(req, res) {
    const entity = await dockBuIdService(req.params.id)

    // const mockShop = _getMockShop(req.params.id)
    res.render('pages/dock/delete', { dock: entity })
  },
  async deleteDock(req, res) {
    const success = true
    const dockData = req.body
    const dockId = req.params.id
    const mockDock = _getMockDock(dockId)

    if (success) {
      const deletedDock = await dockDeleteService({id: dockId})
      req.flash('info', `Dock "#${dockId} ${mockDock.name}" is Deleted`)
      res.redirect('/dock/list')
    } else {
      res.render('pages/dock/delete', {
        dock: mockDock,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
